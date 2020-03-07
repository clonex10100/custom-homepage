class BookmarkAdapter extends Adapter {
    postBookmark(bookmark, callback) {
        let options = this.options()
        options.method = 'POST';
        options.body = JSON.stringify({
          name: bookmark.name,
          url: bookmark.url,
          bookmark_container_id: bookmark.container.id
        });

        fetch("http://localhost:3000/bookmarks", options).then(
            resp => resp.json()
        ).then(
            json => callback(json)
        );
    }

    deleteBookmark(bookmark, callback) {
        let options = this.options();
        options.method = "DELETE";
        fetch(`http://localhost:3000/bookmarks/${bookmark.id}`, options).then(callback());
    }
}
