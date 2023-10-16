import React, { useState } from "react";
import InputFilde from "../Components/InputFilde";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../Components/BaseUrl";
import { useCookies } from "react-cookie";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import "./css/auth.css";
function Auth() {
  let [loading, setLoading] = useState(false);
  let [cookies, setCookies] = useCookies();
  let [tab, setTab] = useState(0);
  let [loginDetails, setLoginDetails] = useState({
    Lemail: "",
    Lpassword: "",
  });
  let [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    cPassword: "",
  });
  let navigate = useNavigate();
  let change = (e) => {
    let { name, value } = e.target;
    setSignupDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  let change1 = (e) => {
    let { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // This function is for signup
  let onSignup = async (e) => {
    let { email, password, cPassword } = signupDetails;
    if (!email || !password || !cPassword)
      return toast.error("Plase fill details");
    if (password !== cPassword)
      return toast.error("Password and Confirm Password not matching");
    setLoading(true);
    try {
      let { data } = await axios.post(`${BaseUrl}/api/auth/signup`, {
        email,
        password,
      });
      if (data.status === "fail") {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.status === "ok" && data.message === "user created") {
        setCookies("signupToken", data.token);
        setCookies("signupUid", data.uid);
        setLoading(false);
        navigate("/suotp");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("something went worng");
    }
  };
  // This function is for login
  let onLogin = async (e) => {
    let { Lemail, Lpassword } = loginDetails;
    setLoading(true);
    try {
      let { data } = await axios.post(`${BaseUrl}/api/auth/login`, {
        email: Lemail,
        password: Lpassword,
      });

      if (data.status === "fail" && data.message === "email not verifyed") {
        setCookies("signupUid", data.uid);
        setCookies("signupToken", data.token);
        setLoading(false);
        navigate("/suotp");
        return;
      }
      if (data.status === "fail") {
        setLoading(false);
        toast.error(data.message);
        return;
      }
      if (data.status === "ok" && data.message === "login successful") {
        setCookies("uid", data.uid);
        setCookies("token", data.token);
        setLoading(false);
        navigate("/");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="main_container">
      {/* child contaienr that has login and signup form */}
      <div className="child_container">
        {/* Selection container */}
        <div className="selection_container">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item" onClick={(e) => setTab(0)}>
              <p
                className={`nav-link ${
                  tab === 0 ? "active_tab" : "non_active_tab"
                } `}
              >
                Login
              </p>
            </li>
            <li className="nav-item" onClick={(e) => setTab(1)}>
              <p
                className={`nav-link ${
                  tab === 1 ? "active_tab" : "non_active_tab"
                } `}
              >
                Signup
              </p>
            </li>
          </ul>
        </div>
        {/*Login form   */}
        <div className={`login ${tab === 0 ? "" : "display_none"}`}>
          <InputFilde
            title={"Email"}
            type="email"
            change={change1}
            name={"Lemail"}
          />
          <InputFilde
            title={"Password"}
            type="password"
            change={change1}
            name={"Lpassword"}
          />
          <div className="container d-flex justify-content-center align-items-center">
            <button className="btn btn-color " onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
        {/* Signup form */}
        <div className={`signup ${tab === 0 ? "display_none" : ""}`}>
          <InputFilde
            title={"Email"}
            type="email"
            change={change}
            name="email"
          />
          <InputFilde
            title={"Password"}
            type="password"
            change={change}
            name="password"
          />
          <InputFilde
            title={"Confirm Password"}
            type="password"
            change={change}
            name={"cPassword"}
          />
          <div className="container d-flex justify-content-center align-items-center">
            <button className="btn btn-color" onClick={onSignup}>
              Signup
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

export default Auth;
