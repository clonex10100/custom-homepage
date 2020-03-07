class ContentsController < ApplicationController
  def show
    homepage = Homepage.find(params[:homepage_id])
    page_module = homepage.page_modules.find(params[:page_module_id])
    render json: case page_module.content_type
    when "BookmarkContainer"
      BookmarkContainerSerializer.json(page_module.content)
    when "Note"
      NoteSerializer.json(page_module.content)
    end
  end

  def update
    homepage = Homepage.find(params[:homepage_id])
    page_module = homepage.page_modules.find(params[:page_module_id])
    render json: case page_module.content_type
    when "Note"
      puts note_params
      page_module.content.update(note_params)
      NoteSerializer.json(page_module.content)
    end
  end

  private
  def note_params
    params.require(:note).permit(:content)
  end
end
