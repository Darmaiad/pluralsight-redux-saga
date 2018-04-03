import { take, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { SET_CURRENT_USER, setTaxRate } from './../actions';

export function* taxRateSaga() {
    // This line will run in the beginning of the App
    const { user } = yield take(SET_CURRENT_USER);
    // Those lines will run when the SET_CURRENT_USER action is sent
    const { country } = user;
    const response = yield fetch(`/tax/${country}`);
    const { rate } = yield response.json();

    yield put(setTaxRate(rate));
}
