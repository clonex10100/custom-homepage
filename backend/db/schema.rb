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

ActiveRecord::Schema.define(version: 2020_07_26_014440) do

  create_table "bookmark_containers", force: :cascade do |t|
  end

  create_table "bookmarks", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.integer "bookmark_container_id", null: false
    t.index ["bookmark_container_id"], name: "index_bookmarks_on_bookmark_container_id"
  end

  create_table "homepages", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "content"
  end

  create_table "page_modules", force: :cascade do |t|
    t.string "name"
    t.integer "sort_priority"
    t.integer "homepage_id", null: false
    t.string "content_type", null: false
    t.integer "content_id", null: false
    t.index ["content_type", "content_id"], name: "index_page_modules_on_content_type_and_content_id"
    t.index ["homepage_id"], name: "index_page_modules_on_homepage_id"
  end

  create_table "todo_items", force: :cascade do |t|
    t.string "content"
    t.boolean "completed"
    t.integer "todo_list_id", null: false
    t.index ["todo_list_id"], name: "index_todo_items_on_todo_list_id"
  end

  create_table "todo_lists", force: :cascade do |t|
  end

  add_foreign_key "bookmarks", "bookmark_containers"
  add_foreign_key "page_modules", "homepages"
  add_foreign_key "todo_items", "todo_lists"
end
