class AddAvail < ActiveRecord::Migration
  def change
    add_column :squares, :available, :boolean, default: true
  end
end
