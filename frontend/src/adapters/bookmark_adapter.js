class BookmarksAdapter {
    static postBookmark(bookmark) {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              name: bookmark.name,
              url: bookmark.url,
              bookmark_module_id: bookmark.modId
          })
        }
        fetch("http://localhost:3000/bookmarks", options);
    }
}
