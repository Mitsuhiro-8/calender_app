class ChangeTextColumnOnComments < ActiveRecord::Migration[6.0]
  def up
    change_column_null :comments, :text, false
  end
  def down
    change_column_null :comments, :text, true
  end
end
