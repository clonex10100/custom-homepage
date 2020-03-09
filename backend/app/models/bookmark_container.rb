class BookmarkContainer < ActiveRecord::Base
  has_many :bookmarks, dependent: :destroy
  #is content
  has_one :page_module
end
