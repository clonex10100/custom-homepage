class BookmarkModuleSerializer
  def self.json(bookmark_modules)
    options = {
      only: [:id, :name],
      include: {
        bookmarks: {
          only: [:id, :name, :url]
        }
      }
    }

    bookmark_modules.to_json(options)
  end
end
