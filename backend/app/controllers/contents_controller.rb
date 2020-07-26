class ContentsController < ApplicationController
  def show
    page_module = @homepage.page_modules.find(params[:page_module_id])
    render json: case page_module.content_type
    when 'BookmarkContainer'
      BookmarkContainerSerializer.json(page_module.content)
    when 'Note'
      NoteSerializer.json(page_module.content)
    when 'TodoList'
      TodoListSerializer.json(page_module.content)
    end
  end

  def update
    page_module = @homepage.page_modules.find(params[:page_module_id])
    render json: case page_module.content_type
    when "Note"
      page_module.content.update(note_params)
      NoteSerializer.json(page_module.content)
    end
  end

  private
  def note_params
    params.require(:note).permit(:content)
  end
end
