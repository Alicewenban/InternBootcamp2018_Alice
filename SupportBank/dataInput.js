var readlineSync = require('readline-sync');
var fs = require('fs');
var moment = require('moment');

//class creation for person
class account {
    constructor(name, balence) {
      this.name = name;
      this.balence = balence;
    }
  }

  class transation {
    constructor(date,from,to,narrative,amount) {
      this.date = moment(date, "DD-MM-YYYY");;
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

    //goes through and makes each transation an object
    var Transactions= Array();
    for(let i=1;i<lines2014.length;i++){
        let element=lines2014[i].split(',');
        Transactions.push(new transation(element[0],element[1],element[2],element[3],element[4],element[5]))
    }
    for(let i=1;i<lines2015.length;i++){
        let element=lines2015[i].split(',');
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
    return personMap;

};


module.exports={account:account, transation:transation , takeIndata:takeIndata}