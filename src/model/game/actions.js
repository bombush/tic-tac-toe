import * as types from './types';

const gameInit = (gridSize) => (
    {
        type: types.GAME_INIT,
        payload: {
            gridSize
        }
    }
);

const playerMove = player => position => (
    {
        type: types.PLAYER_MOVE,
        payload: {
            player,
            position
        }
    }
);

// @TODO: historyJump
// @TODO: gameReset

export { gameInit, playerMove };
