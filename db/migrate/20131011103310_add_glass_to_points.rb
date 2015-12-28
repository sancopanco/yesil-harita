class AddGlassToPoints < ActiveRecord::Migration
  def change
    add_column :points, :glass, :boolean
  end
end
