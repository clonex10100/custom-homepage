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
            this.renderDeleteButton();
        });
    }

    getHTML() {
        let li = document.createElement('li');
        li.dataset.id = this.id;
        let a = document.createElement('a');
        a.textContent = this.name;
        a.href = this.url;
        li.appendChild(a);

        return li;
    }

    render() {
        this.li = this.getHTML();
        this.module.div.querySelector('.bookmarks-list').appendChild(this.li);
    }

    renderDeleteButton() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.onclick = e => {
            BookmarksAdapter.deleteBookmark(this, this.destroy.bind(this));
        };
       this.li.appendChild(deleteButton); 
    }

    unRenderDeleteButton() {
        this.li.querySelector('button').remove();
    }

    destroy() {
        this.li.remove();
    }
}
