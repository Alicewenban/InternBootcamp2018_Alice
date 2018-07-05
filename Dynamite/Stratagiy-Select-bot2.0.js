var currentStrat = 'Random';


class Bot {
    constructor() {
        this.MyDynoCount = 0;
        this.OppDynoCount = 0;
        this.inUse = ['R', 'P', 'S', 'D'];
    }
    makeMove(gamestate) {
        let gameNum = getGameNum(gamestate);
        let oppMoves = getOppMoves(gamestate);
        if ((gameNum % 100 === 0) && (gameNum > 0)) {
            //change move;
            let cycle = detectCycle(oppMoves);
            if (cycle) {
                console.log("cycle")
                currentStrat = cycle;
            } else if (detectMimic(gamestate)) {
                currentStrat = 'repFreeRandom';
            } else {
                currentStrat = newStrat(oppMoves);
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

function perfomCounterCycle(oppMoves, bot, gameNum, cycle) {
    var arrayofmoves = cycle.split(',');
    var last = oppMoves[oppMoves.length - 1];
    var next = arrayofmoves.indexOf(last) + 1;
    next = next < cycle || 0;
    return beat(arrayofmoves[next]);
}

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
    if (stratiges.startsWith('Cycle')) {
        return perfomCounterCycle(oppMoves, bot, gameNum, stratiges.slice(5));
    }
    switch (stratiges) {
        case 'Random':
            return perfomRandom(oppMoves, bot, gameNum);
        case 'Mimic':
            return perfomMimic(oppMoves, bot, gameNum);
        case 'repFreeRandom':
            return performRepFreeRandom(oppMoves, bot, gameNum);
    }
}
function newStrat(oppMoves) {
    let strats = ['Random', 'Mimic']
    strats.sort((a, b) => {
        return evualateSrat(oppMoves, b) - evualateSrat(oppMoves, a);
    })
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

function detectCycle(oppMoves) {
    const cycle = 5;
    for (let i = 0; i < (oppMoves.length - cycle * 2); i += (cycle)) {
        let first = oppMoves.slice(i, i + cycle);
        let next = oppMoves.slice(i + cycle, i + cycle * 2);
        if (first.toString() === next.toString()) { return 'Cycle' + first.toString() }
    }
    return false;
}

module.exports = new Bot();
