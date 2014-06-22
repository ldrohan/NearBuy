class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.string :image
      t.string :email
      t.float :lat
      t.float :long
      t.string :phone

      t.timestamps
    end
  end
end
