import React, { Component } from 'react';
import './Game.css';
import Board from '../../components/Board';

class Game extends Component {
  constructor(props) {
    console.log('PROPS:', props);
    
    super(props);
    this.state = {
      history: [{
        squares: Array(props.gridSize * props.gridSize).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  componentDidMount() {
    this.props.gameInit([this.props.gridSize, this.props.gridSize]);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.props.playerMove(this.state.xIsNext ? 'X' : 'O')(i);
    /*this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });*/
  }

  checkHorizontalLine(squares, index) {
    // check horizontal line -
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index+i;
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return false;
      }
    }
    return true;
  }

  checkVerticalLine(squares, index) {
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index+(i * this.props.gridSize);
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return false;
      }
    }
    return true;
  }

  checkDiagonalLineDown(squares, index) {
    // check horizontal line \
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index + i * (this.props.gridSize + 1);
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return false;
      }
    }
    return true;
  }

  checkDiagonalLineUp(squares, index) {
    // check horizontal line \
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index - i * (this.props.gridSize - 1);
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return false;
      }
    }
    return true;
  }

  calculateWinner(squares) {

    // run through all squares
    for (let i = 0; i < squares.length; i++) {

      // not occupied
      if (!squares[i]) {
        continue;
      }

      // is there enough space to the right?
      let colIndex = i % this.props.gridSize;
      let rowIndex = (i - colIndex) / this.props.gridSize
      if (this.props.gridSize - colIndex >= this.props.squaresToWin) {

        if (this.checkHorizontalLine(squares, i)) {
          return squares[i];
        }

        // check diagonal down \
        if (this.checkDiagonalLineDown(squares, i)) {
          return squares[i];
        }

        // enough space to the top?
        if (rowIndex+1 >= this.props.squaresToWin) {
          // check diagonal up /
          if (this.checkDiagonalLineUp(squares, i)) {
            return squares[i];
          }
        }

      }

      // is there enough space to bottom?
      if (this.props.gridSize - rowIndex >= this.props.squaresToWin) {

        // check vertical line |
        if (this.checkVerticalLine(squares, i)) {
          return squares[i];
        }
      }

    }

    return null;
  }
  
  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            gridSize={this.props.gridSize}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
