import { select, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    FETCHED,
    FETCHING,
    setShippingFetchStatus,
    setShippingCost,
} from './../actions';
import { cartItemsSelector } from './../selectors/cartItemsSelector';

function* shipping() {
    yield put(setShippingFetchStatus(FETCHING));
    const items = yield select(cartItemsSelector);

    // For each item
    const itemRequestString = items.reduce((string, item) => {
        // For that many times as its quantity
        for (let i = 0; i < item.get('quantity'); i++) {
            // Add its Id and a comma to the string that we will sent to the server so that it can calculate the cost
            string += item.get('id') + ',';
        }
        return string;
    }, "").replace(/,\s*$/, '');

    // For security reasons we will not calculate the cost on the client side

    const response = yield fetch(`/shipping/${itemRequestString}`);
    const { total } = yield response.json();

    yield put(setShippingCost(total));
    yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
    yield takeLatest([SET_CART_ITEMS, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY], shipping);
}
