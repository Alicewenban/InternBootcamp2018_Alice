import React, { Component } from 'react';

function Square(props) {
    const classNameString = "square " + (props.selected ? "selected" : "");
    return (
        <button className={classNameString} onClick={props.onClick}>
            {props.value}
        </button>
    );

}

export default Square;