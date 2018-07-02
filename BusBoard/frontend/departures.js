function submit(){
    console.log('submit press');

    var xhttp = new XMLHttpRequest();
    var postcode = document.getElementById("postcode");

    xhttp.open('GET', 'http://127.0.0.1:3000/departureBoards/'+postcode.value, true);
    
    xhttp.setRequestHeader('Content-Type', 'application/json');
    
    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText

        var buses = JSON.parse(xhttp.responseText);
        var list = document.getElementById("busList");
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }

        buses.forEach(bus =>{
            let min=Math.round(bus.timeToStation/60);
            let niceBusString='Bus Stop: '+bus.stationName+' Bus Name: '+bus.routeName+' Destination: '+bus.destination+' Minuits until: '+min;
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(niceBusString));
            list.appendChild(li);
        });
        console.log(buses)
    }
    
    xhttp.send();
}