import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export const addError = error => ({
  type: ADD_ERROR,
  error
});

export const removeError = () => ({
  type: REMOVE_ERROR
});

export const addErrorAction = error => {
  return dispatch => {
    dispatch(addError(error));
  }
}