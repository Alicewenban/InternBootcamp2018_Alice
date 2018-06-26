const readline = require('readline-sync');

function divisertest(a,b){
    return(a%b === 0);
}
function Rules(){
    this.three=false;
    this.five =false;
    this.seven=false;
    this.eleven=false;
    this.thirteen=false;
    this.seventeen=false;
}

console.log("How many numbers do you want?")
const num = parseInt(readline.prompt());

console.log("what rules do you want? \n\ please select from the following 3,5,7,11,13,17 \n\ seprate by commers e.g if you want 3 5 and 7 input 3,5,7 ")
const rules = readline.prompt();
const arrRules = rules.split(',');
var rule= new Rules();
for(p=0; p<arrRules.length; p++){
    switch(arrRules[p]){
        case('3'):
            rule.three=true;
        break;
        case('5'):
            rule.five=true;
        break;
        case('7'):
            rule.seven=true;
        break;
        case('11'):
            rule.eleven=true;
        break;
        case('13'):
            rule.thirteen=true;
        break;
        case('17'):
            rules.seventeen=true;
        break;
    }
}


for (i = 1; i <=num; i++) { 
    var ans = '';
    var notNum= true;
    if(divisertest(i,3)&& rule.three){
        ans = 'Fizz';
        notNum=false;
    }
    if(divisertest(i,13) && rule.thirteen){
        ans=ans.concat('Fezz');
        notNum=false;
    }
    if(divisertest(i,5)&& rule.five){
        ans=ans.concat('Buzz');
        notNum=false;
    }
    if(divisertest(7,i)&& rule.seven){
        ans=ans.concat('Bang');
        notNum=false;
    }
    if(divisertest(11,i)&& rule.eleven){
        ans='Bong';
        notNum=false;
    }
    if(divisertest(17,i)&& rule.seventeen){
        for(q=0; q<(ans.length-4); q=q+4){
            ans=ans.slice(4).concat(ans.slice(0,4));
        }
    }


    if(notNum){
        console.log(i);    
    }else{
        console.log(ans)
    }

    
}

