class BookmarkModule < ApplicationRecord
  has_many :bookmarks
  belongs_to :homepage

  validates :name, presence: true
end
