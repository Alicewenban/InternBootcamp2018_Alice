var readlineSync = require('readline-sync');
var fs = require('fs');
//class creation for person
class account {
    constructor(name, balence) {
      this.name = name;
      this.balence = balence;
    }
  }

//readng in the file as a stream
var lines = fs.readFileSync('Transactions2014.csv', 'utf-8').split('\n')

function ListAll(){
    //creaate a map to hold name -> person object
    var personMap = new Map();

    //goes through each line and adds to the dataMap
    //starts on line 1 to ignore intro
    for(let i=1;i<lines.length;i++){
        let element=lines[i].split(',');
        //check to see if first name is present
        if(element[1] in personMap){
            personMap.get(element[1]).balence=personMap.get(element[1]).balence - element[4];
        }else{
            personMap.set(element[1],new account(element[2],-element[4]));
        }
        //check to see if second name is present
        if(element[2] in personMap){
            personMap.get(element[2]).balence=personMap.get(element[2]).balence + element[4];
        }else{
            personMap.set(element[2],new account(element[2],-element[4]));
        }
        
    }

    //prints out all the accounts
    for (var key of personMap.keys()) {
        if(key!= undefined){ console.log(key + ' ' +personMap.get(key).balence);}
    }

}


function ListAllAccount(name){
    //starts on line 1 to ignore intro
    for(let i=1;i<lines.length;i++){
        let element=lines[i].split(',');   
        //print each element if relevent
        if(element[1]===name || element[2] ===name){
          console.log('date: '+element[0]+ ' from: '+element[1]+ ' to: '+element[2]+ ' narrative: '+ element[3] +' amount: ' + element[4].toString());
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
