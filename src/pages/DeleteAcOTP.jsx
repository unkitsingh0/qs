import React, { useState } from "react";
import InputFilde from "../Components/InputFilde";
import BaseUrl from "../Components/BaseUrl";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import "./css/deleteAcOTP.css";
function DeleteAcOTP() {
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [cookies, setCookies] = useCookies();
  let [otp, setOtp] = useState(null);
  let handelDeleteAccount = async (e) => {
    e.preventDefault();
    let uid = cookies.uid;
    let token = cookies.token;
    if (!otp) return toast.error("Enter OTP");
    if (!uid || !token) return toast.error("UserId or Token is Missing");
    setLoading(true);
    try {
      let { data } = await axios.delete(`${BaseUrl}/api/auth/delete`, {
        params: {
          uid,
          token,
          otp,
        },
      });
      if (data.status === "fail") {
        setLoading(false);
        toast.error(data.message);
        return;
      }
      if (data.status === "ok") {
        setLoading(false);
        toast.success("Account deleted");
        setCookies("uid", null);
        setCookies("token", null);
        setTimeout(() => {
          navigate("/auth");
        }, 1000);
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="container deleteOtp">
      <h3 style={{ color: "rgb(12, 214, 12)" }}>
        Account Deletion Verification
      </h3>
      <form
        onSubmit={handelDeleteAccount}
        className="account_deletionForm p-3 mt-3"
      >
        <InputFilde
          type="number"
          title="OTP"
          name="otp"
          change={(e) => {
            setOtp(e.target.value);
          }}
        ></InputFilde>
        <div className="delete_btn">
          <button className="btn btn-danger ">Delete Account</button>
        </div>
      </form>
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

export default DeleteAcOTP;
