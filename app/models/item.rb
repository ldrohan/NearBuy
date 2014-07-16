class Item < ActiveRecord::Base
	validates :name, uniqueness: true
end
