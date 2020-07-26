class TodoItemAdapter extends Adapter {
    postTodoItem(containerId, content, callback) {
        let options = this.options()
        options.method = 'POST';
        options.body = JSON.stringify({
            todo_item: content
        });

        fetch(`${this.url}/page_modules/${containerId}/todo_items`, options)
            .then(
                resp => resp.json()
            ).then(
                json => callback(json)
            )
    }
    toggleCompleted(todo_item, callback) {
        let options = this.options()
        options.method = 'PATCH';
        options.body = JSON.stringify({
            todo_item: { completed: !todo_item.completed }
        });

        fetch(`${this.url}/page_modules/${todo_item.container.module.id}/todo_items/${todo_item.id}`, options)
            .then(
                resp => resp.json()
            ).then(
                json => callback(json)
            )
    }

    deleteTodoItem(todo_item, callback) {
        let options = this.options()
        options.method = 'DELETE';

        fetch(`${this.url}/page_modules/${todo_item.container.module.id}/todo_items/${todo_item.id}`, options)
            .then(
                callback()
            )
    }

}
