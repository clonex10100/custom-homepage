class TodoItem {
    constructor(container, adapter, {id, content, completed}) {
        this.container = container;
        this.adapter = adapter;
        this.id = id;
        this.content = content;
        this.completed = completed;
    }

    get _HTML() {
        let li = document.createElement('li');
        li.dataset.id = this.id;
        li.textContent = this.content;

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.completed;
        checkbox.addEventListener('input', e => {
            e.preventDefault();
            this.adapter.toggleCompleted(this, json => {
                this.completed = json.completed; 
                //checkbox.checked = this.completed;
            });
        });
        li.appendChild(checkbox);
        return li;
    }

    render() {
        this.li = this._HTML
        this.container.div.querySelector('.todo-list').appendChild(this.li)
    }

    renderEdit() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.onclick = e => {
            this.adapter.deleteTodoItem(this, this.destroy.bind(this));
            this.container.removeTodoItem(this);
        };
       this.li.appendChild(deleteButton); 
    }

    deRenderEdit() {
        this.li.querySelector('button').remove();
    }

    destroy() {
        this.li.remove();
    }
}
