class ItemsController < ApplicationController
	respond_to :json

	def index
		respond_with Item.all
	end	

	def map

	end	

	def send_email
		@email = params["email"]["body"]
		binding.pry
		PostMailer.post_email(params["email"]["from"],params["email"]["to"],params["email"]["body"]).deliver
		
	end	

	def save_favorite
		@favorite = Favorite.new
		@favorite.name = params["favorite"]['name']
    @favorite.description = params["favorite"]['description']
    @favorite.image = params["favorite"]['image']
    @favorite.email = params["favorite"]['email']
    @favorite.lat = params["favorite"]['lat']
    @favorite.long = params["favorite"]['long']
    @favorite.phone = params["favorite"]['phone']
    @favorite.save
    respond_with @favorite
	end	

	def favorites_index
		respond_with Favorite.all
	end	
end
