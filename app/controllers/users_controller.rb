class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def edit
    session[:calendarPath] = params[:calendarPath]
  end
  
  def update
    if current_user.update(user_params)
      redirect_to calendar_path(session[:calendarPath]), notice: "ユーザー情報を更新しました" 
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
