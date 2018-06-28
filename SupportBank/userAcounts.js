//class creation for person
class account {
    constructor(name, balence) {
      this.name = name;
      this.balence = balence;
      this.history = Array();
    }
  }
 
function makeAccounts(Transactions){
    //makes all accounts and puts them in the map
    var personMap = new Map();
    var personMap ={};
    
    //goes through each line and adds to the dataMap
    for(var trans of Transactions){
        //check to see if first name is present
        if(personMap[trans.to]){
            personMap[trans.to].balence = personMap[trans.to].balence - trans.amount;
        }else{
            personMap[trans.to]=new account(trans.to,-trans.amount);
        }
        //check to see if second name is present
        if(personMap[trans.from]){
            personMap[trans.from].balence = personMap[trans.from].balence + trans.amount;
        }else{
            personMap[trans.from]=new account(trans.from,+trans.amount);
        }
        personMap[trans.from].history.push(trans); 
        personMap[trans.to].history.push(trans); 
        
    }
    return personMap;

};

module.exports={makeAccounts:makeAccounts, account:account}