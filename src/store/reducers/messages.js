import { ADD_MESSAGE, REMOVE_MESSAGE } from "../actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.concat({message: action.message, degree:action.degree});
    case REMOVE_MESSAGE:
      return [];
    default:
      return state;
  }
};
