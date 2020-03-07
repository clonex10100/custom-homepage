class BookmarkContainer < ActiveRecord::Base
  has_many :bookmarks
  #is content
  has_one :page_module
end
