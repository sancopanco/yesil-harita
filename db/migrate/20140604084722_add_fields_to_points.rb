class AddFieldsToPoints < ActiveRecord::Migration
  def change
    add_column :points, :textiles, :boolean
    add_column :points, :electrics, :boolean
    add_column :points, :batteries, :boolean
    add_column :points, :lights, :boolean

    add_column :points, :phone, :string
  end
end
