  json.extract! @event, :id, :title, :content 
  json.start @event.start_time
  json.end @event.end_time
  json.color @event.color
  json.allDay @event.all_day
  json.url calendar_event_path(@event.calendar_id, @event)