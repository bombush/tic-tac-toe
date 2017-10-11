import React, { Component } from 'react';
import './Game.css';
import Board from './components/Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(props.gridSize * props.gridSize).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
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
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * @param {*} squares Board squares
   * @param {*} index   square index to test
   * 
   * @return returns indexes of winning combination or empty array 
   */
  checkHorizontalLine(squares, index) {
    // check horizontal line -
    let winning = [index];
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index+i;
      winning.push(testIndex);
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return [];
      }
    }
    return winning;
  }

  /**
   * @param {*} squares Board squares
   * @param {*} index   square index to test
   * 
   * @return returns indexes of winning combination or empty array 
   */
  checkVerticalLine(squares, index) {
    let winning = [index];
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index+(i * this.props.gridSize);
      winning.push(testIndex);
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return [];
      }
    }
    return winning;
  }

  /**
   * @param {*} squares Board squares
   * @param {*} index   square index to test
   * 
   * @return returns indexes of winning combination or empty array 
   */
  checkDiagonalLineDown(squares, index) {
    // check horizontal line \
    let winning = [index];
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index + i * (this.props.gridSize + 1);
      winning.push(testIndex);
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return [];
      }
    }
    return winning;
  }

  /**
   * @param {*} squares Board squares
   * @param {*} index   square index to test
   * 
   * @return returns indexes of winning combination or empty array 
   */
  checkDiagonalLineUp(squares, index) {
    // check horizontal line /
    let winning = [index];
    for (let i = 1; i < this.props.squaresToWin; i++) {
      let testIndex = index - i * (this.props.gridSize - 1);
      winning.push(testIndex);
      if (!squares[testIndex] || squares[testIndex] != squares[index]) {
        return [];
      }
    }
    return winning;
  }

  /**
   * TODO refactor to GameLogic.js
   * 
   * @param {*} squares 
   */
  calculateWinner(squares) {

    let winner = null;

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

        let winCombination = this.checkHorizontalLine(squares, i);
        if (winCombination.length > 0) {
          winner = {
            name: squares[i],
            squares: winCombination,
          }
          break;
        }

        // check diagonal down \
        winCombination = this.checkDiagonalLineDown(squares, i);
        if (winCombination.length > 0) {
          winner = {
            name: squares[i],
            squares: winCombination,
          }
          break;
        }

        // enough space to the top?
        if (rowIndex+1 >= this.props.squaresToWin) {
          // check diagonal up /
          winCombination = this.checkDiagonalLineUp(squares, i);
          if (winCombination.length > 0) {
            winner = {
              name: squares[i],
              squares: winCombination,
            }
            break;
          }
        }

      }

      // is there enough space to bottom?
      if (this.props.gridSize - rowIndex >= this.props.squaresToWin) {

        // check vertical line |
        let winCombination = this.checkVerticalLine(squares, i);
        if (winCombination.length > 0) {
          winner = {
            name: squares[i],
            squares: winCombination,
          }
          break;
        }
      }

    }

    return winner;
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
      status = 'Winner: ' + winner.name;
console.log(winner);
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            winner={winner}
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
