var fs = require('fs');
var moment = require('moment');
var log4js = require('log4js');
var error= require('./error');
const logger = log4js.getLogger('logs/debug.log');
var convertxj = require('xml-js');
var fEx=require('./FindExstention');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});


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

function makeTransactions(fileName,Transactions){
    const filetype = fEx.findExt(fileName);
    errors=Array();
    if(filetype==='csv'){
        Transactions = transCsv(fileName,Transactions,errors);
    }else if(filetype==='json'){
        Transactions = transJson(fileName,Transactions,errors);
    }else if(filetype==='xml'){
        Transactions = transXML(fileName,Transactions,errors);
    }else{
        console.log("this file was not a valid type")
    }
    if(errors.length!=0){
        console.log("errors have been found, they will not be included in total");
        for(e of errors){console.log(e.printError());}
    }
    return Transactions
}

function transCsv(name,Transactions,errors) {
    //readng in the file as a stream
    var lines = fs.readFileSync(name, 'utf-8').split('\n').slice(1)
    //goes through and makes each transation an object
    for(let i=1;i<lines.length-1;i++){
        
        let errorHappend=false;
        let element=lines[i].split(',');
        const tempTran=new transation(moment(element[0], "DD-MM-YYYY"),element[1],element[2],element[3],element[4]);

        if(!checkErrorCase(tempTran,Transactions.length,name,errors)){Transactions.push(tempTran);}     
    }

    return Transactions;
}

function transJson(name,Transactions,errors){
    var lines = JSON.parse(fs.readFileSync(name, 'utf-8'));
    for(let i = 0; i < lines.length; i++){
        let errorHappend=false;
        let element= lines[i]
        const tempTran=new transation(moment(element.Date),element.FromAccount,element.ToAccount,element.Narrative,element.Amount);
        
        if(!checkErrorCase(tempTran,Transactions.length,name,errors)){Transactions.push(tempTran);}
    }
    return Transactions;    
}


function transXML(name,Transactions,errors){
    var xmltxt = fs.readFileSync(name, 'utf-8')
    var json = convertxj.xml2json(xmltxt, {compact: true, spaces: 4});
    var lineA = JSON.parse(json);
    var lines =lineA.TransactionList.SupportTransaction;
    for(let i=0 ; i< lines.length ; i++){

        let element= lines[i]
        const datestr =element._attributes.Date
        const from =element.Parties.From._text;
        const to=element.Parties.To._text;
        const nar =element.Description._text;
        const value = element.Value._text;
        const date = moment('1900-01-01').add(datestr, 'days');
        const tempTran =new transation(date,from,to,nar,value);

        if(!checkErrorCase(tempTran,Transactions.length,name,errors)){Transactions.push(tempTran);}
       
    }
    
    return Transactions
}

function checkErrorCase(errorTransaction,lineNum,fileName,errors){
    if(errors===undefined){errors=Array();}
    var errorHappend=false;
    if (!errorTransaction.date.isValid()){
        logger.debug(TransactionsDisplay(errorTransaction)+' Date NOT valid')
        errorHappend= true;
        errors.push(new error(lineNum, fileName, ' date NOT valid'));
    }
    if (isNaN(errorTransaction.amount)){
        logger.debug(TransactionsDisplay(errorTransaction) +' amount NOT valid')
        errorHappend= true;
        errors.push(new error(lineNum, fileName, ' amount NOT valid'));
    }
    
    return errorHappend
}


module.exports={transation:transation ,makeTransactions:makeTransactions,  TransactionsDisplay:TransactionsDisplay}