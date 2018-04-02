import { take, call, put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import {
    TOGGLE_CHECKING_OUT,
    QUANTITY_VERIFICATION_CHECKOUT_PHASE,
    CREDIT_VALIDATION_CHECKOUT_PHASE,
    ERROR_CHECKOUT_PHASE,
    PURCHASE_FINALIZATION_CHECKOUT_PHASE,
    SUCCESS_CHECKOUT_PHASE,
    setCheckoutPhase,
} from './../actions';
import { currentUserSelector } from './../selectors';

// Instead of having a huge process that can take many minutes to resolve we will split the checkout into various phases:
// Charging phase, the quantity verification phase, etc, updating the user on what's happing in every step.

export function* validateCart(user) {
    const response = yield fetch(`http://localhost:8081/cart/validate/${user.get('id')}`);
    const { validated } = yield response.json();
    return validated;
}

export function* validateCreditCard(user) {
    const response = yield fetch(`http://localhost:8081/card/validate/${user.get('id')}`);
    const { validated } = yield response.json();
    return validated;
}

export function* executePurchase(user) {
    const response = yield fetch(`http://localhost:8081/card/charge/${user.get('id')}`);
    const { success } = yield response.json();
    return success;
}

export function* checkout() {
    const user = yield select(currentUserSelector);

    // Phase 1: Check that the quantities the user has in the cart are acceptable.
    yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
    // This already has validations in place, but in case something changes with the session or the server,
    // this validation will ensure that the user will not checkout items that cannot be given to him.
    const cartValidated = yield call(validateCart, user);
    if (!cartValidated) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE)); // Set phase to Error.
        return;
    }

    // Phase 2: Validate credit card
    yield put(setCheckoutPhase(CREDIT_VALIDATION_CHECKOUT_PHASE));
    const creditCardValidated = yield call(validateCreditCard, user);
    if (!creditCardValidated) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE)); // Set phase to Error.
        return;
    }

    // Phase 3: Finalize process
    yield put(setCheckoutPhase(PURCHASE_FINALIZATION_CHECKOUT_PHASE));
    const purchaseSuccessful = yield call(executePurchase, user);
    if (!purchaseSuccessful) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE)); // Set phase to Error.
        return;
    }

    // If the function has reached this point without returning it must mean that it is successful
    // Phase 4: Success
    yield put(setCheckoutPhase(SUCCESS_CHECKOUT_PHASE));
}

export function* checkoutSaga() {
    while (true) {
        const isCheckingOut = yield take(TOGGLE_CHECKING_OUT);
        if (isCheckingOut) {
            yield call(checkout);
        }
    }
}
