import React, { useState } from "react";
import InputFilde from "../Components/InputFilde";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../Components/BaseUrl";
import { InfinitySpin } from "react-loader-spinner";
import { useCookies } from "react-cookie";
import axios from "axios";
// import "./css/auth.css";
function SignupOtp() {
  let [loading, setLoading] = useState(false);
  let [cookies, setCookies] = useCookies();

  let navigate = useNavigate();
  let [otp, setOtp] = useState("");
  let handelOTP = async (e) => {
    if (!otp) return toast.error("Plase enter otp");
    setLoading(true);
    try {
      let { data } = await axios.patch(`${BaseUrl}/api/auth/signup`, {
        otp,
        token: cookies.signupToken,
        uid: cookies.signupUid,
      });
      if (data.status === "fail") {
        setLoading(false);
        return toast.error(data.message);
      }
      if (data.status === "ok") {
        setLoading(false);
        navigate("/suprofile");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="main_container" style={{ flexDirection: "column" }}>
      {/* child contaienr that has login and signup form */}
      <h3 style={{ color: "rgb(12, 214, 12)" }}>
        Email Verification: Secure Your Account
      </h3>
      <div className="child_container mt-3">
        {/* Selection container */}
        <div className="selection_container">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <p className={`nav-link active_tab `}>Enter OTP</p>
            </li>
          </ul>
        </div>

        {/*OTP form   */}
        <div className={`otp `}>
          <InputFilde
            title={"OTP"}
            type="Number"
            change={(e) => {
              setOtp(e.target.value);
            }}
          />
          <div className="container d-flex justify-content-center align-items-center">
            <button className="btn btn-color " onClick={handelOTP}>
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

export default SignupOtp;
