import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { ApiCall, apiCallErr } from "../actions/apiStatusActions";

export function loadAuthorOK(authors) {
  return {
    type: types.LOAD_AUTHORS_OK,
    authors
  };
}

export function createAuthorOK(author) {
  return {
    type: types.CREATE_AUTHOR_OK,
    author
  };
}

export function deleteAuthorNoApiWaiting(author) {
  return { type: types.DELETE_AUTHOR_NO_API_WAITING, author };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(ApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorOK(authors));
      })
      .catch(error => {
        dispatch(apiCallErr(error));
        throw error;
      });
  };
}

export function deleteAuthor(author) {
  return function(dispatch) {
    dispatch(deleteAuthorNoApiWaiting(author));
    return authorApi.deleteAuthor(author._id);
  };
}

export function createAuthor(author) {
  return function(dispatch) {
    dispatch(ApiCall());
    return authorApi
      .createAuthor(author)
      .then(savedAuthor => dispatch(createAuthorOK(savedAuthor)))
      .catch(error => {
        dispatch(apiCallErr(error));
        throw error;
      });
  };
}
