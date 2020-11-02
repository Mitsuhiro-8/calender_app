json.events @events do |event|
  json.id           event.id
  json.title        event.title
  json.content      event.content
  json.start_hour    event.start_hour.strftime("%H:%M")
  json.end_hour     event.end_hour.strftime("%H:%M")
  json.start_day    event.start_day.strftime("%Y-%m-%d")
  json.end_day      event.end_day.strftime("%Y-%m-%d")
  json.user_name    event.user.name
  json.calendar_id  event.calendar.id
end

# json.array! @events, :id, :tittle, :content, :start_hour, :end_hour,
# :start_day, :end_day, :user.name, :calendar.id