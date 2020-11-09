# json.id           @event.id
# json.title        @event.title
# json.content      @event.content
# json.strt_hour    @event.strt_hour.strftime("%H:%M")
# json.end_hour     @event.end_hour.strftime("%H:%M")
# json.start_day    @event.start_day.strftime("%Y-%m-%d")
# json.end_day      @event.end_day.strftime("%Y-%m-%d")
# json.user_name    @event.user.name
# json.calendar_id  @event.calendar.id

  json.extract! @event, :id, :title, :content 
  json.start @event.start_day
  json.end @event.end_day
  json.url edit_calendar_event_path(@event.calendar_id, @event)