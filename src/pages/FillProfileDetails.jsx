import React, { useState } from "react";
import InputFilde from "../Components/InputFilde";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../Components/BaseUrl";
import { useCookies } from "react-cookie";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
// import "./css/auth.css";
function FillProfileDetails() {
  let [loading, setLoading] = useState(false);
  let [cookies, setCookies] = useCookies();
  let navigate = useNavigate();
  let [details, setDetails] = useState({
    username: "",
    firstname: "",
    lastname: "",
  });
  let change = (e) => {
    let { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  let handelSubmite = async (e) => {
    let { username, firstname, lastname } = details;
    if (!username || !firstname || !lastname)
      return toast.error("Plase fill details");
    setLoading(true);
    try {
      let { data } = await axios.patch(`${BaseUrl}/api/auth/signup/profile`, {
        username,
        firstname,
        lastname,
        uid: cookies.signupUid,
        token: cookies.signupToken,
      });
      if (data.status === "fail") {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.status === "ok") {
        setCookies("signupToken", null);
        setCookies("signupUid", null);
        setLoading(false);
        navigate("/auth");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="main_container" style={{ flexDirection: "column" }}>
      {/* child contaienr that has login and signup form */}
      <h3 style={{ color: "rgb(12, 214, 12)" }}>Complete Your Profile</h3>
      <div className="child_container mt-3">
        {/* Selection container */}
        <div className="selection_container">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <p className={`nav-link active_tab `}>Profile Info</p>
            </li>
          </ul>
        </div>
        {/*OTP form   */}
        <div className={`fill_profile_details `}>
          <InputFilde
            title={"Username"}
            type="text"
            name={"username"}
            change={change}
          />
          <InputFilde
            title={"Firstname"}
            type="text"
            name={"firstname"}
            change={change}
          />
          <InputFilde
            title={"Lastname"}
            type="text"
            name={"lastname"}
            change={change}
          />
          <div className="container d-flex justify-content-center align-items-center">
            <button className="btn btn-color " onClick={handelSubmite}>
              Submite
            </button>
          </div>
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

export default FillProfileDetails;
