json.array!(@events) do |event|
  json.extract! event, :id, :title, :content 
  json.start event.start_time
  json.end event.end_time
  json.allDay event.all_day
  json.color event.color
  json.url calendar_event_path(event.calendar_id, event)
end

json.array!(@holidays) do |holiday|
  json.title holiday.name
  json.date holiday.date
end