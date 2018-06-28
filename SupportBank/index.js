
var readlineSync = require('readline-sync');
var fs = require('fs');
var moment = require('moment');
var data= require('./dataInput');
var log4js = require('log4js');
var fEx=require('./FindExstention');
var userAcounts=require('./userAcounts');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});



function ListAll(){
    //prints out all the accounts
    for (var key of personMap.keys()) {
        if(key!= undefined){ console.log(key + ' ' +Math.round(personMap.get(key).balence * 100) / 100);}
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
console.log('pleae enter the file you want us to read(remeber to include the exstention)');
const fileName= readlineSync.prompt()
const ext = fEx.findExt(fileName);
var Transactions=Array();
Transactions=data.makeTransactions(fileName,ext,Transactions);
var personMap=userAcounts.makeAccounts(Transactions);


do{
    console.log('would you like to upload anouther file, list all or look for a name (for list all input listAll,importFile filename else just type name)\n\ type N to quit')
    const response= readlineSync.prompt()
    var quit=false
    console.log(response.slice(0,12))
    if(response==='listAll'){
        ListAll();
    }else if(response==='N'){
        quit=true;    
    }else if(response.slice(0,10)==='importFile'){
        const fileName=response.slice(11)
        Transactions=data.makeTransactions(fileName,ext,Transactions);
        var personMap=userAcounts.makeAccounts(Transactions);
    }else{
        ListAllAccount(response);
    }
}while(quit===false);
