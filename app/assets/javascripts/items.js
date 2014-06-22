
function initialize() {
  var mapOptions = {
    zoom: 11,
    streetViewControl: false
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  //HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);    
      var image = 'http://www.topfurnitures.com/wp-content/themes/TheJewelryShopDark/images/shopping_icon.jpg';
      var current = 'http://img.lib.msu.edu/mobile/user_icon_g.png';
      
        
        
        
      var marker = new google.maps.Marker({
        position: pos,
        draggable:false,
        animation: google.maps.Animation.DROP,
        icon: current,
        map: map,
        title:"Current Location"
        });

      $.ajax('/items.json', {type: 'get'}).success(function(data){
          for (var x in data) {
            console.log(data[x]);
            console.log(data[x]["lat"]);
            
        
               var items = new google.maps.Marker({
                position: new google.maps.LatLng(data[x]["lat"],data[x]["long"]),
                draggable:false,
                animation: google.maps.Animation.DROP,
                icon: image,
                map: map,
                title:data[x]["description"]
               });  

          
         }
        });



      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
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
