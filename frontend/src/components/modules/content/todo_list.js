class TodoList extends Content {
    constructor(module, adapter, id, todo_items_data = []) {
        super(module, adapter, id)
        this.todo_items = todo_items_data.map(todo_item_hash => {
            return new TodoItem(this, this.adapter, todo_item_hash);
        });
    }

    get _HTML() {
        let ul = document.createElement('ul')
        ul.classList.add('todo-list');

        return ul;
    }

    render() {
        super.render()
        this.todo_items.forEach(todo_item => todo_item.render());
    }

    renderEdit() {
        let form = this._todoItemFormHTML;
        this.todo_items.forEach(todo_item => todo_item.renderEdit());
        this.div.append(form);
    }

    _derenderEdit() {
        this.todo_items.forEach(todo_item => todo_item.deRenderEdit());
        this.div.querySelector('form.new-todo-item').remove()
    }

    get _todoItemFormHTML() {
        let form = document.createElement('form');
        form.classList.add('new-todo-item');

        let input = document.createElement('input');
        let label = document.createElement('label');
        label.htmlFor = "content";
        label.textContent = "Task: "

        input.type = "text";
        name = "content";


        let submit = document.createElement('input');
        submit.value = "Submit";
        submit.type = "submit";

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(submit);

        form.addEventListener('submit', e => {
            e.preventDefault();

            let todo_item;
            this.adapter.postTodoItem(this.module.id, {content: input.value, completed: false}, json => {
                console.log(json);
                todo_item = new TodoItem(this, this.adapter, json); 
                this.todo_items.push(todo_item);
                todo_item.render();
                todo_item.renderEdit();
            });
        });
        return form;
    }

    removeTodoItem(target_todo_item) {
        this.todo_items = this.todo_items.filter(todo_item => todo_item !== target_todo_item);
    }
}
