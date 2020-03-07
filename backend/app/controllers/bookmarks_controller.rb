class BookmarksController < ApplicationController
  def create
    bookmark = Bookmark.create(bookmark_params)
    render json: BookmarkSerializer.json(bookmark)
  end

  def destroy 
    bookmark = Bookmark.find(params[:id]).delete
  end

  private
  def bookmark_params
    params.require(:bookmark).permit(:bookmark_container_id, :name, :url)
  end
end
