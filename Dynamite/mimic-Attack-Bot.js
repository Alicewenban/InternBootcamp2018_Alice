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
             
            return beat(moveIdea);
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
            return 'R'
        case 1:
            return 'P'
        case 2:
            return 'S'
        case 3:
            return 'W'
        case 4:
            dynomiteUsed++;
            return 'D'
    }
}

function beat(move){
    switch(move){
        case 'R':
            return 'P'
        case 'P':
            return 'S'
        case 'S':
            return 'R'
        case 'W':
            return 'R'
        case 'D':
            return 'W'
    }

}
module.exports = new Bot();
