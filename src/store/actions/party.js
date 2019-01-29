import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { CREATE_PARTY, DELETE_PARTY, UPDATE_PARTY,LOAD_PARTIES,LOAD_ONE_PARTY , JOIN_PARTY } from "../actionTypes";
import { updateCurrentUser } from "./auth";
import {addMessage} from "./messages";

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

export const loadPartiesAction = () => dispatch => {
  return apiCall("get", "/api/party/")
    .then(res => dispatch(loadParties(res)))
    .catch(err => dispatch(addError(err.message)));
};

export const loadOnePartyAction = partyId => dispatch => {
  return apiCall("get", `/api/party/${partyId}`)
    .then(res => dispatch(loadOneParty(res)))
    .catch(err =>  dispatch(addError(err.message)));
};

export const createPartyAction = body => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/party/${id}`, body)
    .then(res =>  dispatch(createParty(res)))
    .catch(err => dispatch(addError(err.message)));
};

export const deletePartyAction = partyId => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("delete", `/api/party/${id}/${partyId}`)
    .then(() => dispatch(deleteParty(partyId)))
    .catch(err => dispatch(addError(err.message)));
};

// not implemented
export const updatePartyAction = (partyId, body) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("put", `/api/items/${id}/${updateParty}`, body)
    .then(() => dispatch(updateParty(partyId)))
    .catch(err => dispatch(addError(err.message)));
};

export const joinPartyAction = partyId => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/party/${id}/${partyId}`)
    .then(res => {
      dispatch(updateCurrentUser(res.user))
      dispatch(updateParty(res.party))
      dispatch(addMessage({message:res.message, degree:"success"}))
    })
    .catch(err => dispatch(addError(err.message)));
};


