import React from "react";
import "../home/home.css";

const AboutPage = () => (
  <div className="container login-container">
    <div className="row justify-content-center">
      <div className="col-md-12 login-form-1 ">
        <h3>About</h3>
        <p className="p-about text-justify mt-3">
          Welcome in manage courses app. You can edid, add, delete educational
          courses, new authors and much more. Contact to us, if u want be part
          of that community!
          <br />
        </p>
        <p className="about-span text-center">
          <br />
          <b>You must be logged as administrator to adding new courses !</b>
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;
