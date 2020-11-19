class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def edit
    @calendar = Calendar.find_by(id: params[:calendar_id])
  end
  
  def update
    @calendar = Calendar.find_by(id: params[:calendar_id])
    if current_user.update(user_params)
      redirect_to calendar_path(@calendar), notice: "ユーザー情報を更新しました" 
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
