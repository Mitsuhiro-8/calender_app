class CalendarsController < ApplicationController
  before_action :authenticate_user!

  def index
    @calendars = current_user.calendars
  end
  
  def show
    if session[:calendarPath].present?
      session[:calendarPath] = params[:id] if params[:id]
      @calendar = Calendar.find(session[:calendarPath])
    elsif params[:id]
      @calendar = Calendar.find(params[:id])
      session[:calendarPath] = params[:id]
    else
      @calendar = Calendar.find(current_user.calendars.last.id)
    end
    @calendars = current_user.calendars
    @events = @calendar.events.includes(:user)
    @comments = @calendar.comments.includes(:user)
    @comment = Comment.new
    @event = Event.new
    # 祝日作成メソッド(2020年前後10年分のデータ)
    @holidays = Calendar.create_holidays
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