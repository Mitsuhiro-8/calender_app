class Calendar < ApplicationRecord
  
  has_many :plans
  has_many :comments
  belongs_to :user
  belongs_to :group

  validates :name, presence: true

end
