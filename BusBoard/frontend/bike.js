function submit(){
    console.log('submit press');

    var xhttp = new XMLHttpRequest();
    var postcode = document.getElementById("postcode");

    xhttp.open('GET', 'http://127.0.0.1:3000/bikeBoard/'+postcode.value, true);
    
    xhttp.setRequestHeader('Content-Type', 'application/json');
    
    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText

        var bikes = JSON.parse(xhttp.responseText);
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
    }
    
    xhttp.send();
}