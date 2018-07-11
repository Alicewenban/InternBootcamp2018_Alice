import React from 'react';
import styled, { css } from 'react-emotion'
import { SideBar } from './sidebar';
import { Body } from './Body';

export class Main extends React.Component {
    render() {
        const mainStyle = css`
            width: 100%;
            height: 100%;  
            font-family: "Arial";  
            `
        const rainbowGrad = css`
            background: linear-gradient(to bottom right, red, orange, yellow, green, cyan, blue, purple);
        `
        return (
            <div className={`${mainStyle} ${rainbowGrad}`}>
                <SideBar />
                <Body />
            </div >
        );
    }
}