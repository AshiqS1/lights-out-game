import React, { Component } from 'react';
import './Cell.css';

// // // // // // // // // // // // // // // // // // // // // // // // //
// Single Cell Component of Lights-Out-Game. 
// 
// This component has no state, just 2 props. 
// 
//  - flipCellsAround: a function rec'd from the board, 
//                       which flips this cell and the cells around it. 
//                       > 'This' handles clicks, by calling flipCellsAround.
// 
//  - isLit: boolean (true/false), is this cell lit?
// // // // // // // // // // // // // // // // // // // // // // // // //

class Cell extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        // Call up to the board, to flip neighbouring cells around 'this' cell. 
        this.props.flipCellsAroundMe();
    }

    render() {
        let classes = "Cell" + (this.props.isLit ? "-lit" : "");
        return (
            <td className={classes} onClick={this.handleClick} />
        )
    }
}

export default Cell;