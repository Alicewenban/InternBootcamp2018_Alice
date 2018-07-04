var dynomiteUsed=0;

class Bot {
    
    makeMove(gamestate) {
        let gameNum =gamestate.rounds.length;      
        if(gameNum===0){

            return numToBot(randomNum());
        }else{
            let moveIdea= gamestate.rounds[gameNum-1].p2;
                       
            if(moveIdea ==='D'){
                if(dynomiteUsed>=100){
                   return numToBot(randomNum());
                }
                dynomiteUsed++;
            }
             
            return moveIdea;
        }
        
    }
}
function randomNum(){   
    let max =4;
    if(dynomiteUsed >= 100){
        max=3;
    }

   return Math.round((Math.random() * max));
}

function numToBot(num){
    switch(num){
        case 0:
            console.log('R');
            return 'R'
        case 1:
            console.log('P');
            return 'P'
        case 2:
            console.log('S');
            return 'S'
        case 3:
            console.log('W');
            return 'W'
        case 4:
            dynomiteUsed++;
            console.log('D')
            return 'D'
    }
}

module.exports = new Bot();
