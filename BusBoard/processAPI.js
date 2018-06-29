var api= require('./readingApi');

//Bus object?


function GetFiveClosesBusesByPostcode(PostCode){
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

                        busArray.slice(0, 5).forEach(bus => {
                            let mins = Math.round(bus.timeToStation / 60);
                            console.log(bus.stationName + " " + bus.destinationName + " " + mins);
                        });
                    } 
                }).catch(
                    //console.log("there was an error please reStart program")
                );   
            });        
            
           
        }).catch();
    }).catch();
   
}


module.exports={GetFiveClosesBusesByPostcode:GetFiveClosesBusesByPostcode}  