FactoryBot.define do

  factory :comment do
    text      {Faker::String.random(length: 1..30)}
    user
    calendar
  end

end