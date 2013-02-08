class HardWorker
  # include Sidekiq::Worker

  def perform(email, repos, github_user)

      # puts "\n\n\n------------------------------------------------------------\n"
      # puts email
      # puts repos
      # puts github_user
      # puts "\n------------------------------------------------------------\n\n\n"

    response = HTTParty.get("https://api.github.com/users/#{github_user}/repos") #, :query => {:oauth_token => "abc"}
    response_json = JSON.parse(response.body)
    live_repos = ary_of_repo_names(response_json)
    
    known_repos = ary_of_repo_names(repos)

  	new_repos = live_repos - known_repos

  	if (new_repos.length > 0)
      puts new_repos.inspect

    	@email = UserMailer.github_new_repos_email(email, new_repos).deliver

      puts @email
    end

	end

  def self.check_for_subscription_changes
    @subscriptions = RepoSubscriptions.all
    @subscriptions.each do |s| 
    	perform(s.email, s.repos, s.github_user)
    end
  end

  private

	  def ary_of_repo_names(repos)
      repo_names = []
  		repos.each do |r|
        # puts "\n\n\n MARKER HERE \n #{r.inspect}\n\n\n"
  			repo_names << r["name"]# rescue nil
  		end
      repo_names
	  end

end

# # every :hour do
# every 5.minutes do
#   runner "HardWorker.check_for_changes"
# end