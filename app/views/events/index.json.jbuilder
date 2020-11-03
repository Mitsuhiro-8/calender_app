json.array!(@events) do |event|
  json.extract! event, :id, :title, :content 
  json.start event.start_day
  json.end event.end_day
  json.url events_url(event, format: :html) 
  # binding.pry
end