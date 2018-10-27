import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { CREATE_PARTY, DELETE_PARTY, UPDATE_PARTY,LOAD_PARTIES,LOAD_ONE_PARTY , JOIN_PARTY,LEAVE_PARTY, } from "../actionTypes";
import { updateCurrentUser } from "./auth";

export const loadParties = parties => ({
  type: LOAD_PARTIES,
  parties
});

export const loadOneParty = party => ({
  type: LOAD_ONE_PARTY,
  party
});

export const createParty = party => ({
  type: CREATE_PARTY,
  party
})

export const deleteParty = partyId => ({
  type: DELETE_PARTY,
  partyId
});

export const updateParty = party => ({
  type: UPDATE_PARTY,
  party
})

export const joinParty = response => ({
  type: JOIN_PARTY,
  response
})

export const loadPartiesAction = () => {
  return dispatch => {
    return apiCall("get", "/api/party/")
      .then(res => {
        dispatch(loadParties(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const loadOnePartyAction = id => {
  return dispatch => {
    return apiCall("get", `/api/party/${id}`)
      .then(res => {
        dispatch(loadOneParty(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const createPartyAction = body => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/party/${id}`, body)
    .then(res => {
      dispatch(createParty(res))
    })
    .catch(err => addError(err.message));
};

export const deletePartyAction = partyId => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("delete", `/api/party/${id}/${partyId}`)
    .then(() => dispatch(deleteParty(partyId)))
    .catch(err => {
      addError(err.message);
    });
};

export const updatePartyAction = (partyId, body) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("put", `/api/items/${id}/${updateParty}`, body)
    .then(() => dispatch(updateParty(partyId)))
    .catch(err => {
      addError(err.message);
    });
};

export const joinPartyAction = partyId => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/party/${id}/${partyId}`)
    .then(res => {
      dispatch(updateCurrentUser(res.user))
      dispatch(addError(res.message))
    })
    .catch(err => dispatch(addError(err.message)));
};


