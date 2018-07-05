var dynomiteUsed = 0;
var order = [0, 1, 2, 3, 4];
shuffleArray(order);
var cycleSize = 5;

class Bot {

    makeMove(gamestate) {
        let gameNum = gamestate.rounds.length;
        let key = gameNum % cycleSize;
        let moveIdea = numToBot(order[key]);
        if (moveIdea === 'D') {
            dynomiteUsed++;
            if (dynomiteUsed >= 100) {
                //remove 4 from order and reduce cylce
                cycleSize = 4;
                order.splice(order.indexOf(4), 1);
            }
        }
        return moveIdea;
    }

}

function randomNum() {
    let max = 4;
    if (dynomiteUsed >= 100) {
        max = 3;
    }

    return Math.round((Math.random() * max));
}

function numToBot(num) {
    switch (num) {
        case 0:
            // console.log('R');
            return 'R'
        case 1:
            // console.log('P');
            return 'P'
        case 2:
            //console.log('S');
            return 'S'
        case 3:
            //console.log('W');
            return 'W'
        case 4:
            dynomiteUsed++;
            //console.log('D')
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
