class Note extends Content {
    constructor(module, adapter, id, content) {
        super(module, adapter, id);
        this.content = content;
        this.render()
    }

    getHTML() {
        let p = document.createElement('p');
        p.textContent = this.content;
        return p;
    }

    renderEdit() {
        this.div.querySelector('p').remove();
        let form = document.createElement('form');
        let textArea = document.createElement('textarea');
        textArea.value = this.content;
        form.appendChild(textArea);
        this.div.appendChild(form);
    }

    update() {
        let newContent = this.div.querySelector('textarea').value; 
        if (newContent !== this.content) {
            this.adapter.updateNote(this.module, {content: newContent}, json => {
                console.log(json);
                this.content = json.content;
                this.derenderEdit();
            });
        } else {
            this.derenderEdit();  
        }
    }

    derenderEdit() {
        this.div.querySelector('form').remove();
        this.div.appendChild(this.getHTML());
    }

}
