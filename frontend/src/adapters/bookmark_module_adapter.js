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
          })
        }
        fetch("http://localhost:3000/bookmark_modules", options).then(
            resp => resp.json()
        ).then(
            json => callback(json)
        );
    }
}
