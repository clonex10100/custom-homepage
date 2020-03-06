class CreateModules < ActiveRecord::Migration[6.0]
  def change
    create_table :modules do |t|
      t.string :name
      t.integer :sort_priority
      t.references :content, polymorphic: true, null: false
    end
  end
end
