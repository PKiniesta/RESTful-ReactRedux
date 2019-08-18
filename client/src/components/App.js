import React from "react";
import Header from "./common/Header.js";
import HomePage from "./Home/HomePage";
import CoursesPage from "./courses/CoursesPage";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="container-fluid pl-0 pr-0 ">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/courses" component={CoursesPage} />
      </Switch>
    </div>
  );
};

export default App;
