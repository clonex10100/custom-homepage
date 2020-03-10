//TODO, add delete bookmarks
class BookmarkContainer extends Content {
    constructor(module, adapter, id, bookmarks_data = []) {
        super(module, adapter, id)
        this.bookmarks = bookmarks_data.map(bookmark_hash => new Bookmark(this, this.adapter, bookmark_hash.id, bookmark_hash.name, bookmark_hash.url, bookmark_hash.hotkey));
    }

    getHTML() {
        let bookmarks_list = document.createElement('ul');
        bookmarks_list.classList.add('bookmarks-list');
        return bookmarks_list;
    }

    render() {
        super.render()
        for(let bookmark of this.bookmarks) {
            bookmark.render();
        }
    }

    renderEdit() {
        let form = this.getBookmarkFormHTML();
        this.bookmarks.forEach(bookmark => bookmark.renderDeleteButton());
        this.div.append(form);
    }

    derenderEdit() {
        this.bookmarks.forEach(bookmark => bookmark.unRenderDeleteButton());
        this.div.querySelector('form').remove()
    }

    //Generate html form for adding bookmarks
    getBookmarkFormHTML() {
        let form = document.createElement('form');

        let bookmarkNameLabel = document.createElement('label')
        bookmarkNameLabel.textContent = 'New Bookmark Name: ';
        form.appendChild(bookmarkNameLabel);

        let bookmarkNameField = document.createElement('input')
        bookmarkNameField.name = 'name';
        form.appendChild(bookmarkNameField);

        form.appendChild(document.createElement('br'));

        let bookmarkURLLabel = document.createElement('label')
        bookmarkURLLabel.textContent = 'New Bookmark URL: ';
        form.appendChild(bookmarkURLLabel);

        let bookmarkURLField = document.createElement('input')
        bookmarkURLField.name = 'url';
        form.appendChild(bookmarkURLField);

        form.appendChild(document.createElement('br'));

        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Submit New Bookmark';
        form.appendChild(submit);

        //Button to 'unrender' the form

        //Form Submit Callback
        form.addEventListener('submit', e => {
            //TODO add validations
            e.preventDefault();

            //create and save the bookmark to database
            this.adapter.postBookmark(this, {name: bookmarkNameField.value, url: bookmarkURLField.value}, json => {
                let bookmark = new Bookmark(this, this.adapter, json.id, json.name, json.url);
                bookmark.render();
                bookmark.renderDeleteButton();
                this.bookmarks.push(bookmark);
            });

            bookmarkNameField.value = '';
            bookmarkURLField.value = '';

        });

        return form;
    }

    removeBookmark(bookmark) {
        console.log(this.bookmarks)
        this.bookmarks = this.bookmarks.filter(arrayBookmark => arrayBookmark !== bookmark);
        console.log(this.bookmarks)
    }
}
