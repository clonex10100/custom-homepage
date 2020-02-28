class CreateBookmarks < ActiveRecord::Migration[6.0]
  def change
    create_table :bookmarks do |t|
      t.string :name
      t.string :url
      t.references :bookmark_module, null: false, foreign_key: true
    end
  end
end
