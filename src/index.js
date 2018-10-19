import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { setAuthorizationToken, setCurrentUser, authUser } from "./store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(authUser('hydrate', {username:jwtDecode(localStorage.jwtToken).username}));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
