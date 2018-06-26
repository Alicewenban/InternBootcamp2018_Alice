function multThree(a){
    return(a%3 === 0);
}
function multFive(a){
    return(a%5 === 0);
}

for (i = 1; i <=100; i++) { 
    if(multThree(i)){
        if(multFive(i)){
            console.log('FizzBuzz'); 
        }else{
            console.log('Fizz'); 
        }
    }else if(multFive(i)){
        console.log('Buzz');
    }else{
        console.log(i);    
    }
    
}

