import React from 'react';
import styled, { css } from 'react-emotion'
var Cookies = require('cookies-js');

export class Counter extends React.Component {

    render() {

        const divStyle = css`
                display:flex;
                justify-content: center;
                padding:5px;
        `
        return (
            <div className={divStyle} >
                Current VengaLove Score : {Cookies.get('vengaLove') ? Cookies.get('vengaLove'): 0 }
                
            </div>
        );
    }
}