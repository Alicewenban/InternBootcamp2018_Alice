import React from 'react';
import styled, { css } from 'react-emotion'

var moveBus = css`
    @keyframes busAnimation {
        0% {left: -10%;}
        100% {left: 110%;}
    }
`

export class Bus extends React.Component {
    render() {
        const busStyle = css`
        animation-name: busAnimation;
        animation-duration: 5s;
        animation-iteration-count: infinite;
        position:relative;
        top: 50%;
        transform: translateY(-50%);
        `
        const divStyle = css`
            position: relative;
            top: 0%;
            height:100%
        `
        return (
            <div className={divStyle} >
                <img className={`${moveBus} ${busStyle}`} src={require('./bus.png')} height="100em" />
            </div>
        );
    }
}