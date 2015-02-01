class CreateSquares < ActiveRecord::Migration
  def change
    create_table :squares do |t|
      t.integer :user_id

      t.timestamps
    end
  end
end
