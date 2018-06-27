var readlineSync = require('readline-sync');
var fs = require('fs');
//class creation for person
class account {
    constructor(name, balence) {
      this.name = name;
      this.balence = balence;
    }
  }

  class transation {
    constructor(date,from,to,narrative,amount) {
      this.date = date;
      this.from = from;
      this.to=to;
      this.narrative=narrative;
      this.amount=amount;
    }
  }

//readng in the file as a stream
var lines = fs.readFileSync('Transactions2014.csv', 'utf-8').split('\n')

//goes through and makes each transation an object
var Transactions= Array();
for(let i=1;i<lines.length;i++){
    let element=lines[i].split(',');
    Transactions.push(new transation(element[0],element[1],element[2],element[3],element[4],element[5]))
}

//makes all accounts and puts them in the map
var personMap = new Map();

//goes through each line and adds to the dataMap
//starts on line 1 to ignore intro
for(var trans of Transactions){
    //check to see if first name is present
    if(trans.to in personMap){
        personMap.get(trans.to).balence=personMap.get(trans.to).balence - trans.amount;
    }else{
        personMap.set(trans.to,new account(trans.to,-trans.amount));
    }
    //check to see if second name is present
    if(trans.from in personMap){
        personMap.get(trans.from).balence=personMap.get(trans.from).balence + trans.amount;
    }else{
        personMap.set(trans.from,new account(trans.from,trans.amount));
    }
    
}


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
          console.log('date: '+trans.date+ ' from: '+trans.from+ ' to: '+trans.to+ ' narrative: '+ trans.narrative +' amount: ' + trans.amount);
        }
        
    }

}


//main body
console.log('would you like to list all or look for a name (for list all input listAll else just type name)')
const response= readlineSync.prompt()
if(response==='listAll'){
    ListAll();
}else{
    ListAllAccount(response);
}
