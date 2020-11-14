class EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_action :set_calendar, only: [:update, :create, :edit, :update, :destroy]

  def index
  end

  def show
  end

  def new
  end

  def create
    @event = @calendar.events.new(event_params)
    if @event.valid? && @event.save
      respond_to do |format|
        format.json
      end
    else
      render status: 422
    end
  end

  def edit
  end
  
  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    @event_valid = Event.new(event_params)
    if @event_valid.valid? && @event.update(event_params)
      binding.pry
      respond_to do |format|
        format.json
      end
    else
      # binding.pry
        render status: 422
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    redirect_to @calendar, notice: '予定が完了しました'
    # respond_to do |format|
      # format.html { 
      #  }
      # format.json { head :no_content }
    # end
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :content, :start_time, :end_time, :all_day, :color).merge(user_id: current_user.id, calendar_id: @calendar)
    end

    def set_calendar
      @calendar = Calendar.find(params[:calendar_id])
    end
end
