import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './combineReducers';
import { defaultState } from './defaultState';
import { initSagas } from './initSagas';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [];
    middlewares.push(thunk);
    middlewares.push(sagaMiddleware);

    if (process.env.NODE_ENV === 'development') {
        // Using require because we ignore them with webpack
        const createLogger = require('redux-logger').createLogger;

        // Transform logged to work with immutable.js data structures
        const logger = createLogger({
            stateTransformer: (state) => state.toJS(),
        });

        middlewares.push(logger);
        middlewares.push(require('redux-immutable-state-invariant').default());
    }

    const enhancer = compose(
        applyMiddleware(...middlewares)
    );

    const store = createStore(
        reducer,
        defaultState,
        enhancer
    );

    initSagas(sagaMiddleware); // Sagas can be initialized after middleware has been placed inside a store

    return store;
};

// Exporting configureStore and not the store itself because if we later write
// any tests, we can write as many stores as we want
export default configureStore;
