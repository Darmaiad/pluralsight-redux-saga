import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

const configureStore = () => {
    // Transform logged to work with immutable.js data structures
    const logger = createLogger({
        stateTransformer: (state) => state.toJS(),
    });

    const middlewares = [];
    middlewares.push(thunk);

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger);
        middlewares.push(reduxImmutableStateInvariant());
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
