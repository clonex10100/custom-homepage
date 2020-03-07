class BookmarksAdapter {
    static postBookmark(bookmark, callback) {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              name: bookmark.name,
              url: bookmark.url,
              bookmark_container_id: bookmark.container.id
          })
        }
        fetch("http://localhost:3000/bookmarks", options).then(
            resp => resp.json()
        ).then(
            json => callback(json)
        );
    }

    static deleteBookmark(bookmark, callback) {
        let options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
        fetch(`http://localhost:3000/bookmarks/${bookmark.id}`, options).then(callback());
    }
}
