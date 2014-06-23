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
end
