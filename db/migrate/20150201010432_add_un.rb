class AddUn < ActiveRecord::Migration
  def change
    add_column :squares, :owner, :string 
  end
end
