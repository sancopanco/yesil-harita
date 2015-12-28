# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140604124034) do

  create_table "points", :force => true do |t|
    t.decimal  "lat",           :precision => 9, :scale => 6
    t.decimal  "lng",           :precision => 9, :scale => 6
    t.integer  "point_type"
    t.boolean  "paper"
    t.boolean  "plastic"
    t.boolean  "metal"
    t.string   "other"
    t.string   "name"
    t.string   "schedule_week"
    t.string   "schedule_sat"
    t.string   "schedule_sun"
    t.string   "website"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "glass"
    t.string   "address"
    t.string   "user_uid"
    t.boolean  "textiles"
    t.boolean  "electrics"
    t.boolean  "batteries"
    t.boolean  "lights"
    t.string   "phone"
    t.integer  "batch"
  end

  create_table "reports", :force => true do |t|
    t.string   "user_uid"
    t.integer  "point_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "email"
    t.string   "name"
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
