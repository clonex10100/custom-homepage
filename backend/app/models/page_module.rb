class PageModule < ActiveRecord::Base
  belongs_to :homepage
  belongs_to :content, polymorphic: true, dependent: :destroy
end
