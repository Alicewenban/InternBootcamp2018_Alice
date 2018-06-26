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


for (i = 1; i <=300; i++) { 
    var ans = '';
    var notNum= true;
    if(multThree(i)){
        ans = 'Fizz';
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

    if(multThirteen(i)){
        if(multThree(i)){
            ans=[ans.slice(0, 4), 'Fezz', ans.slice(4)].join('');         
        }else{
            ans='Fezz'.concat(ans);
        }
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

