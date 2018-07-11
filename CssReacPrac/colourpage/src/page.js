import React from 'react';
import styled, { css } from 'react-emotion'
import { Banner } from './banner'
import { Main } from './main'

export class Page extends React.Component {
    render() {
        const mainStyle = css`
            width: 100%;  
            background-color:  
            `
        return (
            <div className={mainStyle} >
                <Banner />
                <Main />
            </div>
        );
    }
}