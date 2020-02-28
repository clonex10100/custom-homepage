class Bookmark {
    constructor(name, link, modId, hotkey) {
        this.name = name;
        this.url = link;
        this.modId = modId;
        this.hotkey = hotkey;
    }

    save() {
        BookmarksAdapter.postBookmark(this);
    }

    getHTML() {
        let a = document.createElement('a');
        a.textContent = this.name;
        a.href = this.url;
        return a;
    }
}
