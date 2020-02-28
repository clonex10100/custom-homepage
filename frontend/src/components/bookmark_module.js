//TODO, add delete bookmarks
class BookmarkModule extends Module {
    constructor(name, bookmarks, id) {
        super(name);
        this.bookmarks = bookmarks;
        this.id = id;
    }

    //Add a bookmark to bookmarks and add the html.
    addBookmark(bookmark) {
        let bookmarks_list = this.div.querySelector('.bookmarks-list')
        let li = document.createElement('li');
        li.appendChild(bookmark.getHTML());
        bookmarks_list.appendChild(li); 
    }

    //Next Two Methods are for generating the base HTML. They're called by Module.render().
    getContentHTML() {
        let section = document.createElement('section');
        let bookmarks_list = document.createElement('ul');
        bookmarks_list.classList.add("bookmarks-list");
        let li;

        for(let bookmark of this.bookmarks) {
            li = document.createElement('li');
            li.appendChild(bookmark.getHTML());
            bookmarks_list.appendChild(li);
        }
        section.appendChild(bookmarks_list);



        return section;
    }

    getFooterHTML() {
        let footer = document.createElement('footer');
        let addButton = document.createElement('button')
        addButton.textContent = 'Add New Bookmarks';
        addButton.addEventListener('click', this.renderNewBookmarksForm.bind(this))
        footer.appendChild(addButton);
        return footer;
    }

    //Generate html form for adding bookmarks NOT rendered when render is called
    getBookmarkFormHTML() {
        let form = document.createElement('form');

        let bookmarkNameLabel = document.createElement('label')
        bookmarkNameLabel.textContent = 'Bookmark Name: ';
        form.appendChild(bookmarkNameLabel);

        let bookmarkNameField = document.createElement('input')
        bookmarkNameField.name = 'name';
        form.appendChild(bookmarkNameField);

        form.appendChild(document.createElement('br'));

        let bookmarkURLLabel = document.createElement('label')
        bookmarkURLLabel.textContent = 'Bookmark URL: ';
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
        let exit = document.createElement('button');
        exit.textContent = 'Finished Adding';
        form.appendChild(exit);
        exit.onclick = e => {
            e.preventDefault()
            this.div.querySelector('footer').remove()
            this.div.appendChild(this.getFooterHTML());
        }
        
        //Form Submit Callback
        form.addEventListener('submit', e => {
            //TODO add validations
            e.preventDefault();

            //create and save the bookmark to database
            let bookmark = new Bookmark(bookmarkNameField.value, bookmarkURLField.value, this.id);
            bookmark.save()
            this.addBookmark(bookmark);
        });

        return form;
    }


    
    //Callback for the 'add new bookmark' button in footer, renders the bookmark creation form
    //'this' needs to be bound
    renderNewBookmarksForm(e) {
        console.log(this);
        //Get the footer section of the module
        let section = e.target.parentElement;
        //Replace it's contents with the bookmark form
        destroyAllChildren(section);
        let form = this.getBookmarkFormHTML();
         
        section.appendChild(form);

        
    }
}
