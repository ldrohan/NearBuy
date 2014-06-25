class PostMailer < ActionMailer::Base

	default from: ENV['EMAIL_FROM_ADDRESS']	

	def post_email(from,to,body)
		@url = 'http://www.google.com'
		@from = from
		mail(
			from: "nearbuysf@gmail.com",
			to:to,
			subject:"Hi! I'm interested in your post",
			body:body + "  Please respond to #{@from}",
			content_type: "text/html")
	end	
end	