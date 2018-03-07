import React from 'react';

import { MainContainer } from '../components';
import { getCurrentUserInfo } from '../actions';

const App = () => {
  return (
    <div>
      <MainContainer />
    </div>
  );
};

export default App;

store.dispatch(getCurrentUserInfo(`U10000`));
