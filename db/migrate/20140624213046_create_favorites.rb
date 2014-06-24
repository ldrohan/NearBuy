class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.string :name
      t.text :description
      t.string :image
      t.string :email
      t.float :lat
      t.float :long
      t.string :phone
      t.integer :user_id

      t.timestamps
    end
  end
end
