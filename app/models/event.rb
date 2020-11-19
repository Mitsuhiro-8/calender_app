class Event < ApplicationRecord
  belongs_to :user
  belongs_to :calendar

  validates :title, presence: true, length: {maximum: 20}
  validates :content, length: {maximum: 30}
  validates :start_time, presence: true
  validate :start_end_check

  def start_end_check
    if self.start_time.present? & self.end_time.present?
    errors.add(:end_time, "は開始日時より遅い日時を選択してください") unless self.start_time < self.end_time
    end
  end

end