
var readlineSync = require('readline-sync');
var fs = require('fs');
var moment = require('moment');
var data= require('./dataInput');
var userAcounts=require('./userAcounts');


function ListAll(){
    for (var key in personMap) {
        if(personMap[key]){ console.log(key + ' ' +Math.round((personMap[key].balence) * 100) / 100);}
    }

}
function ListAllAccount(name){
    if(personMap[name]){
        var history = personMap[name].history;
        for(let i = 0; i < history.length; i++){
            const element = history[i];
            console.log('date: '+element.date.format("DD/MM/YYYY") + ' from: '+element.from+ ' to: '+element.to+ ' narrative: '+ element.narrative +' amount: ' + element.amount);
        }
   }else{
       console.log("Not a person in the system")
   }

}


//main body
console.log('pleae enter the file you want us to read(remeber to include the exstention)');
const fileName= readlineSync.prompt()
var Transactions=Array();
personMap=processFile(fileName, Transactions);

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
        personMap=processFile(fileName, Transactions);
    }else{
        ListAllAccount(response);
    }
}while(quit===false);

function processFile(fileName,Transactions){
    Transactions=data.makeTransactions(fileName,Transactions);
    return personMap=userAcounts.makeAccounts(Transactions);
}