import React, { Component } from 'react';
import './App.css';
import { Board, calculateWinner, calculateWinnerLines, calulateDraw } from './Board';
import { makeMove } from './Ai';
import { ScoreBoard } from './ScoreBoard';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squareChange: null,
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            selected: [],
            assending: true,
            diffucultiy: 'medium',
            xScore: 0,
            oScore: 0,
            end: false,
            player:'X'
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.player;
        squares[makeMove(squares, this.state.diffucultiy)] = (this.state.player==='X') ? 'O': 'X';
        this.setState({
            history: history.concat([{
                squareChange: i,
                squares: squares,
            }]),
            stepNumber: history.length,
        });


    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            end: false
        });
    }
    boldTile(i) {
        if (!this.state.end) {
            this.setState({
                selected: [i],
            });
        }
    }
    unBold(i) {
        if (!this.state.end) {
            if (typeof i != Number && this.selected) {
                this.setState({
                    selected: this.selected.splice(this.selected.indexOf('i'), 1),
                });
            } else {
                this.setState({
                    selected: [],
                });
            }
        }
    }
    revButtons() {
        this.setState({
            assending: !this.state.assending,
        });
    }

    handleChange(event) {
        this.setState({ diffucultiy: event.target.value });
    }
    handlePlayerChange(event) { 
        this.setState({ player: event.target.value });
    }
    RestartButtons() {
        this.setState({
            history: [{
                squareChange: null,
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            selected: [],
            diffucultiy: 'medium',
            end: false
        });
    }
    render() {
        var history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const draw = calulateDraw(current.squares)
        var moves;
        if (this.state.assending) {
            moves = history.map((step, move) => {
                const change = indexToDisplay(step.squareChange);
                const desc = move ?
                    'Go to move #' + move + " " + change :
                    'Go to game start';
                return (
                    <li key={move}>
                        <button className="buttons" onClick={() => this.jumpTo(move)} onMouseOver={() => this.boldTile(step.squareChange)} onMouseLeave={() => this.unBold(step.squareChange)}>{desc}</button>
                    </li>
                );
            });
        } else {
            moves = history.slice(0).reverse().map((step, move) => {
                const max = history.length - 1;
                const change = indexToDisplay(step.squareChange);
                const desc = (max - move) ?
                    'Go to move #' + (max - move) + " " + change :
                    'Go to game start';
                return (
                    <li key={(max - move)}>
                        <button className="buttons" onClick={() => this.jumpTo((max - move))} onMouseOver={() => this.boldTile(step.squareChange)} onMouseLeave={() => this.unBold(step.squareChange)}>{desc}</button>
                    </li>
                );
            });

        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner
            if (!this.state.end) {
                this.state.selected = calculateWinnerLines(current.squares)
                this.state.end = true;
                this.state.xScore = (winner === 'X') ? this.state.xScore + 1 : this.state.xScore
                this.state.oScore = (winner === 'O') ? this.state.oScore + 1 : this.state.oScore
            }

        } else if (draw) {
            status = 'A Draw has occoured';
            this.state.end = true;
        } else {
            status = this.state.player+' turn';
        }

        return (
            <div className="game">
                <div className="game-board moving">
                    <Board
                        selected={this.state.selected}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />

                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol >{moves}</ol>
                    <button onClick={() => this.revButtons(history)}>Click to reverse order</button>
                    <select value={this.state.diffucultiy} onChange={(change) => this.handleChange(change)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option selected value="hard">Hard</option>
                    </select>
                </div>
                <div className="game-score">
                    <ScoreBoard x={this.state.xScore} o={this.state.oScore} />
                    <button onClick={() => this.RestartButtons(history)}>Click to play a new game</button>
                    <div>
                        play as :
                        <select value={this.state.player} onChange={(change) => this.handlePlayerChange(change)}>
                            <option value="X">X</option>
                            <option value="O">O</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

function indexToDisplay(i) {
    const col = i % 3 + 1;
    const row = Math.floor(i / 3) + 1;
    return "(row: " + row + " col: " + col + ")";
}


export default Game;