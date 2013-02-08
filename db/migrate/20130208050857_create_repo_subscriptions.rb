class CreateRepoSubscriptions < ActiveRecord::Migration
  def change
    create_table :repo_subscriptions do |t|
      t.string :github_user
      t.string :email
      t.text :repos

      t.timestamps
    end
  end
end
