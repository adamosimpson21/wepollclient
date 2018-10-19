import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { ADD_ITEM, REMOVE_ITEM, LOAD_ITEMS } from "../actionTypes";

export const loadItems = items => ({
  type: LOAD_ITEMS,
  items
});

export const remove = id => ({
  type: REMOVE_ITEM,
  id
});

export const addItem = item => ({
  type: ADD_ITEM,
  item
})

export const removeItem = item_id => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("delete", `/api/items/${id}/${item_id}`)
    .then(() => dispatch(remove(item_id)))
    .catch(err => {
      addError(err.message);
    });
};

export const fetchItems = () => {
  return dispatch => {
    return apiCall("get", "/api/items/")
      .then(res => {
        dispatch(loadItems(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postItem = body => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  return apiCall("post", `/api/items/${id}`, body)
    .then(res => {
      dispatch(addItem(res))
    })
    .catch(err => addError(err.message));
};
