class BookmarkModuleAdapter {
    static postBookmarkModule(bookmark_module, callback) {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              name: bookmark_module.name,
              homepage_id: 1
          })
        }
            resp => resp.json()
        fetch("http://localhost:3000/homepages/1/bookmark_modules", options).then(
        ).then(
            json => callback(json)
        );
    }
}
