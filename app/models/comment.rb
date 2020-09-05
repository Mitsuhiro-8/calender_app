class Comment < ApplicationRecord

  belongs_to :user
  belomgs_to :calender

  validates :text, presence: true
end
