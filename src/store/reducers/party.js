import { CREATE_PARTY, DELETE_PARTY, UPDATE_PARTY, LOAD_PARTIES, LOAD_ONE_PARTY } from '../actionTypes'

const DEFAULT_STATE = {
  parties: []
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_PARTIES:
      return [...action.parties]
    case UPDATE_PARTY:
      const index = state.findIndex(party => party._id ===action.party._id)
      if(~index){
        state[index] = action.party
      }
      return state;
    case LOAD_ONE_PARTY:
      return [action.party]
    case CREATE_PARTY:
      return [...state, action.party]
    case DELETE_PARTY:
      return [...state.filter(party => party._id !== action.partyId)]
    default:
      return state;
  }
};