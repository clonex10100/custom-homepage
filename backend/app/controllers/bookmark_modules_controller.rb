class BookmarkModulesController < ApplicationController
  def index
    homepage = Homepage.find(params[:homepage_id])
    bookmark_modules = homepage.bookmark_modules
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

  def update
    bookmark_module = BookmarkModule.find(params[:id])
    if bookmark_module.update(name: params[:name]);
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
