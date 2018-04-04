import { take, put, call, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { GET_CURRENT_USER_INFO, setCurrentUser } from './../actions';
import { currentUserSaga } from './currentUserSaga';

describe('The Current User Saga', () => {
    test('It fetches and puts the current user\'s data', () => {
        const id = 'NCC1701';
        const user = { name: 'Jean Luc' };
        // The json function below is a no-op, it does nothing, but when the saga calls it, it will not throw an error.
        const json = () => { };
        // Mock the response.
        const response = { json };
        // Create the generator object by calling the user saga.
        const gen = currentUserSaga();
        // The yield will return a take effect object.
        expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));
        // The yield will return a call effect object and will not actually call the API.
        // We pass the id const, so that it can be used inside the saga.
        expect(gen.next({ id }).value).toEqual(call(fetch, `/user/${id}`));
        expect(gen.next(response).value).toEqual(apply(response, json));
        expect(gen.next(user).value).toEqual(put(setCurrentUser(user)));
    });
});
