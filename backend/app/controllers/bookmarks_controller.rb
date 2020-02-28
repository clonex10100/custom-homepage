class BookmarksController < ApplicationController
  def create
    bookmark = Bookmark.create(bookmark_params)
    render json: BookmarkSerializer.json(bookmark)
  end

  private
  def bookmark_params
    params.require(:bookmark).permit(:bookmark_module_id, :name, :url)
  end
end
