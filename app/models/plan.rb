class Plan < ApplicationRecord

  belongs_to :user
  belongs_to :calender

  validates :title, presence: true
  validates :start_day, presence: true
  validates :start_time, presence: true
end
