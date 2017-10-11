import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {

    renderSquare(i) {

      let isWinning = this.props.winner && this.props.winner.squares.indexOf(i) !== -1;

        return (
            <Square 
                key={i}
                value={this.props.squares[i]}
                isWinning={isWinning}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderRow(rowIndex) {
      let row = [];
      for (let i=0; i < this.props.gridSize; i++) {
          row.push(this.renderSquare(rowIndex * this.props.gridSize + i));
      }
      return (<div key={rowIndex} className="board-row">{row}</div>);
    }
    
    render() {

      let rows = [];
      for (let i=0; i < this.props.gridSize; i++) {
        rows.push(this.renderRow(i));
      }

      return (
        <div>{rows}</div>
      );
    }
  }