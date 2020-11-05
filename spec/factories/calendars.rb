FactoryBot.define do

  factory :calendar do
    name      {Faker::String.random(length: 1..12)}
    
  end

end