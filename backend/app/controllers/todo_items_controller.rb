class TodoItemsController < ApplicationController
  def create
    mod = @homepage.page_modules.find(params[:page_module_id])
    if mod.content_type == "TodoList"
      todo_item = mod.content.todo_items.build(todo_item_params)
      todo_item.save
      render json: TodoItemSerializer.json(todo_item)
    end
  end

  def destroy
    mod = @homepage.page_modules.find(params[:page_module_id])
    if mod.content_type == "TodoList"
      todo_item = TodoItem.find(params[:id]).delete
    end
  end

  def update
    mod = @homepage.page_modules.find(params[:page_module_id])
    if mod.content_type == "TodoList"
      todo_item = TodoItem.find(params[:id])
      todo_item.update(todo_item_params)
      render json: TodoItemSerializer.json(todo_item)
    end
  end

  private
  def todo_item_params
    params.require(:todo_item).permit(:content, :completed)
  end
end
