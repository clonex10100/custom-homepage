class Module {
    constructor(name, adapters, id, contentType) {
        this.name = name;
        this.id = id;
        this.contentType = contentType
        this.container = document.getElementById('module-container')
        this.adapters = adapters
        this.adapter = adapters.module;
        this.adapter.getContent(this.id, json => this.createContent(json));
        Module.all.push(this);
    }

    createContent(json) {
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

    getHeaderHTML() {
        let header = document.createElement('header');
        let title = document.createElement('h3');
        title.classList.add('module-name');
        title.innerText = this.name;
        header.appendChild(title);

        return header;
    }

    getContentContainerHTML() {
        let section = document.createElement('section');
        section.classList.add('content');
        return section;
    }

    getFooterHTML() {
        let footer = document.createElement('footer');
        this.editButton = document.createElement('button')
        this.editButton.textContent = 'Edit Module';
        this.editButton.onclick = this.renderEdit.bind(this);
        footer.appendChild(this.editButton);
        return footer;
    };


    //Every module has 3 components, a header, content, and footer. This method puts them all together.
    getHTML() {
        let div = document.createElement('div');
        div.classList.add('module');

        div.appendChild(this.getHeaderHTML());

        div.appendChild(document.createElement('hr'));

        div.appendChild(this.getContentContainerHTML());

        div.appendChild(document.createElement('hr'));

        div.appendChild(this.getFooterHTML());

        return div;
    }

    //generates the modules html and adds it to the page, should only be called once
    _renderContent(){
        if (this.contentCreated) {
            this.content.render()
        }else {
            setTimeout(() => this._renderContent(), 50)
        }
    }
    render() {
        this.div = this.getHTML();
        this.container.appendChild(this.div);
        this._renderContent()

    }

    update(e) {
        e.preventDefault()
        let name = this.div.querySelector('.name-field').value;
        if (name !== this.name) {
            this.adapter.updateModule(this.id, {name: name}, json => {
                this.name = json.name;
                this.derenderEdit();
            });
        } else {
            this.derenderEdit();
        }
    }

    getNameFormHTML() {
        let form = document.createElement('form');
        form.classList.add('name-form');

        let nameField = document.createElement('input');
        nameField.type = 'text';
        nameField.classList.add('name-field');
        nameField.value = this.name;

        form.appendChild(nameField);

        return form;
    }

    renderEdit(e) {
        e.preventDefault();
        this.content.renderEdit()

        //Add form to update name
        this.div.querySelector('.module-name').remove()

        this.div.querySelector('header').appendChild(this.getNameFormHTML());

        //change edit button to done editing button
        this.editButton.textContent = 'Finished Editing';
        this.editButton.onclick = this.finishEditing.bind(this);
    }

    finishEditing(e) {
        this.update(e);
        this.content.update();
    }

    derenderEdit() {
        this.div.querySelector('header').remove();
        this.div.prepend(this.getHeaderHTML());

        this.editButton.textContent = 'Edit Module';
        this.editButton.onclick = this.renderEdit.bind(this);
    }
}
Module.all = [];
