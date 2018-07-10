import React, { Component } from 'react';
import './App.css';
import Square from './Square';


export class Board extends React.Component {

    renderSquare(i) {
        const check = this.props.selected || [];
        return (

            <Square
                value={this.props.squares[i]}
                selected={check.includes(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderSquares() {
        let outerDiv = [];
        for (let i = 0; i < 3; i++) {
            let children = [];
            for (let j = 0; j < 3; j++) {
                children.push(this.renderSquare(i + 3 * j))
            }
            outerDiv.push(<div className="board-row">{children}</div>);
        }
        return outerDiv
    }

    render() {

        return (
            <div>
                {this.renderSquares()}
            </div>
        );
    }
}

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function calculateWinnerLines(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}


export function calulateDraw(squares) {
    //finish this
    let draw = true;
    for (let i = 0; i < squares.length; i++) {
        draw = draw && squares[i]
    }
    return draw;
}
export default Board