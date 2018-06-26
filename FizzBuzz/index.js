const readline = require('readline-sync');

function multThree(a){
    return(a%3 === 0);
}
function multFive(a){
    return(a%5 === 0);
}
function multSeven(a){
    return(a%7 === 0);
}
function multEleven(a){
    return(a%11 === 0);
}
function multThirteen(a){
    return(a%13 === 0);
}
function multSeventeen(a){
    return(a%17 === 0);
}


console.log("How many numbers do you want?")
const num = parseInt(readline.prompt());


for (i = 1; i <=num; i++) { 
    var ans = '';
    var notNum= true;
    if(multThree(i)){
        ans = 'Fizz';
        notNum=false;
    }
    if(multThirteen(i)){
        ans=ans.concat('Fezz');
        notNum=false;
    }
    if(multFive(i)){
        ans=ans.concat('Buzz');
        notNum=false;
    }
    if(multSeven(i)){
        ans=ans.concat('Bang');
        notNum=false;
    }
    if(multEleven(i)){
        ans='Bong';
        notNum=false;
    }

    if(multSeventeen(i)){
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

