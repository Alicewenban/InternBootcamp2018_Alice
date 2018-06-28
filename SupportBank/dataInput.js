var fs = require('fs');
var moment = require('moment');
var log4js = require('log4js');
var error= require('./error');
const logger = log4js.getLogger('logs/debug.log');
var DOMParser = require('xmldom').DOMParser;
var convertxj = require('xml-js');

function TransactionsDisplay(trans){
    return 'date: '+trans.date.format("DD/MM/YYYY") + ' from: '+trans.from+ ' to: '+trans.to+ ' narrative: '+ trans.narrative +' amount: ' + trans.amount;
}

//class for transation
  class transation {
    constructor(date,from,to,narrative,amount) {
      this.date = date;
      this.from = from;
      this.to=to;
      this.narrative=narrative;
      this.amount=parseFloat(amount);
    }
  }

function makeTransactions(name,filetype,Transactions){
    if(filetype==='csv'){
        Transactions = transCsv(name,Transactions);
    }else if(filetype==='json'){
        Transactions = transJson(name,Transactions);
    }else if(filetype==='xml'){
        Transactions = transXML(name,Transactions);
    }
    return Transactions
}

function transCsv(name,Transactions) {
    //readng in the file as a stream
    var lines = fs.readFileSync(name, 'utf-8').split('\n')
    
    var errors = Array();
    //goes through and makes each transation an object
    for(let i=1;i<lines.length-1;i++){
        
        let errorHappend=false;
        let element=lines[i].split(',');
        var lineNum= Transactions.push(new transation(moment(element[0], "DD-MM-YYYY"),element[1],element[2],element[3],element[4]))-1;
         //checks number in and date to see if correct
        if (!moment(element[0], "DD-MM-YYYY").isValid()){
            logger.debug(TransactionsDisplay(Transactions[lineNum])+' Date NOT valid')
            errorHappend= true;
            errors.push(new error(lineNum, name, ' date not valid'));
        }
        if (isNaN(parseFloat(element[4]))){
            logger.debug(TransactionsDisplay(Transactions[lineNum]) +' amount NOT valid')
            errorHappend= true;
            errors.push(new error(lineNum, name, ' amount NOT valid'));
        }
        if(errorHappend){Transactions.pop();}
      
    }
      
    //checks if error if so halts program and reports
    if(errors.length!=0){
        console.log("errors have been found, they will not be included in total");
        for(e of errors){console.log(e.printError());}
    }

    return Transactions;
}

function transJson(name,Transactions){
    var lines = JSON.parse(fs.readFileSync(name, 'utf-8'));
    for(let i=1;i<lines.length-1;i++){
        let errorHappend=false;
        var errors = Array();
        let element= lines[i]
        var c = Transactions.push(new transation(moment(element.Date),element.FromAccount,element.ToAccount,element.Narrative,element.Amount));
        if (!moment(element.Date).isValid()){
            logger.debug(TransactionsDisplay(Transactions[c-1])+' Date NOT valid')
            errorHappend= true;
            errors.push(new error(c, name, 'date not valid'));
        }
        if (isNaN(element.Amount)){
            logger.debug(TransactionsDisplay(Transactions[c-1])+ +' amount NOT valid')
            errorHappend= true;
            errors.push(new error(c, name, 'amount NOT valid'));
        }
        if(errorHappend){Transactions.pop();}
    }

    //checks if error if so halts program and reports
    if(errors.length!=0){
        console.log("errors have been found, they will not be included in total");
        for(e of errors){console.log(e.printError());}
    }

    return Transactions;    
}


function transXML(name,Transactions){
    var xmltxt = fs.readFileSync(name, 'utf-8')
    var json = convertxj.xml2json(xmltxt, {compact: true, spaces: 4});
    var lineA = JSON.parse(json);
    var lines =lineA.TransactionList.SupportTransaction;
    for(let i=0;i<lines.length;i++){
        let element= lines[i]
        const datestr =element._attributes.Date
        const from =element.Parties.From._text;
        const to=element.Parties.To._text;
        const nar =element.Description._text;
        const value = element.Value._text;
        const date = moment().add(datestr, 'days').calendar()
        var currentPos = Transactions.push(new transation(date,from,to,nar,value))-1;

        if (!date.isValid()){
            logger.debug(TransactionsDisplay(Transactions[lineNum])+' Date NOT valid')
            errorHappend= true;
            errors.push(new error(lineNum, name, ' date not valid'));
        }
        if (isNaN(parseFloat(value))){
            logger.debug(TransactionsDisplay(Transactions[lineNum]) +' amount NOT valid')
            errorHappend= true;
            errors.push(new error(lineNum, name, ' amount NOT valid'));
        }
        if(errorHappend){Transactions.pop();}
    }
    if(errors.length!=0){
        console.log("errors have been found, they will not be included in total");
        for(e of errors){console.log(e.printError());}
    }
    return Transactions
}



module.exports={transation:transation ,makeTransactions:makeTransactions,  TransactionsDisplay:TransactionsDisplay}