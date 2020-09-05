class Group < ApplicationRecord
  validates :name, presence: true

  has_many :group_users
  has_many :users, trough: :group_users
  has_many :calenders

  validates :name, presence: true
end
