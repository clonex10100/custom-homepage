class ContentsController < ApplicationController
  def show
    homepage = Homepage.find(params[:homepage_id])
    page_module = homepage.page_modules.find(params[:page_module_id])
    render json: case page_module.content_type
    when "BookmarkContainer"
      BookmarkContainerSerializer.json(page_module.content)
    end


  end
end
