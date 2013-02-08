require 'httparty'
require 'json'

class HomeController < ApplicationController

	def public

		params[:github_user] ||= "siyegen"

		response = HTTParty.get("https://api.github.com/users/#{params[:github_user]}/repos") #, :query => {:oauth_token => "abc"}
		@repositories = JSON.parse(response.body)

		if request.post? and !params[:sendgrid_email].blank?
			@email = UserMailer.github_results_email(params[:sendgrid_email], @repositories).deliver
		end

		if params[:subscribe]
			@repo_subscription = RepoSubscriptions.create(:email => params[:sendgrid_email], :repos => @repositories, :github_user => params[:github_user])
		end

	end

end
