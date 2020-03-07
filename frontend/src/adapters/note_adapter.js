class NoteAdapter {
    static updateNote(module, content, callback) {
        let options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                note: content
            })
        }
        fetch(`http://localhost:3000/homepages/1/page_modules/${module.id}/content`, options)
        .then(
            resp => resp.json()
        )
        .then(
            callback
        )
    }
}
