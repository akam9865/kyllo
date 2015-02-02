class DropSquares < ActiveRecord::Migration
  def change
    drop_table :squares
  end
end
