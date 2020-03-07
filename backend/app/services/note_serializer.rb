class NoteSerializer
  def self.json(note)
    options = {
      only: [:id, :content]
    }
    note.to_json(options)
  end
end
