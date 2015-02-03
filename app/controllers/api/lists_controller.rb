class Api::ListsController < ApplicationController
  
  def create    
    @list = current_board.lists.new(list_params)
    
    if @list.save
      render json: @list
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: {}
  end
  
  def update
    @list = List.find(params[:id])

    if @list.update_attribute(:ord, list_params[:ord])
      render json: @list
    end
  end
  
  private

  def current_board
    Board.find(params[:list][:board_id])
  end

  def list_params
    params.require(:list).permit(:board_id, :title, :ord)
  end
end
