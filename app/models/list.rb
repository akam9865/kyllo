class List < ActiveRecord::Base
  
  belongs_to :board
  has_many :cards, dependent: :destroy
  
  # default_scope { order(:ord) }
  
end
