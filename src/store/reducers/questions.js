import { GET_QUESTIONS, CREATE_QUESTION, GET_ONE_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from "../actionTypes";

const DEFAULT_STATE = {
  questions: []
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return [...action.questions]
    case CREATE_QUESTION:
      return [...state, action.question]
    case GET_ONE_QUESTION:
      return [action.question]
    // not implemented yet
    case UPDATE_QUESTION:
      return [...state, action.question]
    case DELETE_QUESTION:
      return [...state.filter(question => question._id !== action.id)]
    default:
      return state;
  }
};