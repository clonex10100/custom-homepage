class BookmarkContainerSerializer
  def self.json(bookmark_container)
    options = {
        only: [:id],
        include: {
          bookmarks: {
            only: [:id, :name, :url]
          }
        }
      }
    bookmark_container.to_json(options)
  end
end
