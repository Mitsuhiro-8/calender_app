class PlansController < ApplicationController
  before_action :set_calendar

  def index
  end

  def new
    @plan = Plan.new
    @plans = @calendar.plans.includes(:user)
  end

  def create
    @plan = @calendar.plans.new(plan_params)
    if @plan.save
      redirect_to calendar_path(@calendar), notice: '予定を登録しました'
    else
      redirect_back(fallback_location: calendar_path(@calendar))
      flash[:notice] = "予定を登録できませんでした"
    end
  end

  def edit
    @plan = Plan.find(params[:id])
  end

  def update
    @plan = @calendar.plans.new(plan_params)
    if @plan.save
      redirect_to calendar_path(@calendar), notice: '予定を更新しました'
    else
      render :edit
    end
  end

  def destroy
    plan = Plan.find(params[:id])
    plan.destroy
    redirect_to calendar_path(@calendar), notice: '予定を完了しました'
  end

  private

  def plan_params
    params.require(:plan).permit(:title, :content, :start_time, :end_time, :start_day, :end_day).merge(user_id: current_user.id, calendar_id: @calendar)
  end

  def set_calendar
    @calendar = Calendar.find(params[:calendar_id])
  end

end