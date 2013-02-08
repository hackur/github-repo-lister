class UserMailer < ActionMailer::Base
  # include Sidekiq::Worker
  default :from => "notifications@github-repo-listener.herokuapp.com"
  
  def welcome_email(user)
    mail(:to => user.email, :subject => "Invitation Request Received")
  end

  def github_results_email(email_address, repositories)
  	@repositories = repositories
    mail(:to => email_address, :subject => "The GitHub Repos You Ordered...")
  end

  def github_new_repos_email(email_address, repositories, github_user)
    @repositories = repositories
    puts "REPOS:"+@repositories.inspect
    @github_user = github_user
    mail(:to => email_address, :subject => "New GitHub Repos Added...")
  end

end