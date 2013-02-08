# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :repo_subscription, :class => 'RepoSubscriptions' do
    email "MyString"
    repos "MyText"
  end
end
