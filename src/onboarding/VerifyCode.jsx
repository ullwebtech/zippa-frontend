import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.svg";
import OTPInput, { ResendOTP } from "otp-input-react";
import { resendCode, verifyCode } from "../store/asyncActions/userAsyncActions";
import { isError, updateMessage } from "../store/slices/userSlice";
import { errorStyle, successStyle } from "../utils/ToastStyle";
import ScrollToTop from "../layout/Scroll";

function VerifyCode() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 4) return toast.error("Enter valid code")
    const reset = JSON.parse(localStorage.getItem("reset"));
    if (otp && reset?.email) {
      localStorage.setItem(
        "reset",
        JSON.stringify({ email: reset?.email, code: otp })
      );
      const formDetails = new FormData();
      formDetails.append("code", otp);
      formDetails.append("email", reset?.email);
      dispatch(verifyCode(formDetails));
    }
  };

  function handleResend() {
    // e.preventDefault();
    const reset = JSON.parse(localStorage.getItem("reset"));
    const formDetails = new FormData();
    formDetails.append("email", reset?.email);
    dispatch(resendCode(formDetails));
  }

  const notifySuccess = (msg) => toast.success(msg, successStyle);
  const notifyFail = (err) => toast.error(err, errorStyle);

  useEffect(() => {
    if (message === "Reset code successfully verified") {
      notifySuccess(message);
      dispatch(updateMessage(""));
      navigate("/change-password");
    }
  }, [navigate, message, dispatch, otp]);
  useEffect(() => {
    if (message === "Password reset code resent to user email") {
      notifySuccess(message);
      dispatch(updateMessage(""));
    }
  }, [message, dispatch]);
  useEffect(() => {
    if (error) {
      notifyFail(error);
      dispatch(isError(""));
    }
  }, [error, dispatch]);

  return (
    <main>
      <ScrollToTop />
      <main className="min-h-screen flex justify-center items-center px-5 py-20 bg-primary text-white">
        <section className="px-5 md:px-10 py-10 flex flex-col gap-5 h-full justify-center items-center w-full md:w-2/5">
          <Link to="/" className="mx-auto mb-7">
            <img src={logo} alt="" className="" />
          </Link>
          <h3 className="text-2xl md:text-[32px] text-center font-bold">
            VERIFY CODE!
          </h3>
          <p className="text-center">
            Kindly enter the 4 digit verification code sent to your email
            address
          </p>
          <form
            className="lato w-full flex flex-col  gap-5 md:gap-7"
            onSubmit={handleSubmit}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
              inputStyles={{
                border: "1px solid #8F8F8F",
                background: "inherit",
                height: "50px",
                width: "50px",
                fontSize: "22px",
                borderRadius: "8px",
              }}
              className="flex gap-2 justify-center"
            />
            <span className="w-full flex items-center gap-2">
              Didn’t receive any code?
              <ResendOTP
                renderTime={() => React.Fragment}
                renderButton={(buttonProps) => {
                  return (
                    <button {...buttonProps} className="text-secondary inline">
                      {buttonProps.remainingTime !== 0
                        ? `Resend in ${buttonProps.remainingTime} sec`
                        : "Resend"}
                    </button>
                  );
                }}
                onResendClick={handleResend}
              />
            </span>
            <button
              className={`text-primary w-full text-lg flex items-center justify-center relative bg-secondary rounded-lg font-semibold h-12 transition-all duration-500 ease-in-out`}
            >
              Verify
              {loading && (
                <div className="w-5 h-5 absolute right-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              )}
            </button>
          </form>
        </section>
      </main>
    </main>
  );
}

export default VerifyCode;
