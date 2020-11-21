  json.extract! @event, :id, :title, :content 
  json.start @event.start_time
  if @event.all_day == true && @event.end_time.present?
    json.end @event.end_time + 86400
  else
    json.end @event.end_time
  end
  json.color @event.color
  json.allDay @event.all_day
  json.url calendar_event_path(@event.calendar_id, @event)