class BookmarkModulesController < ApplicationController
  def index
    bookmark_modules = BookmarkModule.all
    render json: BookmarkModuleSerializer.json(bookmark_modules)
  end

  def create
    bookmark_module = BookmarkModule.create(bookmark_module_params)
    render json: BookmarkModuleSerializer.json(bookmark_module)
  end

  private
  def bookmark_module_params
    params.require(:bookmark_module).permit(:name)
  end
end
