class Api::CardsController < ApplicationController
  
  def create
    @card = current_list.cards.new(card_params)
    
    if @card.save
      render json: @card
    end
  end
  
  private
  
  def current_list
    List.find(params[:card][:list_id])
  end
  
  def card_params
    params.require(:card).permit(:title, :list_id)
  end
end
