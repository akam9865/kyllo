class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.integer :list_id, null: false
      t.float :ord, default: 0
      t.text :description
      
      t.timestamps
    end
    add_index :cards, :list_id
  end
end
