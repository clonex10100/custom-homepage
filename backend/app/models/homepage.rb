class Homepage < ApplicationRecord
  has_secure_password
  validates :name, uniqueness: true
  has_many :page_modules
end
