class Board < ActiveRecord::Base
  
  belongs_to :user
  has_many :lists
  has_many :board_memberships
  has_many :members, through: :board_memberships, source: :user
  
end
