var request = require('request');
var apiIdandKey= '?app_id=572e2916&app_key=a9d4488d43877e4e783f1a676e865c38';

function getBussesWithStopID(busStopId){
    var promise= new Promise(function(resolve,reject){
        request.get('https://api.tfl.gov.uk/StopPoint/'+busStopId+'/Arrivals'+apiIdandKey, { json: true }, (err, res, body) => {
            if(err) {
                reject(err);
            } else {
                resolve(body);
                
            }
        });  
    });
    return promise;
}


function getLongLatWithPostCode(postcode){
    var promise= new Promise(function(resolve,reject){
        request.get('https://api.postcodes.io/postcodes/'+postcode, { json: true }, (err, res, body) => {
            if(err) {
                reject(err);
            } else {
                resolve(body);
                
            }
        });  
    });
   return promise;
    
}
function getClostStopsWithLongLat(long,lat){
    var promise= new Promise(function(resolve,reject){
        request.get( 'https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&radius=500&useStopPointHierarchy=true&modes=bus&returnLines=true&lat='+lat+'&lon='+long, { json: true }, (err, res, body) => {
            if(err) {
                reject(err);
            } else {
                resolve(body);
                
            }
        });  
    });
    return promise;
}

function getBikeStops(){
    var promise= new Promise(function(resolve,reject){
        request.get( 'https://api.tfl.gov.uk/BikePoint', { json: true }, (err, res, body) => {
            if(err) {
                reject(err);
            } else {
                resolve(body);   
            }
        });  
    });
    return promise;
}


module.exports={getBikeStops:getBikeStops,getBussesWithStopID:getBussesWithStopID,getLongLatWithPostCode:getLongLatWithPostCode,getClostStopsWithLongLat:getClostStopsWithLongLat,}