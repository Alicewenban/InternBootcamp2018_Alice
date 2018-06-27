var readlineSync = require('readline-sync');
var fs = require('fs');
var moment = require('moment');
var log4js = require('log4js');
var error= require('./error');
const logger = log4js.getLogger('logs/debug.log');

function TransactionsDisplay(trans){
    return 'date: '+trans.date.format("DD/MM/YYYY") + ' from: '+trans.from+ ' to: '+trans.to+ ' narrative: '+ trans.narrative +' amount: ' + trans.amount
}

//class creation for person
class account {
    constructor(name, balence) {
      this.name = name;
      this.balence = balence;
    }
  }

  class transation {
    constructor(date,from,to,narrative,amount) {
      this.date = moment(date, "DD-MM-YYYY");
      this.from = from;
      this.to=to;
      this.narrative=narrative;
      this.amount=parseFloat(amount);
    }
  }

function takeIndata() {
    //readng in the file as a stream
    var lines2014 = fs.readFileSync('Transactions2014.csv', 'utf-8').split('\n')
    var lines2015 = fs.readFileSync('DodgyTransactions2015.csv', 'utf-8').split('\n')
    var errors = Array();
    //goes through and makes each transation an object
    var Transactions= Array();
    for(let i=1;i<lines2014.length-1;i++){
        let errorHappend=false
        let element=lines2014[i].split(',');
       
        var c= Transactions.push(new transation(element[0],element[1],element[2],element[3],element[4]))-1;
         //checks number in and date to see if correct
        if (!Transactions[c].date.isValid()){
            logger.debug(TransactionsDisplay(Transactions[c-1])+' Date NOT valid')
            errorHappend= true;
            errors.push(new error(c, 'lines2014.csv', 'date not valid'));
        }
        if (isNaN(Transactions[c].amount)){
            logger.debug(TransactionsDisplay(Transactions[c-1])+ +' amount NOT valid')
            errorHappend= true;
            errors.push(new error(c, 'lines2014.csv', 'amount NOT valid'));
        }
        if(errorHappend){Transactions.pop();}
      
    }
    for(let i=1;i<lines2015.length-1;i++){
        let errorHappend=false;
        let element=lines2015[i].split(',');
        var c= Transactions.push(new transation(element[0],element[1],element[2],element[3],element[4])) -1;
         //checks number in and date to see if correct
        if (!Transactions[c].date.isValid()){
            logger.debug(element[0] +' Date NOT valid');
            errorHappend= true;
            errors.push(new error(c, 'lines2015.csv', 'date not valid'));
    
        }
        if (isNaN(Transactions[c].amount)){
            logger.debug(element[4] + ' Amount NOT valid');
            errorHappend= true;
            errors.push(new error(c, 'lines2015.csv', 'amount not valid'));
        }
        if(errorHappend){Transactions.pop();}
    }
    
    //checks if error if so halts program and reports
    if(errors.length!=0){
        console.log("errors have been found, they will not be included in total");
        for(e of errors){console.log(e.printError());}
    }



    //makes all accounts and puts them in the map
    var personMap = new Map();

    //goes through each line and adds to the dataMap
    //starts on line 1 to ignore intro
    for(var trans of Transactions){
        //check to see if first name is present
        if(personMap.has(trans.to)){
            personMap.get(trans.to).balence = personMap.get(trans.to).balence - trans.amount;
        }else{
            personMap.set(trans.to,new account(trans.to,-trans.amount));
        }
        //check to see if second name is present
        if( personMap.has(trans.from)){
            personMap.get(trans.from).balence = personMap.get(trans.from).balence + trans.amount;
        }else{
            personMap.set(trans.from,new account(trans.from,trans.amount));
        }
        
    }
    return [personMap,Transactions];

};


module.exports={account:account, transation:transation , takeIndata:takeIndata, TransactionsDisplay:TransactionsDisplay}