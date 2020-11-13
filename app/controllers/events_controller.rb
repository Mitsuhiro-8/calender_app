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
    if @event.save
      respond_to do |format|
        format.json
      end
    else
      respond_to do |format|
        format.html { 
        redirect_back(fallback_location: calendar_path(@calendar))
        flash[:notice] = "予定を登録できませんでした"
        }
        format.json
      end
    end
  end
  # respond_to do |format|
  #   format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
  #   format.json
  # end

  def edit
  end
  
  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @calendar, notice: '予定を更新しました' }
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
