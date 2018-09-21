import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../Clock/clock-reducer';

import Clock from '../Clock';

const middlewares = [thunk];

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);
//   // middlewares.push(logger);
// }

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <Clock>{children}</Clock>
  </Provider>
);

export default AppProvider;
