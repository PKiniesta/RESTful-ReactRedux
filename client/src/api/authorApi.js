const baseUrl = "http://localhost:5000/authors";
const axios = require("axios");

export function getAuthors() {
  return axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(err => console.log(err));
}

export function deleteAuthor(authorId) {
  return axios
    .delete(baseUrl + "/" + authorId)
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

export function createAuthor(author) {
  return axios
    .post(baseUrl + (author.authorId || ""), author)
    .then(response => response.data)
    .catch(err => console.log(err));
}
