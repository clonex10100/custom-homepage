class Module {
    container = document.getElementById('module-container');

    constructor(name, adapters, id, contentType) {
        this.name = name;
        this.id = id;

        //Bind content adapters for later use and module adapter
        this.adapters = adapters
        this.adapter = adapters.module;

        //Content is polymorphic. Fetch the content json info and create the correct js object with it.
        this.contentType = contentType
        this.adapter.getContent(this.id, json => this._createContent(json));

        //Keep track of all modules for sorting
        Module.all.push(this);
    }

    //Create and bind the correct content type
    _createContent(json) {
        switch(this.contentType) {
            case 'BookmarkContainer':
                this.content = new BookmarkContainer(this, this.adapters.bookmark, json.id, json.bookmarks);
                break;
            case 'Note':
                this.content = new Note(this, this.adapters.note, json.id, json.content);
                break;
        }
        this.contentCreated = true;
    }

    get _headerHTML() {
        let header = document.createElement('header');
        let title = document.createElement('h3');
        title.classList.add('module-name');
        title.innerText = this.name;
        header.appendChild(title);

        return header;
    }

    get _contentContainerHTML() {
        let section = document.createElement('section');
        section.classList.add('content');
        return section;
    }

    get _footerHTML() {
        let footer = document.createElement('footer');
        this.editButton = document.createElement('button')
        this.editButton.textContent = 'Edit Module';
        this.editButton.onclick = this._renderEdit.bind(this);
        footer.appendChild(this.editButton);
        return footer;
    };


    //Every module has 3 components, a header, content, and footer. This method puts them all together.
    get _HTML() {
        let div = document.createElement('div');
        div.classList.add('module');

        div.appendChild(this._headerHTML);

        div.appendChild(document.createElement('hr'));

        div.appendChild(this._contentContainerHTML);

        div.appendChild(document.createElement('hr'));

        div.appendChild(this._footerHTML);

        return div;
    }

    render() {
        this.div = this._HTML;
        this.container.appendChild(this.div);
        this._renderContent()

    }

    //generates the modules html and adds it to the page, should only be called once
    _renderContent(){
        //If content object hasn't been created wait 50ms and try again
        if (this.contentCreated) {
            this.content.render()
        }else {
            setTimeout(() => this._renderContent(), 50)
        }
    }

    get _nameFormHTML() {
        let form = document.createElement('form');
        form.classList.add('name-form');

        let nameField = document.createElement('input');
        nameField.type = 'text';
        nameField.classList.add('name-field');
        nameField.value = this.name;

        form.appendChild(nameField);

        return form;
    }

    _renderEdit(e) {
        e.preventDefault();
        this.content.renderEdit()

        //Add form to update name
        this.div.querySelector('.module-name').remove()

        this.div.querySelector('header').appendChild(this._nameFormHTML);

        //change edit button to done editing button
        this.editButton.textContent = 'Finished Editing';
        this.editButton.onclick = this._finishEditing.bind(this);
    }

    //Updates the module and its content
    _finishEditing(e) {
        this._update(e);
        this.content.update();
    }

    _update(e) {
        e.preventDefault()
        let name = this.div.querySelector('.name-field').value;
        //Only query the api with an update if the name actually changed
        if (name !== this.name) {
            this.adapter.updateModule(this.id, {name: name}, json => {
                this.name = json.name;
                this._derenderEdit();
            });
        } else {
            this._derenderEdit();
        }
    }

    _derenderEdit() {
        this.div.querySelector('header').remove();
        this.div.prepend(this._headerHTML);

        this.editButton.textContent = 'Edit Module';
        this.editButton.onclick = this._renderEdit.bind(this);
    }
}
Module.all = [];
