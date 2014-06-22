namespace :data do
  desc "Scraping CraigslistAPI Data"
  task :scrape => :environment do
    require "typhoeus"
    results = Typhoeus.get("https://dda4f36.ngrok.com/items.json").body
    items = JSON.parse(results)

    items.each do |i|
      @item = Item.new
      @item.name = i['name']
      @item.description = i['description']
      @item.image = i['image']
      @item.email = i['email']
      @item.lat = i['lat']
      @item.long = i['long']
      @item.phone = i['phone']
      @item.save
    end
  end
end
