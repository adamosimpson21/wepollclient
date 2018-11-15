import { combineReducers } from "redux";
import currentUser from "./currentUser";
import messages from './messages';
import errors from "./errors";
import items from "./items";
import questions from './questions';
import parties from './party'

const rootReducer = combineReducers({
  currentUser,
  questions,
  messages,
  parties,
  errors,
  items
});

export default rootReducer;
