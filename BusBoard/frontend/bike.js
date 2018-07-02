//this has to be globa due to werid google maps stuff
 var bikes;
  function loadMap() {
    if (document.querySelectorAll('#map').length > 0)
    {
      var js_file = document.createElement('script');
      js_file.type = 'text/javascript';
      js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCNQJf9rOC5mKTnRM8xF2oVdizKOK0IwGs&callback=initMap&language=en';
      document.getElementsByTagName('head')[0].appendChild(js_file);
    }
  };

function submit(){
    console.log('submit press');

    var xhttp = new XMLHttpRequest();
    var postcode = document.getElementById("postcode");

    xhttp.open('GET', 'http://127.0.0.1:3000/bikeBoard/'+postcode.value, true);
    
    xhttp.setRequestHeader('Content-Type', 'application/json');
    
    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        
        bikes = JSON.parse(xhttp.responseText);
        var list = document.getElementById("bikeList");
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }

        bikes.forEach(bike =>{
            let niceBikeString='Bike point: '+bike.stopName;
            let li = document.createElement("li");
            let icon = document.createElement("i");
            let att = document.createAttribute("class");
            att.value = "fa-li fa fa-bicycle icon-color";
            icon.setAttributeNode(att);
            li.appendChild(icon);
            li.appendChild(document.createTextNode(niceBikeString));
            list.appendChild(li);
        });
       
        console.log(bikes) 
        loadMap();
    }
    
    xhttp.send();
}
var map;
function initMap() {
    //console.log('initmap is running')
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 8, center: {lat: 51.5074, lng: 0.1278}});
    plotMarkers();
  
  }

  function plotMarkers(){
    markers = [];
    bounds = new google.maps.LatLngBounds();

    bikes.forEach(function (marker) {
      var position = new google.maps.LatLng(marker.lat, marker.long);
  
      markers.push(
        new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.DROP
        })
      );
  
      bounds.extend(position);
    });
  
    map.fitBounds(bounds);
  }

