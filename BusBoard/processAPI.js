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
                    let distance1 = Math.pow(stop1.longitude - longLat[0]) + Math.pow(stop1.latitude -longLat[1]);
                    let distance2 = Math.pow(stop2.longitude - longLat[0]) + Math.pow(stop2.latitude -longLat[1]);

                    return (distance1 - distance2) * 1000000;
                });

                // array of stops -> busses
                var busArray=Array();
                let counter = 0;

                var toptwo =stops.slice(0, 2);
                toptwo.forEach(element => {
                    busPromice=api.getBussesWithStopID(element.id);
                    busPromice.then(function(val){
                        for( let i = 0; i < val.length; i++) {
                            busArray.push(val[i]);

                        }
                        counter ++;
                        if(counter == 2) {
                            busArray.sort((bus1, bus2) => { 
                                return bus1.timeToStation - bus2.timeToStation;
                            });
                            let bussesList = [];
                            busArray.slice(0, 5).forEach(bus => {
                                let mins = Math.round(bus.timeToStation / 60);
                                bussesList.push(new Bus(bus.lineName, bus.stationName, bus.destinationName, bus.timeToStation));
                                console.log(bus.stationName + " " + bus.destinationName + " " + mins);
                            });

                            finalResolve( JSON.stringify(bussesList, null, 2));
                        } 
                    }).catch(
                        //console.log("there was an error please reStart program")
                    );                   
            });
        }).catch();
    }).catch();
    });

    return promise;
}





module.exports={GetFiveClosesBusesByPostcode:GetFiveClosesBusesByPostcode}  