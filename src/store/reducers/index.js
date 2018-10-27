import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import items from "./items";
import questions from './questions';
import parties from './party'

const rootReducer = combineReducers({
  currentUser,
  questions,
  parties,
  errors,
  items
});

export default rootReducer;
