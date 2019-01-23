import {ADD_MESSAGE, CREATE_QUESTION, REMOVE_MESSAGE} from "../actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    // Current supported message degrees: 'success', 'warning', and 'error'
    case CREATE_QUESTION:
      return state.concat({message: action.message, degree:'success'})
    case ADD_MESSAGE:
      return state.concat({message: action.message, degree:action.degree});
    case REMOVE_MESSAGE:
      return [];
    default:
      return state;
  }
};
