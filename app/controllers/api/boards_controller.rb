module Api
  class BoardsController < ApplicationController
    def create
      @board = current_user.boards.new(board_params)
      
      if @board.save
        render json: @board
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end
  
    def show
      @board = Board.includes(:members, lists: :cards).find(params[:id])
      render :show
    end
  
    def index
      @boards = current_user.boards
      render json: @boards
    end
  
    def destroy
      @board = current_user.boards.find(params[:id])
      @board.try(:destroy)
      render json: {}
    end
  
    def update
    end
  
    private
  
    def board_params
      params.require(:board).permit(:title)
    end
  end
end