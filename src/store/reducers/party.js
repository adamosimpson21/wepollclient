import { CREATE_PARTY, DELETE_PARTY, UPDATE_PARTY,LOAD_PARTIES,LOAD_ONE_PARTY } from '../actionTypes'

const DEFAULT_STATE = {
  parties: []
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_PARTIES:
      return [...action.parties]
    case UPDATE_PARTY:
      return [...action.parties]
    case LOAD_ONE_PARTY:
      return [action.parties]
    case CREATE_PARTY:
      return [...state, action.party]
    case DELETE_PARTY:
      return [...state.filter(party => party._id !== action.id)]
    default:
      return state;
  }
};