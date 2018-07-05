
var cycleSize = 4;
var myDynamirecount = 0;
var oppDynamitecount = 0;
var Stratagy = 'random';

var list = ['D', 'R', 'P', 'S']
class Bot {
    makeMove(gamestate) {
        let gameNum = gamestate.rounds.length;
        if (gameNum === 100) {
            //reavauate stragy
        }
        let move;
        switch (Stratagy) {
            case 'random':
                move = random(gamestate);
                break;
            default:
                move = random(gamestate);
                break;
        }

        removeAddetc(gameNum, gamestate, move);

        return move;
    }
}
function removeAddetc(gameNum, gamestate, move) {

    if (gameNum > 0) {
        let oppMove = gamestate.rounds[gameNum - 1].p2;
        if (oppMove === 'D') {
            oppDynamitecount++;
            if (oppDynamitecount === 1) {
                addWater(list);
            } else if (oppDynamitecount === 100) {
                removeWater(list);
            }
        }
    }
    if (move === 'D') {
        myDynamirecount++;
        //this is 99 to trip up water removers
        if (myDynamirecount >= 99) {
            removeDynomite(list);
        }
    }

}

function random(gamestate) {
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

function addWater(list) {
    list.push('W');
    cycleSize++;
}
function removeWater(list) {
    cycleSize = cycleSize - 1;
    list.splice(list.indexOf('W'), 1);
}
function removeDynomite(list) {
    cycleSize = cycleSize - 1;
    list.splice(list.indexOf('D'), 1);
    shuffleArray(list);
}

function playGame(gamestate, strat) {
    let myScore = 0;
    let thereScore = 0;
    round = gamestate.rounds
    for (let i = 0; i < gamestate.rounds.length; i++) { 
        let myMove = random(gamestate.splice(i));
        removeAddetc(i, gamestate, myMove);
    }

}


module.exports = new Bot();