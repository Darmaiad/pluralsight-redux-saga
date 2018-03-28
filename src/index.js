import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import configureStore from './configureStore';
import Root from './components/Root';
import { getCurrentUserInfo } from './actions';

import './../public/css/styles.css';
import './../public/favicon.ico';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('AppContainer')
);

// This emulates a cookie or a user-key saved in something like local-storage
store.dispatch(getCurrentUserInfo('U10000'));
