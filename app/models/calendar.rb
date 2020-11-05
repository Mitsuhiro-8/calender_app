class Calendar < ApplicationRecord
  
  has_many :events
  has_many :comments
  has_many :calendar_users
  has_many :users, through: :calendar_users

  validates :name, presence: true, length: {maximum: 12}

# 前後十年分の祝日生成
  def self.create_holidays
    HolidayJp.between(Date.new(2010, 1, 1), Date.new(2030, 12, 31))
  end

end
