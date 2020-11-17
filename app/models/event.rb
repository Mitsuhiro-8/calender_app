class Event < ApplicationRecord
  belongs_to :user
  belongs_to :calendar

  validates :title, presence: true
  validates :start_time, presence: true

end