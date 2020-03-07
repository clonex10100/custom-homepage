class NoteAdapter extends Adapter {
    updateNote(module, content, callback) {
        let options = this.options()
        options.method = "PATCH"
        options.body = JSON.stringify({
            note: content
        })
        fetch(`http://localhost:3000/homepages/1/page_modules/${module.id}/content`, options)
        .then(
            resp => resp.json()
        )
        .then(
            callback
        )
    }
}
