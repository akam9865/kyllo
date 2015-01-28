class UsersController < ApplicationController
  
  def new
  end
  
  def create
    @user = User.new(user_params)
    @user.set_initials
    
    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password)
  end
end
