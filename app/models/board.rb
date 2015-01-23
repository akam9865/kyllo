class Board < ActiveRecord::Base
  
  belongs_to :user
  has_many :lists
  has_many :board_members
  
end
