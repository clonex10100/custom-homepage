class TodoItemSerializer
  def self.json(todo_item)
    options = {
      only: [:id, :content, :completed]
    }

    todo_item.to_json(options)
  end
end
