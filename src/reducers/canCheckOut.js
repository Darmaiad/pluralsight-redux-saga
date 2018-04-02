import { createReducer } from './../utility';
import { SET_CAN_CHECK_OUT } from './../actions';

export const canCheckOut = createReducer(false, {
    [SET_CAN_CHECK_OUT](state, { value }) {
        return value;
    },
});
