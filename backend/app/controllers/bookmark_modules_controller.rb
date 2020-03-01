class BookmarkModulesController < ApplicationController
  def index
    bookmark_modules = BookmarkModule.all
    render json: BookmarkModuleSerializer.json(bookmark_modules)
  end

  def create
    bookmark_module = BookmarkModule.new(bookmark_module_params)
    if bookmark_module.save
      render json: BookmarkModuleSerializer.json(bookmark_module) 
    else
      render json: { :errors => bookmark_module.errors.full_messages }, :status => 422
    end
  end

  private
  def bookmark_module_params
    params.require(:bookmark_module).permit(:name, :homepage_id)
  end
end
