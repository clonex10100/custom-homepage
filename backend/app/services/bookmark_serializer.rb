class BookmarkSerializer
  def self.json(bookmark)
    options = {
      only: [:id, :name, :url]
    }

    bookmark.to_json(options)
  end
end
