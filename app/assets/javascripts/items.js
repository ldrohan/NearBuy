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
                var image = 'http://www.topfurnitures.com/wp-content/themes/TheJewelryShopDark/images/shopping_icon.jpg';
                var current = 'http://img.lib.msu.edu/mobile/user_icon_g.png';




                var marker = new google.maps.Marker({
                    position: pos,
                    draggable: false,
                    opacity: .7,
                    animation: google.maps.Animation.DROP,
                    icon: current,
                    map: map,
                    title: "Current Location"
                });

                $.ajax('/items.json', {
                    type: 'get'
                }).success(function(data) {
                    for (var x in data) {
                        var infowindow = new google.maps.InfoWindow();
                        var email = data[x]["email"];
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(data[x]["lat"], data[x]["long"]),
                            draggable: false,
                            opacity: .9,

                            animation: google.maps.Animation.DROP,
                            icon: image,
                            titleInfo: data[x]["name"],
                            imageInfo: data[x]["image"],
                            emailInfo: data[x]["email"],
                            phoneInfo: data[x]["phone"],
                            descriptionInfo: data[x]["description"],
                            map: map

                        });

                        google.maps.event.addListener(marker, 'click', function() {
                                infowindow.setContent('<h3 style="text-align:center;">' + this.titleInfo + '</h3>' + '</br>' +
                                    '<IMG BORDER="0" ALIGN="Left" HEIGHT="50" WIDTH="50" SRC=' + this.imageInfo + '>' + '</br>' +
                                    this.descriptionInfo + '</br>' + '</br>' + 'Email Address: ' + this.emailInfo + '</br>' +
                                    'Phone: ' + this.phoneInfo + '</br>' + '<form><input id="from" placeholder="Your Email"></input></br><textarea id="body"></textarea></br><button class="button" id="submit" type="submit">Send Email!</button></form>'
                                );
                                infowindow.open(map, this);
                                

                                google.maps.event.addListener(infowindow, 'domready', function() {
    															$('#submit').click(function(e){
                                		var from = $("#from").val();
                                		var body = $("#body").val();
                                	e.preventDefault();
                                
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
                                        // var bandID = data.id;
                                        // loadAlbums(bandID);
                                        console.log(data);
                                    }
                                	});
                                  })

																});

                        });
                                
                           

                   }
                });



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