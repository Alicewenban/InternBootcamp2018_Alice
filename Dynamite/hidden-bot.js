class Bot {
    constructor() {
        this.MyDynoCount = 0;
        this.OppDynoCount = 0;
        this.drawDyno = true;
        this.drawCount = 0;
        this.inUse = ['R', 'P', 'S'];
    }
    makeMove(gamestate) {
        let gameNum = getGameNum(gamestate);
        if (draw(gamestate)) {
            this.MyDynoCount++;
            if (this.MyDynoCount < 95 && this.drawDyno) { return 'D' }

        }
        if (counter(gamestate)) { this.drawDyno = false; }
        if (uncounter(gamestate)) { this.drawDyno = true; }
        if (gameNum < 100 || false) {
            return perfomRandom(this);
        } else {
            return performHmm(getMyMoves(gamestate).slice(-100), getOppMoves(gamestate).slice(-100));
        }
    }

}

// non mark off
function draw(gamestate) {
    let m = getMyMoves(gamestate);
    let o = getOppMoves(gamestate);
    if (m[m.length - 1] === o[o.length - 1]) { return true }
}
function Postdraw(gamestate) {
    let m = getMyMoves(gamestate);
    let o = getOppMoves(gamestate);
    if (m[m.length - 2] === o[o.length - 2]) { return true }
}
function counter(gamestate) {
    let m = getMyMoves(gamestate);
    let o = getOppMoves(gamestate);
    if (m[m.length - 1] === 'D' && o[o.length - 1] === 'W' && Postdraw(gamestate)) { return true }
}
function uncounter(gamestate) {
    let m = getMyMoves(gamestate);
    let o = getOppMoves(gamestate);
    if (m[m.length - 1] != 'D' && o[o.length - 1] === 'D' && Postdraw(gamestate)) { return true }

}

function perfomRandom(bot) {
    bot.inUse = shuffleArray(bot.inUse);
    //checkDynoRemove(bot, bot.inUse[0], oppMoves[gameNum - 1])
    return bot.inUse[0];
}
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


function shuffleArray(list) {
    for (let i = list.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
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

// markoff
function performHmm(myMoves, oppMoves) {
    let transitionMatrix = Array(5);
    let apearenceCount = Array(5).fill(0);
    let myaperenceVount = Array(5).fill(0);
    let emmsonMatrix = Array(5);

    //make trans and emmison matrix
    //trans is prob they go A-B
    //emmison is prob they go B if i go A

    for (let i = 1; i < oppMoves.length; i++) {
        transitionMatrix[moveToPos(oppMoves[i - 1])] = transitionMatrix[moveToPos(oppMoves[i - 1])] || Array(5).fill(0);
        emmsonMatrix[moveToPos(myMoves[i - 1])] = emmsonMatrix[moveToPos(myMoves[i - 1])] || Array(5).fill(0);

        apearenceCount[moveToPos(oppMoves[i - 1])]++;
        myaperenceVount[moveToPos(myMoves[i - 1])]++;

        transitionMatrix[moveToPos(oppMoves[i - 1])][moveToPos(oppMoves[i])]++;
        emmsonMatrix[moveToPos(myMoves[i - 1])][moveToPos(oppMoves[i])]++;
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            transitionMatrix[i] = transitionMatrix[i] || [0, 0, 0, 0, 0,];
            transitionMatrix[i][j] = transitionMatrix[i][j] / (apearenceCount[i] || 1);

            emmsonMatrix[i] = emmsonMatrix[i] || [0, 0, 0, 0, 0,];
            emmsonMatrix[i][j] = emmsonMatrix[i][j] / (myaperenceVount[i] || 1);
        }
    }
    //  console.log(transitionMatrix, emmsonMatrix);
    let transEffect = transitionMatrix[moveToPos((oppMoves[oppMoves.length - 1]))];
    let emoEffect = emmsonMatrix[moveToPos((myMoves[oppMoves.length - 1]))];

    let chance = [];
    for (let i = 0; i < 5; i++) {
        chance[i] = transEffect[i] * emoEffect[i];
    }

    let predNextScore = Math.max(...chance);
    let predNextmove = posToMove(chance.indexOf(predNextScore));

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
