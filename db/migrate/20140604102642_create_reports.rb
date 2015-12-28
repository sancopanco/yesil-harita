class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.string :user_uid
      t.integer :point_id

      t.timestamps
    end
  end
end
