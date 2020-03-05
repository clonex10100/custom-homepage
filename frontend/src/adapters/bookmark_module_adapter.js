class BookmarkModuleAdapter {
    constructor(homepage) {
        this.homepageId = homepage.id;
        this.jwt = homepage.jwt;
        this.url = `http://localhost:3000/homepages/${this.homepageId}/bookmark_modules`;
    }
    postBookmarkModule(bookmark_module, callback) {
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

    updateBookmarkModule(bookmark_module, callback) {
        let options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              name: bookmark_module.name,
          })
        }
        fetch(`http://localhost:3000/homepages/1/bookmark_modules/${bookmark_module.id}`, options).then(
            resp => {
                if (resp.ok) {
                    return resp.json()
                } else{
                    console.log(resp)
                    throw 'POST failed';
                }
            }
        ).then(
            json => callback(json)
        ).catch(
            x => console.log(x)
        );
    }

    getBookmarkModules(callback) {
        fetch(this.url).then(resp => resp.json()).then(json => callback(json));
    }
}
