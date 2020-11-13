class ChangeColumnsOnEvents < ActiveRecord::Migration[6.0]
  def up
    change_column_null :events, :title, false
    add_column :events, :start_time, :datetime, null: false
    add_column :events, :end_time, :datetime
    add_column :events, :all_day, :boolean, default: false, null: false
    add_column :events, :color, :string
    remove_column :events, :start_hour
    remove_column :events, :end_hour
    remove_column :events, :start_day
    remove_column :events, :end_day
  end
  def down
    change_column_null :events, :title, true
    remove_column :events, :start_time
    remove_column :events, :end_time
    remove_column :events, :all_day
    remove_column :events, :color
    add_column :events, :start_hour, :time
    add_column :events, :end_hour, :time
    add_column :events, :start_day, :date
    add_column :events, :end_day, :date
  end
end
