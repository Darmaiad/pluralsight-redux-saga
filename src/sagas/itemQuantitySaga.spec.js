import { select, put, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { fromJS } from 'immutable';

import {
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    FETCHING,
    FETCHED,
} from './../actions';
import { handleIncreaseItemQuantity } from './itemQuantitySaga';
import { currentUserSelector } from './../selectors/currentUserSelector';

describe('Item quantity saga', () => {
    let item;
    let user;
    beforeEach(() => {
        item = { id: 12345 };
        user = fromJS({ id: 'ABCDE' });
    });

    describe('Handle increase item quantity', () => {
        let gen;
        beforeEach(() => {
            gen = handleIncreaseItemQuantity(item);
            expect(gen.next().value).toEqual(put(setItemQuantityFetchStatus(FETCHING)));
            expect(gen.next().value).toEqual(select(currentUserSelector));
            expect(gen.next(user).value).toEqual(call(fetch, `/cart/add/${user.get('id')}/${item.id}`));
        });

        test('Increasing quantity successfully', () => {
            expect(gen.next({ status: 200 }).value).toEqual(put(setItemQuantityFetchStatus(FETCHED)));
        });
        test('Increasing quantity unsuccessfully', () => {
            expect(gen.next({ status: 500 }).value).toEqual(put(decreaseItemQuantity(item.id, true)));
            expect(gen.next().value).toEqual(put(setItemQuantityFetchStatus(FETCHED)));
        });
    });
});
