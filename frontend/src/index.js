fetch('http://localhost:3000/homepages/1/bookmark_modules').then( resp => resp.json()).then(function(json) {
    json.forEach(bookmark_module_json => {
        let bookmark_module = new BookmarkModule(bookmark_module_json.name, bookmark_module_json.id, bookmark_module_json.bookmarks)
        bookmark_module.render()
    });
});

noteDummyData = [
    ['shopping list', 1, 'Apples \n Oranges \n Milk'],
    ['todo list', 2, 'finish js portfolio project, eat, sleep']
];

noteDummyData.forEach(noteModParams => {
    let nm = new NoteModule(...noteModParams);
    nm.render();
});

let form = document.getElementById('new-module-form');
form.addEventListener('submit', e => {
    e.preventDefault()
    let nameField = e.target.querySelector('[name="name"]')
    let bm = new BookmarkModule(nameField.value)
    bm.save()
    nameField.value = '';
});
