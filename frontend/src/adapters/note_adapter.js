class NoteAdapter extends Adapter {
    updateNote(module, content, callback) {
        let options = this.options()
        options.method = "PATCH"
        options.body = JSON.stringify({
            note: content
        })
        fetch(`${this.url}/page_modules/${module.id}/content`, options)
        .then(
            resp => resp.json()
        )
        .then(
            callback
        )
    }
}
