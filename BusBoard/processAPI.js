var api= require('./readingApi');
var Bus = require('./bus');
var bikeStop = require('./bikeStop');

function showErrorMessage(err) {
    console.log(err);
}

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

                Promise.all(busPromices).then((busvals) => {
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
                }).catch(showErrorMessage);  
            }).catch(showErrorMessage);
        }).catch(showErrorMessage);
    });

    return promise;
}

function getFiveClosesBikePoints(PostCode){
    var promise= new Promise(function(finalResolve,finalReject){
        var promicelongLat = api.getLongLatWithPostCode(PostCode);
        promicelongLat.then(function(LL){
            longLat=([LL.result.longitude,LL.result.latitude]);
            var Promicestops = api.getBikeStops();
            Promicestops.then(function(stops){
                stops.sort((stop1, stop2) => {
                    dis1= Math.pow(stop1.lat-longLat[1],2)+Math.pow(stop1.lon-longLat[0],2);
                    dis2= Math.pow(stop2.lat-longLat[1],2)+Math.pow(stop2.lon-longLat[0],2)
                    return (dis1-dis2);
                });
                bikeStops=Array();
                stops.forEach(stop =>{
                    bikeStops.push(new bikeStop(stop.commonName,stop.lat,stop.lon));
                });
                bikeStops=bikeStops.slice(0,5);
                console.log(bikeStops);
                finalResolve(JSON.stringify(bikeStops, null, 2));
            }).catch(showErrorMessage);
        }).catch(showErrorMessage);
    });
    return promise;
}



module.exports={GetFiveClosesBusesByPostcode:GetFiveClosesBusesByPostcode,getFiveClosesBikePoints:getFiveClosesBikePoints}  

