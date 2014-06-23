class PostMailer < ActionMailer::Base
	def post_email(from,to,body)
		mail(from:from,to:to,subject:"Hi! I'm interested in your post",body:body)
		binding.pry
	end	
end	