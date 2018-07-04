var dynomiteUsed=0;

class Bot {
    
    makeMove(gamestate) {
        return numToBot(randomNum());
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

module.exports = new Bot();
