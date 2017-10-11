import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';

ReactDOM.render(<Game gridSize={5} squaresToWin={3} />, document.getElementById('root'));
