class CreateEvents < ActiveRecord::Migration[6.0]
  def up
    create_table :events do |t|
      t.string :title
      t.text :content
      t.time :start_hour
      t.time :end_hour
      t.date :start_day
      t.date :end_day
      t.references :user, foreign_key: :true
      t.references :calendar, foreign_key: :true
      t.timestamps
    end
  end
end
