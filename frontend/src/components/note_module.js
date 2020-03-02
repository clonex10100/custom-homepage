class NoteModule extends Module {
    constructor(name, id, note) {
        super(name, id);
        this.note = note;
    }

    getContentHTML() {
        let section = super.getContentHTML();
        let p = document.createElement('p');
        p.textContent = this.note;
        section.appendChild(p);
        return section;
    }

    getNoteForm() {
        let form = document.createElement('form');
        let note = document.createElement('textarea');
        note.value = this.note;

        form.appendChild(note);
        return form;
    }

    renderEdit(e) {
        super.renderEdit(e);
        let section = this.div.querySelector('section')
        destroyAllChildren(section);
        section.appendChild(this.getNoteForm());
    }
}
