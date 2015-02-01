class StaticPagesController < ApplicationController
  
  before_action :require_signed_in!
  
  def root
  end
  
  
  def squares
  end
end
