var dynomiteUsed=0;
var order = ['R','P','S','D'];
shuffleArray(order);
var cycleSize=4;
var theredynomiteUseUp = 0;

class Bot {
    
    makeMove(gamestate) {
        let gameNum =gamestate.rounds.length;
        if(gameNum>0){
            let oppMove= gamestate.rounds[gameNum-1].p2;
            if( oppMove==='D'){
                if(theredynomiteUseUp===0){
                    order.push('W');
                    cycleSize=cycleSize+1;
                    shuffleArray(order);
                }
                theredynomiteUseUp++;   
            }
        }
        let key = gameNum%cycleSize;
        let moveIdea=order[key];
       
        if(moveIdea==='D'){
            dynomiteUsed++;
            if(dynomiteUsed>=100){
                //remove 4 from order and reduce cylce
                cycleSize=cycleSize-1;
                order.splice( order.indexOf('D'), 1 );
            }
        } 
        if(moveIdea === 'W' && theredynomiteUseUp===100){
            //if >500 assume random has used up D and therefore dont use water
                cycleSize=cycleSize-1;
                order.splice( order.indexOf('W'), 1 );

        }
            return moveIdea;
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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



module.exports = new Bot();

