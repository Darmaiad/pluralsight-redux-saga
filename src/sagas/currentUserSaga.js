// apply works the same as call, except it binds the scope of the called method to whatever we choose
import { take, put, call, apply } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { GET_CURRENT_USER_INFO, setCurrentUser } from './../actions';

export function* currentUserSaga() {
    // This information is going to be used only once, so we use take, instead of takeEvery, ot takeLatest
    const { id } = yield take(GET_CURRENT_USER_INFO);
    // The second argument is the URL, we will pass the info route
    const response = yield call(fetch, `/user/${id}`);
    // const response = yield call(fetch, `http://localhost:8081/user/${id}`);
    // To make sense of the repsonse data we need to call response.json
    // response.json id tied to the response scope so we have to use apply instead of call
    const data = yield apply(response, response.json);
    // Now put the data into the app
    yield put(setCurrentUser(data));
};
