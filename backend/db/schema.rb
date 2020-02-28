# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_28_064334) do

  create_table "bookmark_modules", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bookmarks", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.integer "bookmark_module_id", null: false
    t.index ["bookmark_module_id"], name: "index_bookmarks_on_bookmark_module_id"
  end

  add_foreign_key "bookmarks", "bookmark_modules"
end
