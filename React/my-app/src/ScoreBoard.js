import React, { Component } from 'react';
import './App.css';



export class ScoreBoard extends React.Component {
    render() {
        return (
            < div >
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>X</td>
                        <td>{this.props.x}</td>
                    </tr>
                    <tr>
                        <td>O</td>
                        <td>{this.props.o}</td>
                    </tr>
                </tbody>
            </div >
        )
    }
}