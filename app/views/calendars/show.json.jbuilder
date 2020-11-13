# json.events @events do |event|
#   json.id           event.id
#   json.title        event.title
#   json.content      event.content
#   json.start_hour    event.start_hour.strftime("%H:%M")
#   json.end_hour     event.end_hour.strftime("%H:%M")
#   json.start_day    event.start_day.strftime("%Y-%m-%d")
#   json.end_day      event.end_day.strftime("%Y-%m-%d")
#   json.user_name    event.user.name
#   json.calendar_id  event.calendar.id
# end

json.array!(@events) do |event|
  json.extract! event, :id, :title, :content 
  json.start event.start_time
  json.end event.end_time
  json.color event.color
  json.url edit_calendar_event_path(event.calendar_id, event)
end

json.array!(@holidays) do |holiday|
  json.title holiday.name
  json.date holiday.date
end