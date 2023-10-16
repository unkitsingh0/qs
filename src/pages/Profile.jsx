import React from "react";
import "./css/profile.css";
import InputFilde from "../Components/InputFilde";
function Profile() {
  return (
    <div className="container container_profile">
      <div className="profileSideBar">
        <h4>My Profile</h4>
        <ul className="list-group ">
          <li className="list-group-item " aria-current="true">
            Basic Info
          </li>
          <li className="list-group-item ">A fourth item</li>
          <li className="list-group-item ">Forgot Password</li>
          <li className="list-group-item ">Delete Account</li>
        </ul>
      </div>
      <div className="profileInfo container">
        <div className="Basic_info"></div>
      </div>
    </div>
  );
}

export default Profile;
