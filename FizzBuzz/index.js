const readline = require('readline-sync');

function divisertest(a,b){
    return(a%b === 0);
}
var ruleApply= function(valid){ return function(ruleNum){ return function(testNum){return valid && divisertest(testNum,ruleNum)}}}

console.log("How many numbers do you want?")
const num = parseInt(readline.prompt());

console.log("what rules do you want? \n\ please select from the following 3,5,7,11,13,17 \n\ seprate by commers e.g if you want 3 5 and 7 input 3,5,7 ")
const rules = readline.prompt();
const arrRules = rules.split(',');
var rule3= function(num){return false};
var rule5= function(num){return false};
var rule7= function(num){return false};
var rule11= function(num){return false};
var rule13= function(num){return false};
var rule17= function(num){return false};
for(p=0; p<arrRules.length; p++){
    switch(arrRules[p]){
        case('3'):
            var rule3 = ruleApply(true)(3);
        break;
        case('5'):
            var rule5 = ruleApply(true)(5);
        break;
        case('7'):
            var rule7 = ruleApply(true)(7);
        break;
        case('11'):
            var rule11 = ruleApply(true)(11);
        break;
        case('13'):
            var rule13 = ruleApply(true)(13);
        break;
        case('17'):
            var rule17 = ruleApply(true)(17);
        break;
    }
}


for (i = 1; i <=num; i++) { 
    var ans = '';
    var notNum= true;
    if(rule3(i)){
        ans = 'Fizz';
        notNum=false;
    }
    if(rule13(i)){
        ans=ans.concat('Fezz');
        notNum=false;
    }
    if(rule5(i)){
        ans=ans.concat('Buzz');
        notNum=false;
    }
    if(rule7(i)){
        ans=ans.concat('Bang');
        notNum=false;
    }
    if(rule11(i)){
        ans='Bong';
        notNum=false;
    }
    if(rule17(i)){
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

