class CreateBookmarkModules < ActiveRecord::Migration[6.0]
  def change
    create_table :bookmark_modules do |t|
      t.string :name

      t.timestamps
    end
  end
end
