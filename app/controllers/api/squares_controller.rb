class Api::SquaresController < ApplicationController
  
  def index
    @squares = Square.all
    render json: @squares
  end
  
  def update
    @square = Square.find(params[:id])
    
    @square.user_id = current_user.id
    @square.owner = current_user.firstname
    @square.available = false
    
    @square.save
    render json: @square
  end
  
end