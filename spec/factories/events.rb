FactoryBot.define do

  factory :event do
    title       {Faker::String.random(length: 1..12)}
    content     {Faker::String.random(length: 1..12)}
    user
    calendar
    start_time  {"2020-11-10 10:00"}
    end_time    {"2020-11-20 10:00"}
    all_day     {Faker::Boolean.boolean}
    color       {Faker::Color.hex_color}
  end

end