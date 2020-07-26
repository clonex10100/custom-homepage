class TodoList < ActiveRecord::Base
  has_many :todo_items, dependent: :destroy
  has_one :page_module
end
