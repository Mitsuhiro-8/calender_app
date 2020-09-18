class Event < ApplicationRecord
  belongs_to :user
  belongs_to :calendar

  validates :title, presence: true
  validates :start_day, presence: true
  validates :start_hour, presence: true

  def start_time
    self.start_day
  end

  def end_time
    self.end_day
  end
end
