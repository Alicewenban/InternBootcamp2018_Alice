import React from 'react';
import styled, { css } from 'react-emotion'
import { SidePink } from './colourIndex'

export class Button extends React.Component {
    render() {
        const buttonSytle = css`
                background: ${this.props.colour} ; 
                width: 12em;
                height: 100%;  
                display:flex;
                justify-content: center;
            `
        const white = css`
                color: #FFF;
        `
        const divStyle = css`
                display:flex;
                justify-content: center;
                padding:5px;
                display: ${this.props.display};
            `
        const name = this.props.name


        return (
            <div className={divStyle} >
                <button className={`${buttonSytle} ${ this.props.white ? white : ''}`} onClick={this.props.onClickFunction}>{name}</button>
            </div>
        );
    }
}