import * as types from "./actionTypes";
import * as authorCall from "../../apiReq/authorCall";
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
    return authorCall
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
    return authorCall.deleteAuthor(author._id);
  };
}

export function createAuthor(author) {
  return function(dispatch) {
    dispatch(ApiCall());
    return authorCall
      .createAuthor(author)
      .then(savedAuthor => dispatch(createAuthorOK(savedAuthor)))
      .catch(error => {
        dispatch(apiCallErr(error));
        throw error;
      });
  };
}
