class Calendar < ApplicationRecord
  
  has_many :events
  has_many :comments
  has_many :calendar_users
  has_many :users, through: :calendar_users

  validates :name, presence: true

end
