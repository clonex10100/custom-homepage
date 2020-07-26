class BookmarksController < ApplicationController
  def create
    mod = @homepage.page_modules.find(params[:page_module_id])
    if mod.content_type == "BookmarkContainer"
      bookmark = mod.content.bookmarks.build(bookmark_params)
      bookmark.save
      render json: BookmarkSerializer.json(bookmark)
    end
  end

  def destroy
    mod = @homepage.page_modules.find(params[:page_module_id])
    if mod.content_type == "BookmarkContainer"
      bookmark = Bookmark.find(params[:id]).delete
    end
  end

  private
  def bookmark_params
    params.require(:bookmark).permit(:name, :url)
  end
end
