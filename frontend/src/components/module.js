class Module {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.container = document.getElementById('module-container')
    }

    //Decendents should probably not overwrite
    getHeaderHTML() {

        let header = document.createElement('header');
        let title = document.createElement('h3');
        title.classList.add('module-name');
        title.innerText = this.name;
        header.appendChild(title);

        return header;
    }

    //Should Always Be Overwritten by decendents
    getContentHTML() {
        let div = document.createElement('section')
        div.classList.add('module-content');
        return div;
    }

    //Decendents should probably not overwrite
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

        div.appendChild(this.getContentHTML());

        div.appendChild(document.createElement('hr'));

        div.appendChild(this.getFooterHTML());

        return div;
    }

    //generates the modules html and adds it to the page, should only be called once
    render() {
        if(!this.rendered) {
            this.div = this.getHTML();
            this.rendered = true
            this.container.appendChild(this.div);
        } else {
            throw 'Module should not be rendered twice'
        }
    }

    updateName(e) {
        e.preventDefault()
        this.name = this.div.querySelector('.name-field').value;
        this.adapter.updateBookmarkModule(this);
    }

    getNameFormHTML() {
        let form = document.createElement('form');
        form.classList.add('name-form');

        let nameField = document.createElement('input');
        nameField.type = 'text';
        nameField.classList.add('name-field');
        nameField.value = this.name;

        form.appendChild(nameField);

        //let submit = document.createElement('input');
        //submit.type = 'submit';
        //submit.value = 'Update Name';

        //form.addEventListener('submit', this.updateName.bind(this));
        //form.appendChild(submit);

        return form;
    }

    renderEdit(e) {
        e.preventDefault();

        //Add form to update name
        this.div.querySelector('.module-name').remove()

        this.div.querySelector('header').appendChild(this.getNameFormHTML());

        //change edit button to done editing button
        this.editButton.textContent = 'Finished Editing';
        this.editButton.onclick = this.finshEditing.bind(this);
    }

    finshEditing(e) {
        this.updateName(e);
        this.derenderEdit(e);
    }

    derenderEdit(e) {
        e.preventDefault()
        this.div.querySelector('header').remove();
        this.div.prepend(this.getHeaderHTML());

        this.editButton.textContent = 'Edit Module';
        this.editButton.onclick = this.renderEdit.bind(this);
    }

    //TODO, add real name editing functionality, this code is broken
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
}
