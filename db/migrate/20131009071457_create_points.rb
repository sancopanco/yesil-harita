class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
      t.decimal :lat, :precision => 9, :scale => 6
      t.decimal :lng, :precision => 9, :scale => 6
      t.integer :point_type
      t.boolean :paper
      t.boolean :plastic
      t.boolean :metal
      t.string :other
      t.string :name
      t.string :schedule_week
      t.string :schedule_sat
      t.string :schedule_sun
      t.string :website

      t.timestamps
    end
  end
end
