class CalendarsController < ApplicationController

  def index
  end
  
  def show
    @calendar = Calendar.find(params[:id])
    @plan = Plan.new
  end

  def new
    @calendar = Calendar.new
    @calendar.users << current_user
  end

  def create
    @calendar = Calendar.new(calendar_params)
    if @calendar.save
      redirect_to calendar_path(@calendar), notice: 'カレンダーを作成しました'
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
      redirect_to calendar_path(params[:id]), notice: 'カレンダーを更新しました'
    else
      render :edit
    end
  end


  private

  def calendar_params
    params.require(:calendar).permit(:name, :image, user_ids: [])
  end

end