import {
  GET_QUESTIONS,
  CREATE_QUESTION,
  GET_ONE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  ANSWER_QUESTION,
  CHANGE_PRIORITY
} from "../actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return [...action.questions]
    case CREATE_QUESTION:
      return [...state]
    case GET_ONE_QUESTION:
      return [...state.filter(question => question._id!==action.question._id).concat(action.question)]
    // not implemented yet
    case UPDATE_QUESTION:
      return [...state, action.question]
    case CHANGE_PRIORITY:
      return [...state.filter(question => question._id!==action.question._id).concat(action.question)]
    case DELETE_QUESTION:
      return [...state.filter(question => question._id !== action.id)]
    case ANSWER_QUESTION:
      return [...state.filter(question => question._id!==action.question._id).concat(action.question)];
    default:
      return state;
  }
};