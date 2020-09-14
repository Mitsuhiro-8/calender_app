class PlansController < ApplicationController
  before_action :set_calendar

  def index
  end

  def new
    @plan = Plan.new
    @plans = @calendar.plans.includes(:user)
  end

  def create
    # binding.pry
    @plan = @calendar.plans.new(plan_params)
    if @plan.save!
      redirect_to calendar_path(@calendar), notice: '予定を登録しました'
    else
      render :new
    end
  end

  def edit
    @plan = Plan.find(params[:id])
  end

  def update
  end

  private

  def plan_params
    params.require(:plan).permit(:title, :content, :start_time, :end_time, :start_day, :end_day).merge(user_id: current_user.id, calendar_id: @calendar)
  end

  def set_calendar
    @calendar = Calendar.find(params[:calendar_id])
  end

end