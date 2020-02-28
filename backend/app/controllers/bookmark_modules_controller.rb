class BookmarkModulesController < ApplicationController
  def index
    bookmark_modules = BookmarkModule.all
    render json: BookmarkModuleSerializer.json(bookmark_modules)
  end
end
