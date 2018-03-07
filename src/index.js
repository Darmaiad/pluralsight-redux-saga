import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import configureStore from './configureStore';
import Root from './components/Root';

import './../public/css/styles.css';
import './../public/favicon.ico';

const store = configureStore();

import { getCurrentUserInfo } from './actions';
store.dispatch(getCurrentUserInfo('U10000'));

render(
  <Root store={store} />,
  document.getElementById('AppContainer')
);
