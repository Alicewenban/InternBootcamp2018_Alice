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
      this.amount=parseFloat(amount);
    }
  }

function makeAccounts(Transactions){
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
    return personMap;

};

module.exports={makeAccounts:makeAccounts, account:account}