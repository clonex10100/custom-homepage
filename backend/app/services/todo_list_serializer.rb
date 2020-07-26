class TodoListSerializer
  def self.json(todo_list)
    options = {
        only: [:id],
        include: {
          todo_items: {
            only: [:id, :content, :completed]
          }
        }
      }
    todo_list.to_json(options)
  end
end
