var api= require('./readingApi');
var Bus = require('./bus');

function GetFiveClosesBusesByPostcode(PostCode){
    var promise= new Promise(function(finalResolve,finalReject){
        var PromicelongLat = api.getLongLatWithPostCode(PostCode);
        PromicelongLat.then(function(val){
            longLat=([val.result.longitude,val.result.latitude]);
            var Promicestops = api.getClostStopsWithLongLat(longLat[0],longLat[1]);
            Promicestops.then(function(val){
                var stops=val.stopPoints;
               
                stops.sort((stop1, stop2) => {
                    return (stop1.distance-stop2.distance);
                });
                              // array of stops -> busses
                var busArray=Array();
                var toptwo =stops.slice(0, 2);
                var busPromices=Array();
                
                toptwo.forEach(element => {
                    busPromices.push(api.getBussesWithStopID(element.id));
                });
                Promise.all(busPromices).then(function(busvals){

                    busvals.forEach( bus => {
                        busArray= busArray.concat(bus);
                    });
                    busArray.sort((bus1,bus2)=>{return bus1.timeToStation-bus2.timeToStation});

                    let bussesList = [];
                    busArray.slice(0, 5).forEach(bus => {
                        let mins = Math.round(bus.timeToStation / 60);
                        bussesList.push(new Bus(bus.lineName, bus.stationName, bus.destinationName, bus.timeToStation));
                        console.log(bus.stationName + " " + bus.destinationName + " " + mins);
                    });
                    finalResolve(JSON.stringify(bussesList, null, 2));
                }).catch();                            
            }).catch();
        }).catch();
    });

    return promise;
}





module.exports={GetFiveClosesBusesByPostcode:GetFiveClosesBusesByPostcode}  

