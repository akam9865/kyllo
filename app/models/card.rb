class Card < ActiveRecord::Base
  belongs_to :list
  has_many :items, dependent: :destroy
  has_many :card_assignments, dependent: :destroy
  
  # default_scope { order(:ord) }
end
