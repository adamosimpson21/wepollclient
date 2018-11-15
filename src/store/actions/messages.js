import { ADD_MESSAGE, REMOVE_MESSAGE } from "../actionTypes";

export const addMessage = message => ({
  type: ADD_MESSAGE,
  ...message
});

export const removeMessage = () => ({
  type: REMOVE_MESSAGE
});