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
        fetch("http://localhost:3000/homepages/1/bookmark_modules", options).then(
            resp => {
                if (resp.ok) {
                    return resp.json()
                } else{
                    throw 'POST failed';
                }
            }
        ).then(
            json => callback(json)
        ).catch(
            x => console.log('Post request for bookmark module failed')
        );
    }
}
