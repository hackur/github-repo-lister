class RepoSubscriptions < ActiveRecord::Base
  attr_accessible :email, :repos, :github_user
  serialize :repos

  # # This method will be called by the worker when it is looking for new repositories for subscriptions.
  # def new_repos
  # 	# Pull live from GitHub repository for the user in this subscription.
  # 	# Compare the repositories in self.repos to the repositories pulled live from GitHub.
  # 	# Compile a list of repos that are in the live feed, and not in our feed.
  # 	# Return an array of new repositories so the worker can send an email.
  # end

end
