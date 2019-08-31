export default {
  sorted: [
    {
      sortedCourses: false,
      sortedAuthors: false,
      sortedTitle: false,
      sortedCategory: false
    }
  ],
  courses: [],
  authors: [],
  apiCalls: 0,
  auth: {
    isAuthenticated: false,
    user: {}
  }
  // we can have multiple api calls in the same time
}; //when we have multiply reducers , initialstate is goot think to see shape of are store
