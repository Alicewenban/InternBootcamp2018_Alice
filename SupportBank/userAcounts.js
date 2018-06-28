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
    var personMap ={};
    for(var trans of Transactions){
    
        if(personMap[trans.to]){
            personMap[trans.to].balence = personMap[trans.to].balence - trans.amount;
        }else{
            personMap[trans.to]=new account(trans.to,-trans.amount);
        }
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