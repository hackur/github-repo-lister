desc "This task checks for changes to repositories and emails them to subscribed users."
task :check_subscriptions => :environment do
  puts "Checking Subscriptions..."


  def perform(subscr_id, email, repos, github_user)

      # puts "\n\n\n------------------------------------------------------------\n"
      # puts email
      # puts repos
      # puts github_user
      # puts "\n------------------------------------------------------------\n\n\n"

    url = "https://api.github.com/users/#{github_user}/repos"
    response = HTTParty.get(url) #, :query => {:oauth_token => "abc"}
    #puts url
    response_json = JSON.parse(response.body)
    #puts response_json.inspect
    live_repos = ary_of_repo_names(response_json)
    
    known_repos = ary_of_repo_names(repos)

  	new_repos = live_repos - known_repos

  	if (new_repos.length > 0)
      #puts new_repos.inspect
    	@email = UserMailer.github_new_repos_email(email, new_repos, github_user).deliver
    	@repo_subscription = RepoSubscriptions.find(subscr_id)
    	@repo_subscription.repos = response_json
    	@repo_subscription.save
      #puts @email
    end

	end

  def check_for_subscription_changes
    @subscriptions = RepoSubscriptions.all
    @subscriptions.each do |s| 
    	perform(s.id, s.email, s.repos, s.github_user)
    end
  end

  def ary_of_repo_names(repos)
	repo_names = []
	repos.each do |r|
		repo_names << r["name"] rescue nil
	end
	p repo_names.inspect
	repo_names
  end

  check_for_subscription_changes

  puts "done."
end