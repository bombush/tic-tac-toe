import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import configReducer from './model/config/reducer';
import gameReducer from './model/game/reducer';
//import todoApp from './reducers'

import './index.css';
import Game from './containers/Game';


const reducer = combineReducers({
    game: gameReducer,
    config: configReducer
});
let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
)
