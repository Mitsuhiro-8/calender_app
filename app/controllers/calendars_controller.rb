class CalendarsController < ApplicationController

  
  def index
  end
  
  def show
    @calendar = Calendar.find(params[:id])
  end

  def new
    @calendar = Calendar.new
  end

  def create
    @calendar = Calendar.new(calendar_params)
    if @calendar.save!
      redirect_to calendar_path(current_user), notice: 'カレンダーを作成しました'
    else
      render :new
    end
  end

  def edit
    @calendar = Calendar.find(params[:id])
  end

  def update
    @calendar = Calendar.find(params[:id])
    if @calendar.update(calendar_params)
      redirect_to edit_calendar_path(@calendar), notice: 'カレンダーを更新しました'
    else
      render :edit
    end
  end


  private

  def calendar_params
    params.require(:calendar).permit(:name, :image).merge(user_id: current_user.id)
  end

end