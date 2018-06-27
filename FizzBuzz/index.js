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

function ruleCreate(word,pos){
    return function(strg){
        if(pos==='f'){
            return word.concat(strg)
        }else{
            return strg.concat(word)
        }
    }
}

function askAndCreateRule(){
    console.log("would you like to add a rule? (y/n)")
        const response = readline.prompt();
        if(response==='n'){
            return false
        }else{
            //add rule
            var valid=false;
            do{
                console.log("what number is the rule for?(if you pick a pre defiend number it will be redefined)")
                var num = readline.prompt();
                if(!isNaN(num)){
                    valid=true; 
                    num= parseInt(num);
                }
            }while(!valid)
            valid=false;
            do{
                console.log("what word do you want to use?(please use 4 letters)")
                var word = readline.prompt();
                if(word.length===4){valid=true;}
            }while(!valid)

            valid= false;
            do{
                console.log("do you want the word at the front of back?(f/b)")
                var position = readline.prompt();
                if(position==='f'||position==='b'){valid=true;}
            }while(!valid)

            ruleapply[num]=ruleFun(num);
            ruleFunctions[num]=ruleCreate(word,position);
            return true
        }
}



var ruleFun= function(ruleNum){return function(testNum){return divisertest(testNum,ruleNum)}}

console.log("How many numbers do you want?")
const num = parseInt(readline.prompt());
var ruleapply=Array(num);
var ruleFunctions=Array(num);
//rules inputting
for (let a=0; a<num; a++){
    ruleFunctions[a]=function(a){return a};
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
    for(let q=4; q<(ans.length); q=q+4){
        ans=ans.slice(q).concat(ans.slice(0,q));   
    }
    return ans;
}

console.log("what rules do you want? \n\ please select from the following 3,5,7,11,13,17 \n\ seprate by commers e.g if you want 3 5 and 7 input 3,5,7 ")
const rule = readline.prompt();
const arrRules = rule.split(',');
for (a=0; a<num; a++){
    ruleapply[a]=function(num){return false};
}   

for(p=0; p<arrRules.length; p++){
    switch(arrRules[p]){
        case('3'):
            ruleapply[3] = ruleFun(3);
        break;
        case('5'):
            ruleapply[5]  = ruleFun(5);
        break;
        case('7'):
            ruleapply[7]  = ruleFun(7);
        break;
        case('11'):
            ruleapply[11]  = ruleFun(11);
        break;
        case('13'):
            ruleapply[13]  = ruleFun(13);
        break;
        case('17'):
            ruleapply[17]  = ruleFun(17);
        break;
    }
}
    do{
        var rep=askAndCreateRule();
    }while(rep)

for (i = 1; i <=num; i++) { 
    var ans = '';
    var notNum= true;
  
    for(q=0; q<num; q++){
        if(ruleapply[q](i)){
            ans = ruleFunctions[q](ans);
            if(q!=17){notNum=false;}
        }
       
        if(q===11){continue;}
    }

    if(notNum){
        console.log(i);    
    }else{
        console.log(ans)
    }

    
}

