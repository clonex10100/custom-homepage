class Module < ActiveRecord::Base
  has_one :content, polymorphic: true
end
