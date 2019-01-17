import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';
import history from './history';
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { setAuthorizationToken, setCurrentUser, authUser } from "./store/actions/auth";
import ScrollToTop from './hocs/ScrollToTop';
import jwtDecode from "jwt-decode";

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(authUser('hydrate', {username:jwtDecode(localStorage.jwtToken).username}));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

// axe configuration
if (process.env.REACT_APP_ENV_TYPE !== 'production') {
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
