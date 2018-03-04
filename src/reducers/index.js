import { combineReducers } from 'redux';

const aReducer = (state = {}, action) => {
    if (action.response) {
        return {
            ...state,
        };
    }
    return state;
};

const rootReducer = combineReducers({ aReducer });

export default rootReducer;
