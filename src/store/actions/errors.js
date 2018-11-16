import { ADD_MESSAGE, REMOVE_MESSAGE } from "../actionTypes";

export const addError = error => ({
  type: ADD_MESSAGE,
  message: error,
  degree: "error"
});

export const removeError = () => ({
  type: REMOVE_MESSAGE
});