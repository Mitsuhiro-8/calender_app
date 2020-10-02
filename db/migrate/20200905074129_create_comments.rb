class CreateComments < ActiveRecord::Migration[6.0]
  def up
    create_table :comments do |t|
      t.text :text
      t.references :user, foreign_key: true
      t.references :calendar, foreign_key: true

      t.timestamps
    end
  end
end
