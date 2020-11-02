  json.id          @comment.id
  json.text        @comment.text
  json.created_at   @comment.created_at.strftime("%H:%M")
  json.user_name   @comment.user.name
  json.calendar_id @comment.calendar.id