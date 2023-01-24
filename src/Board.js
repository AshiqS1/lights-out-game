import React, { Component } from 'react';
import Cell from './Cell.js';
import './Board.css';

// // // // // // // // // // // // // // // // // // // // // // // // //
// Gameboard of Lights-Out-Game.
// 
// Properties: 
// - nrows: number of rows of board
// - ncols: number of cols of board
// - chanceLightStartsOn: float, chance any cell is lit at start of game. 
// 
// State:
// - hasWon: boolean, true when board is all off.
// - board: array-of-arrays of true/false. 
// 
//  For this board:  
//
//      . . .
//      O O .   (where . is off, and O is on)
//      . . .
// 
//      true (t), false (f).
//      This would be: [[f, f, f], [t, t, f], [f, f, f]]
// 
//  This should render an HTML table of individual <Cell /> components. 
//  
// The Board component doesn't handle any clicks -- clicks are on individual cells. 
// // // // // // // // // // // // // // // // // // // // // // // // //

class Board extends Component {

    static defaultProps = {
        nrows: 5, // number of rows on game grid.
        ncols: 5, // number of columns on game grid.
        chanceLightStartsOn: 0.25, // 25% chance of cell being lit at game start.
    };

    constructor(props) {
        super(props);
        this.state = {
            // initial value of state.
            hasWon: false,
            board: this.createBoard(),
        }
    }

    // This function creates a board nrows high / ncols wide.
    // with each cell randomly lit or unlit. 
    // // Create an array-of-arrays filled with true/false values. 
    // // // Use nested For loops. Loop over number of rows and columns.
    // // // Inside of 2nd nested loop, we will build a row of ncols columns, 
    // // // We will fill this row of columns with boolean values (true/false).
    // // // Then, push each row onto the board, and return the board. 
    createBoard() {
        let board = [];
        for (let y = 0; y < this.props.nrows; y++) {
            let row = []; // ex. let row = [true, true, false, true, false];
            for (let x = 0; x < this.props.ncols; x++) {
                row.push(Math.random() < this.props.chanceLightStartsOn);
            }
            board.push(row);
        }
        return board;
    }

    // This function handles changing a cell (lit/unlit). 
    // Contains functionality to update board and determine if winner. 
    flipCellsAround(coord) {
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            // if this coordinate is actually on the board, flip it. 
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        // Flip clicked cell and the cells around it
        flipCell(y, x); // Flip clicked cell
        flipCell(y + 1, x); // Flip north cell
        flipCell(y - 1, x); // Flip south cell
        flipCell(y, x + 1); // Flip east cell
        flipCell(y, x - 1); // Flip west cell

        // Check if every cell on the board is turned off (win condition).
        let hasWon = board.every(row => row.every(cell => !cell));
        this.setState({ board: board, hasWon: hasWon });
    }

    // This function renders the gameboard. 
    makeTable() {
        let tblBoard = [];
        for (let y = 0; y < this.props.nrows; y++) {
            let row = []; // ex. let row = [true, true, false, true, false];
            for (let x = 0; x < this.props.ncols; x++) {
                let coord = `${y}-${x}`;
                row.push(
                    <Cell
                        key={coord}
                        isLit={this.state.board[y][x]}
                        flipCellsAroundMe={() => this.flipCellsAround(coord)}
                    />
                );
            }
            tblBoard.push(<tr key={y}>{row}</tr>);
        }
        return (
            <table className="Board">
                <tbody>{tblBoard}</tbody>
            </table>
        );
    }


    // If the game is won, just show a winning msg & render nothing else.
    // When game is being played, show gameboard. 
    render() {
        return (
            <div>
                {this.state.hasWon ?
                    <div className="winner">
                        <span className="neon-orange">YOU</span>
                        <span className="neon-blue">WIN!</span>
                    </div>
                    :
                    <div>
                        <div className="Board-title">
                            <span className="neon-orange">Lights</span>
                            <span className="neon-blue">Out</span>
                        </div>
                        {this.makeTable()}
                    </div>
                }
            </div>
        )
    }
}

export default Board;