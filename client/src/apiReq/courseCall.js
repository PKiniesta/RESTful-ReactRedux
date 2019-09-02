const baseUrl = "http://localhost:5000/courses";
const axios = require("axios");

export function getCourses() {
  return axios
    .get(baseUrl)
    .then(response => response.data)
    .catch(err => console.log(err));
}

export function saveCourse(course) {
  return axios({
    method: course._id ? "PUT" : "POST",
    url: baseUrl + "/" + (course._id || ""),
    data: course
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => console.log(err));
}

export function deleteCourse(courseId) {
  return axios
    .delete(baseUrl + "/" + courseId)
    .then(response => response.data)
    .catch(err => console.log(err));
}
