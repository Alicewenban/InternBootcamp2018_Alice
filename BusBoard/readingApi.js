var request = require('request');
var fs = require('fs');
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
module.exports={getBussesWithStopID:getBussesWithStopID}