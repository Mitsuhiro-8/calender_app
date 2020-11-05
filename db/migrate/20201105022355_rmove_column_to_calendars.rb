class RmoveColumnToCalendars < ActiveRecord::Migration[6.0]
  def up
    remove_column :calendars, :image
  end

  def down
    add_column :calendars, :image
  end
end
