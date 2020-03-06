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

ActiveRecord::Schema.define(version: 2020_03_06_224216) do

  create_table "bookmarks", force: :cascade do |t|
    t.string "name"
    t.string "url"
  end

  create_table "homepages", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "modules", force: :cascade do |t|
    t.string "name"
    t.integer "sort_priority"
    t.string "content_type", null: false
    t.integer "content_id", null: false
    t.index ["content_type", "content_id"], name: "index_modules_on_content_type_and_content_id"
  end

end
