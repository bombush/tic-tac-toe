import * as types from './types';

const initialState = {
    currentPlayer: 'O',
    gridState: null, // Array
    history: []
};

const reducer = (state = initialState, action) => {
    const { payload } = action;
    //const payload = action.payload;

    switch(action.type) {
        case types.GAME_INIT: {
            const gridState = Array(payload.gridSize[0] * payload.gridSize[1]).fill(null);
            const history = [
                ...state.history, 
                gridState
            ];
            // create grid by config
            return {...state, gridState, history};
        }

        case types.PLAYER_MOVE: {
            const gridState = 
                state.gridState
                .splice(
                    payload.position, 
                    1, 
                    payload.player
                );
            
            const history = [...state.history, gridState];
            return {...state, gridState, history};
        }

        default: 
            return state;
    }
};

export default reducer;
