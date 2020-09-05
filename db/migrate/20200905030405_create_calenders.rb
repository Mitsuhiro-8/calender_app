class CreateCalenders < ActiveRecord::Migration[6.0]
  def change
    create_table :calenders do |t|
      t.string :name
      t.string :image
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true
      t.timestamps
    end
  end
end
