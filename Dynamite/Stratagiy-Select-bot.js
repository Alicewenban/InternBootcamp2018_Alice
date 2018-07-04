
var cycleSize=4;
var myDynamirecount =0;
var oppDynamitecount=0;
var waterOn=true;

var list=['D','R','P','S']
class Bot {
    makeMove(gameState){
        let move= random(gameState);
        let oppMove = gamestate.rounds[gameNum-1].p2;
        if(oppMove === 'D'){oppDynamitecount++;}
        if(move==='D'){
            dynamirecount++;
            if(dynamirecount>=100){
                removeDynomite(list);
            }
        }
        
        return move;
    }
}


function random(gameState){
    shuffleArray(list);
    return list[0];
    
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function addWater(list){
   list.push('W');
   cycleSize++;
}
function removeWater(list){
    cycleSize=cycleSize-1;
    list.splice( list.indexOf('W'), 1 );
}
function removeDynomite(list){
    cycleSize=cycleSize-1;
    list.splice( list.indexOf('D'), 1 );
    shuffleArray(list);
}

module.exports = new Bot();