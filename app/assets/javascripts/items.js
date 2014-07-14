function initialize() {
	
    var style_array = [{"stylers":[{"saturation":-100}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#0099dd"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#aadd55"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{}]

    var mapOptions = {
        zoom: 10,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: style_array
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                var bag = '/assets/favoritemarker.png';
                var current = 'http://img.lib.msu.edu/mobile/user_icon_g.png';
                var selected_marker = 'https://www.mynycb.com/SiteCollectionImages/NYCBWebSite/mylocation.png'
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
									map.setCenter(pos);
									map.setZoom(10);
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


                        var list = $('.results').append('<div class="listitem" id=' + id + '>' + '<div><img id=listthumbnail src=' + image + '></div><div>' + name +  '</div></br>' + '</div>')
                        	
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
                        		map.panTo(current.getPosition());
                        		current.setIcon(selected_marker);
                        		current.setOpacity(1);
                        		$(this).addClass("hover");
                                google.maps.event.trigger(current, 'click');
             	         		});
                                                  
                            // Creates new marker and pushes into markers array
                          markers[data[x]["id"]] = new google.maps.Marker({
                            position: new google.maps.LatLng(data[x]["lat"], data[x]["long"]),
                            draggable: false,
                            opacity: .7,
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
                        //adds opacity to marker on hover
                        google.maps.event.addListener(markers[data[x]["id"]], 'mouseover', function() {
    					  this.setOpacity(1);
						});
													
						//removes opacity from marker when mouse leaves			
                        google.maps.event.addListener(markers[data[x]["id"]], 'mouseout', function() {
    				      this.setOpacity(.5);
					    });
                       
                       var openWindow = function() {google.maps.event.addListener(markers[data[x]["id"]], 'click', function() {

                                var closeID = this.idInfo   
                                var saveEmail = this.emailInfo
                                var saveName = this.titleInfo
                                var saveImage = this.imageInfo
                                var saveDescription = this.descriptionInfo
                                var savePhone = this.phoneInfo
                                var saveLat = this.latInfo
                                var saveLong = this.longInfo

                                google.maps.event.addListener(infowindow,'closeclick',function(){
                                    //removes hover style from corresponding scroll item upon closing infowindow
                                    // map.panTo(current.getPosition());
                                    $('#' + closeID).toggleClass("hover");
                                });

                                var container = $('.results'),

                                    scrollTo = $('#' + this.idInfo);
                                    $(container).animate({  scrollTop:
                                        scrollTo.offset().top - container.offset().top + container.scrollTop()
                                        },400);
                                        $('#' + this.idInfo).toggleClass("hover");

	                                if(allData === '/favorite.json'){
	                                	$('#remove').append('<button id="removefavorite">Remove Shit</button>');
	                                }
                                if(savePhone != null){                                	
                                	infowindow.setContent('<h3 id="infowindowtitle" style="text-align:center;">' + saveName + '</h3>' + '</br>' +
                                    '<IMG id="thumbnail" SRC=' + saveImage + '>' + '<span id="infowindowbody">' + '</br>' +
                                    saveDescription + '<hr></hr>' + '</br>' + 'Email Address: ' + saveEmail + '</br>' +
                                    'Phone: ' + '<span id="phonespan">' + savePhone + '<span>' + '</br>' + '<span>' + '<span id ="sentemail">' + '</br>' + '<form id="emailform"><div>Subject: Hi! I\'m Interested In Your Post...<div><input id="from" placeholder="Your Email Address"></input></br><textarea id="body" placeholder="Say Something Nice..."></textarea></br><button class="button" id="submit" type="submit">Send Email!</button></form>' + '</span>' + '<button class="button" id="favorite" type="submit">Add To Favorites!</button><div id="remove"></div>'
                                );
                              }else{
                              	infowindow.setContent('<h3 id="infowindowtitle" style="text-align:center;">' + saveName + '</h3>' + '</br>' +
                                    '<IMG id="thumbnail" SRC=' + saveImage + '>' + '<span id="infowindowbody">' + '</br>' +
                                    saveDescription + '<hr></hr>' + '</br>' + 'Email Address: ' + saveEmail + '</br>' + '</br>' + '<span>' + '<span id ="sentemail">' + '<form id="emailform"><div>Subject: Hi! I\'m Interested In Your Post...<div><input id="from" placeholder="Your Email Address"></input></br><textarea id="body" placeholder="Say Something Nice..."></textarea></br><button class="button" id="submit" type="submit">Send Email!</button></form>' + '</span>' + '<button class="button" id="favorite" type="submit">Add To Favorites!</button>' + '<div id="remove"></div>'
                                );

                              }
                                
                                	
                                                 
                                infowindow.open(map, this);

                                
																
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
                                            "from": from, "to": saveEmail, "body": body
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