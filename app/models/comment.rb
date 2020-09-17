class Comment < ApplicationRecord

  belongs_to :user
  belongs_to :calendar

  validates :text, presence: true
end
