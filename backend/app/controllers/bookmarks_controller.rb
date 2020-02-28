class BookmarksController < ApplicationController
  def create
    Bookmark.create(bookmark_params)
  end

  private
  def bookmark_params
    params.require(:bookmark).permit(:bookmark_module_id, :name, :url)
  end
end
