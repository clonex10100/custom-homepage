class BookmarkModule extends Module {
    constructor(name, bookmarks, id) {
        super(name);
        this.bookmarks = bookmarks;
        this.id = id;
    }

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
        addButton.addEventListener('click', (e) => this.renderForm(e))
        footer.appendChild(addButton);
        return footer;
    }

    getnameFormHTML() {
        let form = document.createElement('form');

        let nameLabel = document.createElement('label');
        nameLabel.name = 'name';
        nameLabel.innerText = 'Name: ';
        form.appendChild(nameLabel);

        let nameField = document.createElement('input');
        nameField.name = 'name';
        nameField.value = this.name;
        form.appendChild(nameField);

        return form;
    }

    addBookmark(bookmark) {
        let bookmarks_list = this.div.querySelector('.bookmarks-list')
        let li = document.createElement('li');
        li.appendChild(bookmark.getHTML());
        bookmarks_list.appendChild(li); 
    }
    
    //Callback to render 'add bookmark form' on click
    renderForm(e) {
        //Get the footer section of the module
        let section = e.target.parentElement;
        destroyAllChildren(section);
                
        //Generate the form html
        let form = document.createElement('form');
        
        let bookmarkNameLabel = document.createElement('label')
        bookmarkNameLabel.textContent = 'Bookmark Name: ';
        let bookmarkNameField = document.createElement('input')
        bookmarkNameField.name = 'name';
        form.appendChild(bookmarkNameLabel);
        form.appendChild(bookmarkNameField);

        form.appendChild(document.createElement('br'));

        let bookmarkURLLabel = document.createElement('label')
        bookmarkURLLabel.textContent = 'Bookmark URL: ';
        let bookmarkURLField = document.createElement('input')
        bookmarkURLField.name = 'url';
        form.appendChild(bookmarkURLLabel);
        form.appendChild(bookmarkURLField);

        form.appendChild(document.createElement('br'));

        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.textContent = 'add new bookmark';
        form.appendChild(submit);
        
        //TODO fix exit button to 'unrender' form
        let exit = document.createElement('button');
        exit.onclick = e => {
            e.preventDefault()
            this.div.querySelector('footer').remove()
            this.div.appendChild(this.getFooterHTML());
        }
        exit.textContent = 'done adding';
        form.appendChild(exit);
        
        //Form Submit Callback
        form.addEventListener('submit', e => {
            //add validations maybe
            e.preventDefault();
            console.log(this.id);
            let bookmark = new Bookmark(bookmarkNameField.value, bookmarkURLField.value, this.id);
            bookmark.save()
            this.addBookmark(bookmark);

        });
         
        section.appendChild(form);

        
    }
}
