import { take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

import { setCustomerServiceAvailability } from './../actions';

export function* customerServiceAvailabilitySaga() {
    const socket = io();

    const chan = new eventChannel((emit) => {
        const enableSupportMessage = () => {
            emit(true);
        };
        const disableSupportMessage = () => {
            emit(false);
        };

        socket.on('SUPPORT_AVAILABLE', enableSupportMessage);
        socket.on('SUPPORT_NOT_AVAILABLE', disableSupportMessage);

        // Event Channels must return an object that cancels the channel or removes the listeners
        return () => {
            // Here is the place where we would uncreate the channel
        };
    });

    while (true) {
        let supportAvailable = yield take(chan);
        yield put(setCustomerServiceAvailability(supportAvailable));
    }
}
