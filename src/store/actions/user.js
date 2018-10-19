import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { updateCurrentUser } from './auth'

export const buyCoins = numCoins => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("put", `/api/user/${id}/coins`, {coins: numCoins})
    .then(updatedUser =>{
        dispatch(updateCurrentUser(updatedUser))
      })
    .catch(err => {
      addError(err.message);
    });
}

export const addToInventory = itemId => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/user/${id}/item/${itemId}`)
    .then(updatedUser =>{
      dispatch(updateCurrentUser(updatedUser))
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
}

export const removeFromInventory = itemId => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("delete", `/api/user/${id}/item/${itemId}`)
    .then(updatedUser =>{
      dispatch(updateCurrentUser(updatedUser))
    })
    .catch(err => {
      dispatch(addError(err.message));
    });
}