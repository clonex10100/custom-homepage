class Module {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.container = document.getElementById('module-container')
    }

    getHeaderHTML() {
        let header = document.createElement('header');

        let title = document.createElement('h3');
        title.classList.add('module-title');
        title.innerText = this.name;
        header.appendChild(title);

        return header;
    }
    

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
