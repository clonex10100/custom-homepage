fetch('http://localhost:3000/bookmark_modules').then( resp => resp.json()).then(function(json) {
    json.forEach(bookmark_module_json => {
        let bookmarks = bookmark_module_json.bookmarks.map(x => new Bookmark(x.name, x.url))
        let bookmark_module = new BookmarkModule(bookmark_module_json.name, bookmarks, bookmark_module_json.id)
        bookmark_module.render()
    });
});
