class BookmarkAdapter extends Adapter {
    postBookmark(containerId, content, callback) {
        let options = this.options()
        options.method = 'POST';
        options.body = JSON.stringify({
            bookmark: content
        });

        fetch(`${this.url}/page_modules/${containerId}/bookmarks`, options)
            .then(
                resp => resp.json()
            ).then(
                json => callback(json)
            )
    }

    deleteBookmark(bookmark, callback) {
        let options = this.options();
        options.method = "DELETE";

        fetch(`${this.url}/page_modules/${bookmark.container.module.id}/bookmarks/${bookmark.id}`, options)
            .then(
                callback()
            );
    }
}
