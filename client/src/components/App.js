import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/container/Home";
import About from "./about/About";
import Header from "./common/header/container/Header";
import PageNotFound from "./PageNotFound";
import Courses from "./courses/container/Courses"; // eslint-disable-line import/no-named-as-default
import Footer from "./common/Footer";
import ManageCourse from "./courses/container/ManageCourse"; // eslint-disable-line import/no-named-as-default
import Authors from "./courses/authors/container/Authors";
import ManageAuthor from "./courses/authors/container/ManageAuthor"; // eslint-disable-line import/no-named-as-default
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import ProtectedRoute from "../utils/ProtectedRoute";

const App = () => (
  <div className="container-fluid pl-0 pr-0">
    <Header />
    <div className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <ProtectedRoute path="/authors" component={Authors} />
        <ProtectedRoute path="/author" component={ManageAuthor} />
        <Route exact path="/courses" component={Courses} />
        <ProtectedRoute path="/course/:slug" component={ManageCourse} />
        <ProtectedRoute path="/course" component={ManageCourse} />
        <Route component={PageNotFound} />
      </Switch>
      <NotificationContainer />
    </div>
    <Footer />
  </div>
);

export default App;
