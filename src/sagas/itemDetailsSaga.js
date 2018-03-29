import { take, fork, put, all } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { SET_CART_ITEMS, setItemDetails } from './../actions';

export function* loadItemDetails(item) {
    const { id } = item;
    const response = yield fetch(`http://localhost:8081/items/${id}`);
    const data = yield response.json();
    const info = data[0];
    yield put(setItemDetails(info));
}

export function* itemDetailsSaga() {
    const { items } = yield take(SET_CART_ITEMS);
    // When calling map, if you make sure that everything you return is something that can be yielded,
    // like a process, you can call yield and then map and it will happen asynchronously.
    yield all(items.map((item) => fork(loadItemDetails, item)));
}
