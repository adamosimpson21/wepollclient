import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

export function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );

  return store;
}
