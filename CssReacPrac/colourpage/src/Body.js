import React from 'react';
import styled, { css } from 'react-emotion'
import { mintyBlue, purple } from './colourIndex'
import { Button } from './Button'
import { Counter } from './VengaCounter'
var Cookies = require('cookies-js');

export class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bCol: mintyBlue,
            spin: false,
        }
    }
    followLink(url) {
        window.open(url, '_blank');
    }
    yespress() {
        this.setState({
            spin: true,
            bCol: purple,
            //counter: parseInt(Cookies.get('vengaLove')) + 1,
        })
        setTimeout(() => {
            this.setState({
                spin: false,
                bCol: mintyBlue
            })
        }, 850)
        if (!isNaN(parseInt(Cookies.get('vengaLove')))) {
            const score = parseInt(Cookies.get('vengaLove')) + 1;
            console.log(Cookies.get('vengaLove'))
            Cookies.set('vengaLove', score);
        } else { 
            Cookies.set('vengaLove','1')
        }

    }
    render() {
        const bodyBox = css`
            background: ${this.state.bCol} ; 
            height:100%;
            width:75%;
            margin:1.25%;    
            display:inline-block;
            top:0;
            border-radius: 25px;
            `
        const spin = css`
            animation-name: spin;
            animation-duration: 400ms;
            animation-iteration-count: 2;
            animation-timing-function: linear;
        `
        const spinCode = css`
            @keyframes spin {
                from {transform:rotate(0deg);}
                to {transform:rotate(360deg);}
            }`
        const titleStyle = css`
            text-align: center;
        `
        const buttonDivStyle = css`
            justify-content: center;
            display: flex;
            `
        return (
            <div className={`${bodyBox} ${spinCode} ${this.state.spin ? spin : ' '}`}>
                <h1 className={titleStyle}> Is the VengaBus coming (home)?</h1>
                <div className={buttonDivStyle}>
                    <Button
                        name="YES!!!"
                        colour={mintyBlue}
                        onClickFunction={() => this.yespress()}
                        display={'inline-block'}
                    />
                    <Button
                        name="no"
                        colour={mintyBlue}
                        onClickFunction={() => this.followLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                        display={'inline-block'}
                    />
                </div>
                <Counter/>
            </div>
        );
    }
}