var api= require('./readingApi');

function GetFiveClosesBuses(busStopID){

    var busPromice =api.getBussesWithStopID(busStopID);
    busPromice.then(function(val){
        val.sort((bus1, bus2) => { 
            return bus1.timeToStation - bus2.timeToStation;
        });
        for( let i = 0; i < Math.min(5, val.length); i++) {
            let minutes = Math.round(val[i].timeToStation / 60);
            console.log(val[i].lineName + " " + val[i].destinationName + " " + minutes + " min");
        }
    }).catch();
   
}
module.exports={GetFiveClosesBuses:GetFiveClosesBuses}  