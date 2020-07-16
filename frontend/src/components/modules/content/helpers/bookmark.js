class Bookmark {
    constructor(container, adapter, id, name, url, hotkey) {
        this.name = name;
        this.adapter = adapter;
        this.url = url;
        this.id = id;
        this.container = container;
        this.hotkey = hotkey;
    }

    get _HTML() {
        let li = document.createElement('li');
        li.dataset.id = this.id;
        let a = document.createElement('a');
        a.textContent = this.name;
        a.href = this.url;
        li.appendChild(a);

        return li;
    }

    render() {
        this.li = this._HTML;
        this.container.div.querySelector('.bookmarks-list').appendChild(this.li);
    }

    renderEdit() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.onclick = e => {
            this.adapter.deleteBookmark(this, this.destroy.bind(this));
            this.container.removeBookmark(this);
        };
       this.li.appendChild(deleteButton); 
    }

    unRenderEdit() {
        this.li.querySelector('button').remove();
    }

    destroy() {
        this.li.remove();
    }
}
