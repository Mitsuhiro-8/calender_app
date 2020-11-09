class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_calendar
  def index
  end

  def show
  end

  def new
    @comment = Comment.new
    @comments = @calendar.comments.includes(:user)
  end

  def create
    # binding.pry
    @comment = @calendar.comments.new(comment_params)
    if @comment.save
      respond_to do |format|
        format.json
      end
    else
      redirect_back(fallback_location: calendar_path(@calendar))
      flash[:notice] = "コメントを登録できませんでした"
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    redirect_to calendar_path(@calendar), notice: 'コメントを削除しました'

  end

  private

  def comment_params
    params.require(:comment).permit(:text, :created_at).merge(user_id: current_user.id, calendar_id: @calendar)
  end

  def set_calendar
    @calendar = Calendar.find(params[:calendar_id])
  end
end
