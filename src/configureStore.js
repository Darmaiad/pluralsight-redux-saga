import { applyMiddleware, compose, createStore } from 'redux';
// Using require because we ignore them with webpack
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

const configureStore = () => {
    const middlewares = [];
    middlewares.push(thunk);

    if (process.env.NODE_ENV === 'development') {
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
        rootReducer,
        enhancer
    );

    return store;
};

// Exporting configureStore and not the store itself because if we later write
// any tests, we can write as many stores as we want
export default configureStore;
