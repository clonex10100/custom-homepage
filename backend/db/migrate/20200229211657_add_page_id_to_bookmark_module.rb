class AddPageIdToBookmarkModule < ActiveRecord::Migration[6.0]
  def change
    add_reference :bookmark_modules, :homepage, foreign_key: true
  end
end
