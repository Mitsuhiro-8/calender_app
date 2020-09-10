class Comment < ApplicationRecord

  belongs_to :user
  belomgs_to :calendar

  validates :text, presence: true
end
