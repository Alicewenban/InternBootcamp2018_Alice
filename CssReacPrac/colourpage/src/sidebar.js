import React from 'react';
import styled, { css } from 'react-emotion'
import { SidePink, clashyGreen, deathScreenBlue, musterdYellow } from './colourIndex'
import { Button } from './Button'

export class SideBar extends React.Component {
    followLink(url) {
        window.open(url, '_blank');
    }

    render() {
        const barStyle = css`
            float : left;
            background: ${SidePink} ; 
            width: 20%;
            margin: 1.25%;
            border-radius: 25px;
            `
        return (
            <div className={barStyle}>
                <Button
                    name="The Greatest song of all time"
                    colour={clashyGreen}
                    onClickFunction={() => this.followLink('https://www.youtube.com/watch?v=6Zbi0XmGtMw')}
                />
                <Button
                    name="The greatest wiki of all time"
                    colour={deathScreenBlue}
                    onClickFunction={() => this.followLink('https://en.wikipedia.org/wiki/Vengaboys')}
                    white={true}
                />
                <Button
                    name="The greatest Twitter of all time"
                    colour={musterdYellow}
                    onClickFunction={() => this.followLink('https://twitter.com/vengaboys?lang=en')}
                />
            </div>
        );
    }
}