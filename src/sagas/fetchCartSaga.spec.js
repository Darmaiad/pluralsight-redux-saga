import sinon from 'sinon';
import fetch from 'isomorphic-fetch';
import { take, put } from 'redux-saga/effects';


import { fetchCartSaga } from './fetchCartSaga';
import { SET_CURRENT_USER, setCartItems } from './../actions';

describe('The Fetch Cart Saga', () => {
    test('It fetches and puts the cart\'s data', async () => {
        // we need mock-fetch to mock isomorphic fetch
        
        // sinon.stub(mockF, 'fetch').callsFake(() => ({
        //     json: () => ({
        //         some: 'value',
        //     }),
        // }));

        const id = 'jb007';
        const url = `/cart/${id}`;

        const gen = fetchCartSaga();
        expect(gen.next().value).toEqual(take(SET_CURRENT_USER));

        // const result = await runSaga({
        //     dispatch: () => setCartItems,
        //     getState: () => ({ state: 'test' }),
        // }, callApi, url).done;


    });
});
