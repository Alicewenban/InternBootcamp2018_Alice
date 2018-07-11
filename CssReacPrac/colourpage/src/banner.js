import React from 'react';
import styled, { css } from 'react-emotion'
import { Pink } from './colourIndex'
import { Bus } from './bus'

export class Banner extends React.Component {
    render() {
        const bannerStyle = css`
            background: ${Pink} ; 
            width: 100%;
            height: 8em;    
            overflow:hidden;  
            `
        return (
            <div className={bannerStyle} >
                <Bus/>
            </div>
        );
    }
}