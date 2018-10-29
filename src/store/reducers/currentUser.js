import {ANSWER_QUESTION, SET_CURRENT_USER, UPDATE_CURRENT_USER} from '../actionTypes'

const DEFAULT_STATE = {
  isAuthenticated: false, // hopefully be true, when logged in
  user: {} // all the user info when logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return{
        isAuthenticated: !!Object.keys(action.user).length,
        user: {...action.user}
      }
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: {...action.user}
      };
    case ANSWER_QUESTION:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: {...action.user}
      }
    default:
      return state;
  }
};
