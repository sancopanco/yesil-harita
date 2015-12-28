class AddBatchToPoints < ActiveRecord::Migration
  def change
    add_column :points, :batch, :integer
  end
end
