class CreatePageModules < ActiveRecord::Migration[6.0]
  def change
    create_table :page_modules do |t|
      t.string :name
      t.integer :sort_priority
      t.references :homepage, null: false, foreign_key: true
      t.references :content, null: false, polymorphic: true
    end
  end
end
