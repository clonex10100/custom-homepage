class PageModule < ActiveRecord::Base
  belongs_to :homepage
  belongs_to :content, polymorphic: true, dependent: :destroy

  before_create do
    highest_priority = self.homepage.page_modules.order('sort_priority desc').first
    self.sort_priority = highest_priority ? highest_priority.sort_priority + 1 : 0
  end
end
