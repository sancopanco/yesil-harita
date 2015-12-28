class AddUserUidToPoints < ActiveRecord::Migration
  def change
    add_column :points, :user_uid, :string
  end
end
