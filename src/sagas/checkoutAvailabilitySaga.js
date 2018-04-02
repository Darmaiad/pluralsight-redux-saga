// This saga will check whether the cart is in a state where the user can checkout from.

// For some reason, actionChannel is in the effects folder (unlike eventChannel which is in redux-saga).
import { take, put, actionChannel } from 'redux-saga/effects';

import { SET_SHIPPING_FETCH_STATUS, FETCHED, setCanCheckOut } from './../actions';

export function* checkoutAvailabilitySaga() {
    const checkoutAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
    // Everytime the SET_SHIPPING_FETCH_STATUS occurs (at the beginning of the App or any time the quantity foes up or down).
    while (true) {
        const { status } = yield take(checkoutAvailabilityChannel);
        // We will put a setCanCheckOut event
        yield put(setCanCheckOut(status === FETCHED));
    }
}

// Since we are not making any server calls in this saga it is unlikely that any SET_SHIPPING_FETCH_STATUS actions will be missed.
// But if it had pne of those the user could be able to click the button when they where not allowed to.
