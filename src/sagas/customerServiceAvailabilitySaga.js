import { take, put } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { connect } from './../createSocketConnection';
import { setCustomerServiceAvailability } from './../actions';

export function* customerServiceAvailabilitySaga() {
    const socket = connect();

    // Event chanels take one argument which is a function that takes an emit argument.
    // When you call emit it causes the channel itself to emit an action
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
