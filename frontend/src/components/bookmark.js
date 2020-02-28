class Bookmark {
    constructor(name, url, module, id, hotkey) {
        this.name = name;
        this.url = url;
        this.id = id;
        this.module = module;
        this.hotkey = hotkey;
    }

    save() {
        BookmarksAdapter.postBookmark(this, json => {
            this.id = json.id;
            this.render()
        });
    }

    getHTML() {
        let li = document.createElement('li');
        li.dataset.id = this.id;
        let a = document.createElement('a');
        a.textContent = this.name;
        a.href = this.url;
        li.appendChild(a);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.onclick = e => {
            this.li.destroy();
        };
        li.appendChild(deleteButton);
        return li;
    }

    render() {
        this.module.div.querySelector('.bookmarks-list').appendChild(this.getHTML());
    }
}
