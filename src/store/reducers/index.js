import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import items from "./items";
import questions from './questions';

const rootReducer = combineReducers({
  currentUser,
  questions,
  errors,
  items
});

export default rootReducer;
