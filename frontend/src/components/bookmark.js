class Bookmark {
    constructor(name, adapter, url, container, id, hotkey) {
        this.name = name;
        this.adapter = adapter;
        this.url = url;
        this.id = id;
        this.container = container;
        this.hotkey = hotkey;
    }

    save() {
        this.adapter.postBookmark(this, json => {
            this.id = json.id;
            this.name = json.name;
            this.url = json.url;
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
        this.container.div.querySelector('.bookmarks-list').appendChild(this.li);
    }

    renderDeleteButton() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.onclick = e => {
            this.adapter.deleteBookmark(this, this.destroy.bind(this));
            this.container.removeBookmark(this);
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
