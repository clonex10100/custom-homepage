class Note extends Content {
    constructor(module, adapter, id, content) {
        super(module, adapter, id);
        this.content = content;
    }

    get _HTML() {
        let p = document.createElement('p');
        p.textContent = this.content;
        return p;
    }

    //Changes the note content into an editable text field
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
                this.content = json.content;
                this._derenderEdit();
            });
        } else {
            this._derenderEdit();  
        }
    }

    _derenderEdit() {
        this.div.querySelector('form').remove();
        this.div.appendChild(this._HTML());
    }

}
