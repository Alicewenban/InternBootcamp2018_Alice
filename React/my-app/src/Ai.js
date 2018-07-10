import { Board, calculateWinner, calculateWinnerLines, calulateDraw } from './Board';
export function makeMove(squares, difficulty) {
    let freeSquares = [];
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            freeSquares.push(i);
        }
    }
    switch (difficulty) {
        case 'easy':
            return easyMove(squares, freeSquares);
        case 'medium':
            return mediumMove(squares, freeSquares);
        case 'hard':
            return hardMove(squares, freeSquares);
    }
}

function easyMove(squares, freeSquares) {
    return freeSquares[Math.floor(Math.random() * freeSquares.length)];
}

function mediumMove(squares, freeSquares) {
    let win;
    for (let i = 0; i < freeSquares.length; i++) {
        let practice = squares.slice();
        practice[freeSquares[i]] = 'O';
        win = calculateWinner(practice);
        if (win) {
            return freeSquares[i];
        }
    }
    return freeSquares[Math.floor(Math.random() * freeSquares.length)];

}


function hardMove(squares, freeSquares) {
    for (let i = 0; i < freeSquares.length; i++) {
        let practice = squares.slice();
        practice[freeSquares[i]] = 'X';
        let block = calculateWinner(practice);
        practice[freeSquares[i]] = 'O';
        let win = calculateWinner(practice);
        if (win || block) {
            return freeSquares[i];
        }
    }
    return freeSquares[Math.floor(Math.random() * freeSquares.length)];

}