var currentStrat = 'Random';


class Bot {
    constructor() {
        this.MyDynoCount = 0;
        this.OppDynoCount = 0;
        this.inUse = ['R', 'P', 'S', 'D'];
    }
    makeMove(gamestate) {
        if (draw(gamestate) && this.myDynoCount < 100) {
            this.myDynoCount++;
            if (this.myDynoCount === 100) { removeDynomite(this.inUse); }
            return 'D'
        }
        let gameNum = getGameNum(gamestate);
        let oppMoves = getOppMoves(gamestate);

        if ((gameNum % 100 === 0) && (gameNum > 100)) {
            if (currentStrat != 'Mark') {
                //change move;
                if (detectMimic(gamestate)) {
                    currentStrat = 'repFreeRandom';
                } else {
                    //let testSection = oppMoves.slice(gameNum - 100, gameNum);
                    currentStrat = newStrat(oppMoves);
                }
                console.log(currentStrat)
            }
        }
        var move = returnMoveFromStrat(currentStrat, oppMoves, this, gameNum);
        return move;
    }
}

//get functions
function getGameNum(gamestate) {
    return gamestate.rounds.length;
}

function getOppMoves(gamestate) {
    let rounds = gamestate.rounds
    let theirMoves = [];
    rounds.forEach(round => {
        theirMoves.push(round.p2);
    });
    return theirMoves;
}
function getMyMoves(gamestate) {
    let rounds = gamestate.rounds
    let myMoves = [];
    rounds.forEach(round => {
        myMoves.push(round.p1);
    });
    return myMoves;
}
function draw(gamestate) {
    let m = getMyMoves(gamestate);
    let o = getOppMoves(gamestate);
    if (m[m.length - 1] === o[o.length - 1]) { return true }
}

//edit list functions
function addWater(list) {
    list.push('W');
}
function removeWater(list) {
    list.splice(list.indexOf('W'), 1);
}
function removeDynomite(list) {
    list.splice(list.indexOf('D'), 1);
}

