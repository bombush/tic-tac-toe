import { connect } from 'react-redux';

import * as gameActions from '../../model/game/actions';
import Game from './Game';

const mapStateToProps = state => {
    return {
        history: state.game.history.map( board => { squares: board }),
        //stepNumber: 0,
        xIsNext: state.game.currentPlayer === 'X',
        gridSize: state.config.gridSize[0] ,
        squaresToWin: state.config.victoryNumber
    }
};

const mapDispatchToProps = dispatch => {
    return {
        playerMove: player => position => dispatch(gameActions.playerMove(player)(position)),
        gameInit: () => dispatch(gameActions.gameInit())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Game);