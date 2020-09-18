class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_action :set_calendar
  # GET /events
  # GET /events.json
  def index
    @events = Event.all
  end

  # GET /events/1
  # GET /events/1.json
  def show
  end

  # GET /events/new
  def new
    # @event = Event.new
    # @events = @calendar.events.includes(:user)
  end

  # POST /events
  # POST /events.json
  def create
    # binding.pry
    @event = @calendar.events.new(event_params)  
    # respond_to do |format|
    if @event.save!
      # format.html { }
      redirect_to @calendar, notice: '予定を登録しました'
      # format.json { render :show, status: :created, location: @event }
    else
      redirect_back(fallback_location: calendar_path(@calendar))
      flash[:notice] = "予定を登録できませんでした"
      # format.html { render :new}
      # format.json { render json: @event.errors, status: :unprocessable_entity }
    # end
    end
  end

  # GET /events/1/edit
  def edit
  end
  
  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: '予定を更新しました' }
        # format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        # format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: '予定が完了しました' }
      # format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:title, :content, :start_hour, :end_hour, :start_day, :end_day).merge(user_id: current_user.id, calendar_id: @calendar)
    end

    def set_calendar
      @calendar = Calendar.find(params[:calendar_id])
    end
end
