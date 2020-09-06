class CreatePlans < ActiveRecord::Migration[6.0]
  def change
    create_table :plans do |t|
      t.string :title
      t.text :content
      t.time :start_time
      t.time :end_time
      t.date :start_day
      t.date :end_day
      t.references :user, foreign_key: :true
      t.references :calendar, foreign_key: :true

      t.timestamps
    end
  end
end