function shuffleArray(list) {
    for (let i = list.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
}

function checkDynoRemove(bot, move, thereMove) {
    if (move === 'D') {
        bot.myDynoCount = bot.myDynoCount || 0;
        bot.myDynoCount++;
        if (bot.myDynoCount === 99) { removeDynomite(bot.inUse) }
    }
    thereMove = (thereMove || 'R');
    if (thereMove === 'D') {
        bot.thereDynoCount = bot.thereDynoCount || 0;
        if (bot.thereDynoCount === 0) { addWater(bot.inUse) }
        bot.thereDynoCount++;
        if (bot.thereDynoCount === 95) { removeWater(bot.inUse) }
    }
}



//stratiges
function perfomRandom(oppMoves, bot, gameNum) {
    bot.inUse = shuffleArray(bot.inUse);
    checkDynoRemove(bot, bot.inUse[0], oppMoves[gameNum - 1])
    return bot.inUse[0];
}
/*
function perfomCounterCycle(oppMoves, bot, gameNum, cycle) {
    var arrayofmoves = cycle.split(',');
    var last = oppMoves[oppMoves.length - 1];
    var next = arrayofmoves.indexOf(last) + 1;
    next = next < cycle || 0;
    return beat(arrayofmoves[next]);
}
*/
function performRepFreeRandom(oppMoves, bot, gameNum) {
    let preMove = bot.inUse[0];
    bot.inUse.shift();
    bot.inUse = shuffleArray(bot.inUse);
    bot.inUse.push(preMove);
    checkDynoRemove(bot, bot.inUse[0], oppMoves[gameNum - 1])
    return bot.inUse[0];
}

function perfomMimic(oppMoves, bot, gameNum) {
    let oppPreMove = oppMoves[gameNum - 1] || 'R';
    return beat(oppPreMove);
}

//game evaluation
function evualateSrat(oppMoves, stratiges) {
    var fakeBot = new Bot();
    var points = 0;

    for (let i = 0; i < oppMoves.length; i++) {
        let move = returnMoveFromStrat(stratiges, oppMoves, fakeBot, i)
        points = points + win(move, oppMoves[i]);
    }
    return points;
}

function returnMoveFromStrat(stratiges, oppMoves, bot, gameNum) {
    // if (stratiges.startsWith('Cycle')) {
    //   return perfomCounterCycle(oppMoves, bot, gameNum, stratiges.slice(5));
    //}
    switch (stratiges) {
        case 'Random':
            return perfomRandom(oppMoves, bot, gameNum);
        case 'Mimic':
            return perfomMimic(oppMoves, bot, gameNum);
        case 'repFreeRandom':
            return performRepFreeRandom(oppMoves, bot, gameNum);
        case 'Mark':
            return performMark(oppMoves, bot, gameNum);
    }
}
function newStrat(oppMoves) {
    let strats = ['Random', 'Mimic', 'Mark']
    strats.sort((a, b) => {
        return evualateSrat(oppMoves, b) - evualateSrat(oppMoves, a);
    })
    console.log(strats);
    return strats[0];
}


function win(me, them) {
    switch (me) {
        case 'D':
            if (them === 'W') {
                return -1;
            } else if (them === 'D') {
                return 0;
            } else {
                return 1;
            }
        case 'W':
            if (them === 'D') {
                return 1;
            } else if (them === 'W') {
                return 0;
            } else {
                return -1;
            }
        case 'R':
            if (them === 'S' || them === 'W') {
                return 1;
            } else if (them === 'R') {
                return 0;
            } else {
                return -1;
            }
        case 'S':
            if (them === 'P' || them === 'W') {
                return 1;
            } else if (them === 'S') {
                return 0;
            } else {
                return -1;
            }
        case 'P':
            if (them === 'R' || them === 'W') {
                return 1;
            } else if (them === 'P') {
                return 0;
            } else {
                return -1;
            }
    }
}
function beat(move) {
    switch (move) {
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

function detectMimic(gamestate) {
    let oppMoves = getOppMoves(gamestate);
    let MyMoves = getMyMoves(gamestate);
    let inARow = 0;
    for (let i = 0; i < oppMoves.length - 1; i++) {
        if (oppMoves[i + 1] === beat(MyMoves[i])) {
            inARow++;
            if (inARow === 8) {
                return true;
            }
        } else {
            inARow = 0;
        }
    }
    return false;
}
/*
function detectCycle(oppMoves) {
    const cycle = 5;
    for (let i = 0; i < (oppMoves.length - cycle * 2); i += (cycle)) {
        let first = oppMoves.slice(i, i + cycle);
        let next = oppMoves.slice(i + cycle, i + cycle * 2);
        if (first.toString() === next.toString()) { return 'Cycle' + first.toString() }
    }
    return false;
}
*/

function performMark(oppMoves, bot, gameNum) {
    let transitionMatrix = Array(5);
    let apearenceCount = Array(5).fill(0);
    if (oppMoves.length < 3) { return 'D' }
    for (let i = 1; i < oppMoves.length; i++) {
        transitionMatrix[moveToPos(oppMoves[i - 1])] = transitionMatrix[moveToPos(oppMoves[i - 1])] || Array(5).fill(0);
        apearenceCount[moveToPos(oppMoves[i - 1])]++;
        transitionMatrix[moveToPos(oppMoves[i - 1])][moveToPos(oppMoves[i])]++;
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            transitionMatrix[i] = transitionMatrix[i] || [0, 0, 0, 0, 0,];
            transitionMatrix[i][j] = transitionMatrix[i][j] / (apearenceCount[i] || 1);
        }
    }
    let nextArr = transitionMatrix[moveToPos((oppMoves[oppMoves.length - 1]))];
    let predNextScore = Math.max(...nextArr);
    let predNextmove = posToMove(nextArr.indexOf(predNextScore));
    return beat(predNextmove);

    function moveToPos(move) {
        switch (move) {
            case 'R':
                return 0;
            case 'P':
                return 1;
            case 'S':
                return 2;
            case 'D':
                return 3;
            case 'W':
                return 4;

        }
    }
    function posToMove(move) {
        switch (move) {
            case 0:
                return 'R';
            case 1:
                return 'P';
            case 2:
                return 'S';
            case 3:
                return 'D';
            case 4:
                return 'W';

        }
    }

}
module.exports = new Bot();
