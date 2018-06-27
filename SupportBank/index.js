var readlineSync = require('readline-sync');
var fs = require('fs');
var moment = require('moment');
var data= require('./dataInput')


function ListAll(){
    //prints out all the accounts
    for (var key of personMap.keys()) {
        if(key!= undefined){ console.log(key + ' ' +personMap.get(key).balence);}
    }

}

function ListAllAccount(name){
    //starts on line 1 to ignore intro
    for(var trans of Transactions){  
        //print each element if relevent
        if(trans.to===name || trans.from ===name){
          console.log('date: '+trans.date.format("DD/MM/YYYY") + ' from: '+trans.from+ ' to: '+trans.to+ ' narrative: '+ trans.narrative +' amount: ' + trans.amount);
        }
        
    }

}


//main body
var personMap = data.takeIndata();
console.log('would you like to list all or look for a name (for list all input listAll else just type name)')
const response= readlineSync.prompt()
if(response==='listAll'){
    ListAll();
}else{
    ListAllAccount(response);
}
