import React, { useEffect, useState } from "react";
import "./css/profile.css";
import InputFilde from "../Components/InputFilde";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import BaserUrl from "../Components/BaseUrl";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import BaseUrl from "../Components/BaseUrl";
function Profile() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [cookies, setCookies] = useCookies();
  let [activeSideTab, setActiveSideTab] = useState(null);
  let [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  let [dPassword, setDPassword] = useState("");
  let [profileDetails, setProfileDetails] = useState(null);
  let handelPasswordInputs = (e) => {
    let { name, value } = e.target;
    setPasswords((prevPasswords) => {
      return { ...prevPasswords, [name]: value };
    });
  };
  let handelUpdatePassowrd = async (e) => {
    e.preventDefault();
    let { oldPassword, newPassword, confirmPassword } = passwords;
    let uid = cookies.uid;
    let token = cookies.token;
    if (newPassword !== confirmPassword)
      return toast.error("New Password and Confirm Password not same");
    setLoading(true);
    try {
      let { data } = await axios.patch(`${BaseUrl}/api/auth/profile`, {
        oldPassword,
        newPassword,
        uid,
        token,
      });
      if (data.status === "fail") {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.status === "ok") {
        setCookies("token", data.token);
        setLoading(false);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  let handelDeleteAccount = async (e) => {
    e.preventDefault();
    let uid = cookies.uid;
    let token = cookies.token;
    let password = dPassword;
    if (!password) return toast.error("Enter Password");
    if (!uid || !token) return toast.error("UserId or Token Missing");
    setLoading(true);
    try {
      let { data } = await axios.post(`${BaseUrl}/api/auth/delete/`, {
        uid,
        token,
        password,
      });
      if (data.status === "fail") {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.status === "ok") {
        setCookies("token", data.token);
        setLoading(false);
        navigate("/daotp");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    async function getProfileDetails() {
      let uid = cookies.uid;
      let token = cookies.token;
      setLoading(true);
      try {
        let { data } = await axios.post(`${BaserUrl}/api/auth/profile`, {
          uid,
          token,
        });
        if (data.status === "fail") {
          setLoading(false);
          return toast.error(data.message);
        }
        if (data.status === "ok") {
          setLoading(false);
          setProfileDetails(data.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }
    getProfileDetails();
  }, []);
  return (
    <div className="container container_profile">
      <div className="profileSideBar">
        <h4>My Profile</h4>
        <ul className="list-group ">
          <li
            className={`list-group-item  ${
              activeSideTab === "basic_info" ? "active_side_tab" : null
            }`}
            aria-current="true"
          >
            <a
              href="#basicInfo"
              onClick={(e) => setActiveSideTab("basic_info")}
            >
              Basic Info
            </a>
          </li>

          <li
            className={`list-group-item  ${
              activeSideTab === "change_password" ? "active_side_tab" : null
            }`}
          >
            <a
              href="#changePassword"
              onClick={(e) => setActiveSideTab("change_password")}
            >
              Change Password
            </a>
          </li>
          <li
            className={`list-group-item ${
              activeSideTab === "delete_account" ? "active_side_tab" : null
            } `}
          >
            <a
              href="#deleteAccount"
              onClick={(e) => setActiveSideTab("delete_account")}
            >
              Delete Account
            </a>
          </li>
        </ul>
      </div>
      <div className="profileInfo container">
        {/* Basic info */}
        <div className="Basic_info" id="basicInfo">
          <h4
            className="ms-2"
            style={{ color: "rgb(12, 214, 12)", textDecoration: "underline" }}
          >
            Basic Information
          </h4>
          <div className="personal_info mt-2 container">
            <div className="personal_info_first_line">
              <p>
                <span className="personal_info_heading_span">Firstname:</span>
                {profileDetails && profileDetails.firstName
                  ? profileDetails.firstName
                  : "User"}
              </p>
              <p>
                <span className="personal_info_heading_span">Lastname:</span>
                {profileDetails && profileDetails.lastName
                  ? profileDetails.lastName
                  : "User"}
              </p>
            </div>
            <div className="personal_info_second_line">
              <p>
                <span className="personal_info_heading_span">Username:</span>
                {profileDetails && profileDetails.username
                  ? profileDetails.username
                  : "Username"}
              </p>
              <p>
                <span className="personal_info_heading_span">Email:</span>
                {profileDetails && profileDetails.email
                  ? profileDetails.email
                  : "Email"}
              </p>
            </div>
          </div>
        </div>
        {/* update password */}
        <h4
          className="mt-2 ms-2"
          style={{ color: "rgb(12, 214, 12)", textDecoration: "underline" }}
        >
          Update Password
        </h4>
        <div className="update_password mt-2 ms-1" id="changePassword">
          <form onSubmit={handelUpdatePassowrd}>
            {/* old password */}
            <InputFilde
              title={"Old Password"}
              type="password"
              name="oldPassword"
              change={handelPasswordInputs}
            ></InputFilde>
            {/* new password */}
            <InputFilde
              title={"New Password"}
              type="password"
              name="newPassword"
              change={handelPasswordInputs}
            ></InputFilde>
            {/* confirm new password */}
            <InputFilde
              title={"Confirm Password"}
              type="password"
              name="confirmPassword"
              change={handelPasswordInputs}
            ></InputFilde>
            <button className="btn btn-link ms-3">Update</button>
          </form>
        </div>

        {/* delete account */}
        <h4
          className="mt-2 ms-2"
          style={{ color: "rgb(12, 214, 12)", textDecoration: "underline" }}
        >
          Delete Account
        </h4>
        <div className="delete_account mt-2 mb-2" id="deleteAccount">
          <form onSubmit={handelDeleteAccount}>
            <InputFilde
              title={"Password"}
              type="password"
              name={"password"}
              change={(e) => {
                setDPassword(e.target.value);
              }}
            ></InputFilde>
            <button className="btn btn-link ms-3">Proceed</button>
          </form>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
      {loading ? (
        <div className="loader">
          <InfinitySpin width="200" color="rgb(12, 214, 12)" />
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
