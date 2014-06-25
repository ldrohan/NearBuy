function initialize() {
		
    var mapOptions = {
        zoom: 11,
        streetViewControl: false
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                var bag = 'http://www.topfurnitures.com/wp-content/themes/TheJewelryShopDark/images/shopping_icon.jpg';
                var current = 'http://img.lib.msu.edu/mobile/user_icon_g.png';
                var markers = []
                var allData = '/items.json'
                var favoritesData = '/favorite.json'
                function removeMarkers(){
    							if (markers) {
        						for (i in markers) {
            						markers[i].setMap(null);
        						}
       						  markers = [];
    							}
								}
								
    						$('#showfavorites').click(function(e){		
									removeMarkers();
									$('.listitem').remove();
									var favoritesData = '/favorite.json'								
									e.preventDefault();
									everything(favoritesData); //executes correct json data call for favorites
      						console.log("Muh Favez");
      					});	

      					$('#showresults').click(function(e){
									removeMarkers();
									$('.listitem').remove();
									var allData = '/items.json'
									e.preventDefault();
									everything(allData); //executes correct json data call for scraped data
      						console.log("The Real OG");
      					});	

							  var marker = new google.maps.Marker({
                    position: pos,
                    draggable: false,
                    opacity: .7,
                    animation: google.maps.Animation.DROP,
                    icon: current,
                    map: map,
                    title: "Current Location"
                });

							  var loading = function(){
							  	google.maps.event.addListenerOnce(map, 'idle', function(){
   								 $('#alert-window').fadeOut(2000);
									});
							  }	
							  loading();
							  	
							var everything =  function(allData){
                $.ajax(allData, {
                    type: 'get'
                }).success(function(data) {
                    for (var x in data) {
                        var infowindow = new google.maps.InfoWindow();
                        var id = data[x]["id"]
                        var email = data[x]["email"];
                        var name = data[x]["name"];
                        var image = data[x]["image"]
                        var email = data[x]["email"]
                        var phone = data[x]["phone"]
                        var description = data[x]["description"]


                        var list = $('.results').append('<div class="listitem" id=' + id + '>' + name +  '</br>' + '</div>')
                        	
                        	$('.listitem').mouseenter(function(){
                        		var current = markers[this.id]
                        		current.setOpacity(1);
                        		$(this).addClass("hover");
             	         		});

             	         		$('.listitem').mouseleave(function(){
                        		var current = markers[this.id]
                        		current.setOpacity(.5);
                        		$(this).removeClass("hover");
             	         		});

             	         		$('.listitem').click(function(){
                        		var current = markers[this.id]
                        		current.setOpacity(1);
                        		$(this).addClass("hover");
             	         		});
                                                  
                            // Creates new marker and pushes into markers array
                          markers[data[x]["id"]] = new google.maps.Marker({
                            position: new google.maps.LatLng(data[x]["lat"], data[x]["long"]),
                            draggable: false,
                            opacity: .5,
														animation: google.maps.Animation.DROP,
                            icon: bag,
                            idInfo: id,
                            titleInfo: name,
                            imageInfo: image,
                            emailInfo: email,
                            phoneInfo: phone,
                            latInfo: data[x]["lat"],
                            longInfo: data[x]["long"],
                            descriptionInfo: description,
                            map: map
												 	})
                        
                        google.maps.event.addListener(markers[data[x]["id"]], 'mouseover', function() {
    													this.setOpacity(1);
    													var container = $('.results'),
    															scrollTo = $('#' + this.idInfo);
																	container.scrollTop(
    																scrollTo.offset().top - container.offset().top + container.scrollTop()
																	);
																	$('#' + this.idInfo).toggleClass("hover");
												});
													
												google.maps.event.addListener(markers[data[x]["id"]], 'mouseout', function() {
    												this.setOpacity(.5);
    												$('#' + this.idInfo).toggleClass("hover");
												});
                       

                       var openWindow = function() {google.maps.event.addListener(markers[data[x]["id"]], 'click', function() {
                                var saveEmail = this.emailInfo
                                var saveName = this.titleInfo
                                var saveImage = this.imageInfo
                                var saveDescription = this.descriptionInfo
                                var savePhone = this.phoneInfo
                                var saveLat = this.latInfo
                                var saveLong = this.longInfo
                                infowindow.setContent('<h3 style="text-align:center;">' + saveName + '</h3>' + '</br>' +
                                    '<IMG BORDER="0" ALIGN="Left" HEIGHT="50" WIDTH="50" SRC=' + saveImage + '>' + '</br>' +
                                    saveDescription + '</br>' + '</br>' + 'Email Address: ' + saveEmail + '</br>' +
                                    'Phone: ' + savePhone + '</br>' + '<span id ="sentemail">' + '<form id="emailform"><input id="from" placeholder="Your Email Address"></input></br><textarea id="body" placeholder="Email Body"></textarea></br><button class="button" id="submit" type="submit">Send Email!</button></form>' + '</span>' + '<button class="button" id="favorite" type="submit">Add To Favorites!</button>'
                                );                 
                                infowindow.open(map, this);
                                
                               
                                //Scrolls to correct results id on selected pointer from map
                                var container = $('.results'),
    															scrollTo = $('#' + this.idInfo);
																	container.scrollTop(
    																scrollTo.offset().top - container.offset().top + container.scrollTop()
																);
																
																//Infowindow Email Setup and AJAX backend connection
																google.maps.event.addListener(infowindow, 'domready', function() {
    															$('#submit').click(function(e){
                                		var from = $("#from").val();
                                		var body = $("#body").val();
                                		e.preventDefault();
                                		$('#emailform').fadeOut(300,function(){
		 																	$('#emailform').remove();
																		});
                                		$('#sentemail').append('</br><div style="color:red">Your Email has been sent!</div>')
                                		$.ajax({
                                   	  url: ('/items/email'),
                                    	method: ('post'),
                                    	data: {
                                        "email": {
                                            "from": from, "to": email, "body": body
                                        }
                                    	},
                                    	dataType: "json",
                                    	success: function(data) {
                                        console.log(data);
                                    	}
                                		});
                                  })
																
																$('#favorite').click(function(e){																
																	e.preventDefault();

                                	$('#sentemail').append('</br><div style="color:green">Saved to Favorites!</div>')
                                	$.ajax({
                                   	url: ('/favorite'),
                                   	method: ('post'),
                                   	data: {
                                      "favorite": {
                                          "name": saveName, "image": saveImage, "description": saveDescription, "email": saveEmail, "lat": saveLat, "long": saveLong, "phone": savePhone
                                      }
                                   	},
                                   	dataType: "json",
                                   		success: function(data) {
                                      console.log(data);
                                   	}
                                	});
                                })
															});
												});

											} //thisone
											openWindow();											
                		}
              		});
								}
								everything(allData);

                    map.setCenter(pos);
                }, function() {
                    handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation handleNoGeolocation(false);
            }
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
                map: map,
                position: new google.maps.LatLng(60, 105),
                content: content
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
        }
    
        google.maps.event.addDomListener(window, 'load', initialize);