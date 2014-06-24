class ItemsController < ApplicationController
	respond_to :json

	def index
		respond_with Item.all
	end	

	def map

	end	

	def send_email
		PostMailer.post_email(params["email"]["from"],params["email"]["to"],params["email"]["body"])
	end	

	def save_favorite
		@favorite = Favorite.new
		@favorite.name = params['name']
    @favorite.description = params['description']
    @favorite.image = params['image']
    @favorite.email = params['email']
    @favorite.lat = params['lat']
    @favorite.long = params['long']
    @favorite.phone = params['phone']
    @favorite.save
	end	

	def favorites_index
		respond_with Favorite.all
	end	
end
