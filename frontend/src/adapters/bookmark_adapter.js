class BookmarkAdapter extends Adapter {
    postBookmark(content, callback) {
        let options = this.options()
        options.method = 'POST';
        options.body = JSON.stringify({
            bookmark: content
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
