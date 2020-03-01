class CreateNoteModules < ActiveRecord::Migration[6.0]
  def change
    create_table :note_modules do |t|
      t.string :name
      t.string :content
      t.references :homepage, null: false, foreign_key: true

      t.timestamps
    end
  end
end
