class Favorite < ActiveRecord::Base
	validates :name, uniqueness: true
end
