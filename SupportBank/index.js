var readlineSync = require('readline-sync');
var fs = require('fs');
//class creation for person
class person {
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
    for(i=1;i<lines.length;i++){
        lines[i]=lines[i].split(',');
        //check to see if first name is present
        if(lines[i][1] in personMap){
            personMap.get(lines[i][1]).balence=personMap.get(lines[i][1]).balence - lines[i][4];
        }else{
            personMap.set(lines[i][1],-lines[i][4]);
        }
        //check to see if second name is present
        if(lines[i][2] in personMap){
            personMap.get(lines[i][2]).balence=personMap.get(lines[i][2]).balence + lines[i][4];
        }else{
            personMap.set(lines[i][2],lines[i][4]);
        }
        
    }

    //prints out all the accounts
    for (var key of personMap.keys()) {
        if(key!= undefined){ console.log(key + ' ' +personMap.get(key));}
    }

}

ListAll();
