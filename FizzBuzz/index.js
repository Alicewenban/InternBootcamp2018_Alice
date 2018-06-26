const readline = require('readline-sync');

function divisertest(a,b){
    return(a%b === 0);
}
function findBpos(ans){
    for(c=0; c<ans.length;c=c+4){
        if(ans[c]==='B'){
            return(c);
        }  
    }
    return ans.length;
}
var ruleFun= function(valid){ return function(ruleNum){ return function(testNum){return valid && divisertest(testNum,ruleNum)}}}

console.log("How many numbers do you want?")
const num = parseInt(readline.prompt());
var ruleapply=Array(num);
var ruleFunctions=Array(num);
//rules inputting
for (let a=0; a<num; a++){
    ruleapply[a]=function(a){return a};
}   
// adding pre set rules
ruleFunctions[3]= function(ans){ return 'Fizz'.concat(ans);}
ruleFunctions[5]= function(ans){ return ans.concat('Buzz');}
ruleFunctions[7]= function(ans){ return ans.concat('Bang');}
ruleFunctions[11]= function(ans){ return "Bong";}
ruleFunctions[13]= function(ans){ 
    const n = findBpos(ans);
    return [ans.slice(0,n),"Fezz",ans.slice(n)].join('');
}
ruleFunctions[17]= function(ans){
    for(q=0; q<(ans.length-4); q=q+4){
     ans=ans.slice(4).concat(ans.slice(0,4));   
    }
    return ans;
}

console.log("what rules do you want? \n\ please select from the following 3,5,7,11,13,17 \n\ seprate by commers e.g if you want 3 5 and 7 input 3,5,7 ")
const rule = readline.prompt();
const arrRules = rule.split(',');
for (a=0; a<18; a++){
    ruleapply[a]=function(num){return false};
}   

for(p=0; p<arrRules.length; p++){
    switch(arrRules[p]){
        case('3'):
            ruleapply[3] = ruleFun(true)(3);
        break;
        case('5'):
            ruleapply[5]  = ruleFun(true)(5);
        break;
        case('7'):
            ruleapply[7]  = ruleFun(true)(7);
        break;
        case('11'):
            ruleapply[11]  = ruleFun(true)(11);
        break;
        case('13'):
            ruleapply[13]  = ruleFun(true)(13);
        break;
        case('17'):
            ruleapply[17]  = ruleFun(true)(17);
        break;
    }
}


for (i = 1; i <=num; i++) { 
    var ans = '';
    var notNum= true;
    //add specil rule for 11
    if(ruleapply[3](i)){
        ans = ruleFunctions[3](ans);
        notNum=false;
    }
    if(ruleapply[13](i)){
        ans = ruleFunctions[13](ans);
        notNum=false;
    }
    if(ruleapply[5](i)){
        ans = ruleFunctions[5](ans);
        notNum=false;
    }
    if(ruleapply[7](i)){
        ans = ruleFunctions[7](ans);
        notNum=false;
    }
    if(ruleapply[11](i)){
        ans = ruleFunctions[11](ans);
        notNum=false;
    }
    if(ruleapply[17](i)){
        ans = ruleFunctions[17](ans);
    }


    if(notNum){
        console.log(i);    
    }else{
        console.log(ans)
    }

    
}

