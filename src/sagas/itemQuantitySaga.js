// Select returns a copy of the app state when yielded to
import { takeLatest, select, put, call, all } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    FETCHING,
    FETCHED,
} from './../actions';
import { currentUserSelector } from './../selectors/currentUserSelector';

export function* handleIncreaseItemQuantity({ id }) {
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield call(fetch, `http://localhost:8081/cart/add/${user.get('id')}/${id}`);

    // if there are not enough items in stock to complete the request, the server will return 503
    if (response.status !== 200) {
        // So, we decrease the quantity by 1
        yield put(decreaseItemQuantity(id, true));
        // And we inform the user
        alert('Not enough items in stock to complete the request');
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
};

export function* handleDecreaseItemQuantity({ id, local }) {
    // If we only adjusted (decreased) locally to return to the original (because there are not enough items), we do not want to dispatch to the server 
    if (local) {
        return;
    }
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield call(fetch, `http://localhost:8081/cart/remove/${user.get('id')}/${id}`);

    if (response.status !== 200) {
        /* eslint-disable no-console */
        console.warn('Non-200 Status');
    }

    yield put(setItemQuantityFetchStatus(FETCHED));
};

export function* itemQuantitySaga() {
    yield all([
        takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
        takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity),
    ]);
};
