import { take, put, call, all } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { SET_CART_ITEMS, SET_CURRENT_USER, setItemPrice } from './../actions';

function* fetchItemPrice(id, currency) {
    const response = yield fetch(`/prices/${currency}/${id}`);
    const json = yield response.json();
    const price = json[0].price;
    yield put(setItemPrice(id, price));
};

export function* itemPriceSaga() {
    const [{ user }, { items }] = yield (all([
        take(SET_CURRENT_USER),
        take(SET_CART_ITEMS),
    ]));

    yield all(items.map((item) => call(fetchItemPrice, item.id, user.country)));
};
