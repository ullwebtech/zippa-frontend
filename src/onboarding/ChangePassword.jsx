import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { resetPassword } from "../store/asyncActions/userAsyncActions";
import { isError, updateMessage } from "../store/slices/userSlice";
import { errorStyle, successStyle } from "../utils/ToastStyle";
import ScrollToTop from "../layout/Scroll";

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);

  const [state, setState] = useState({
    password: "",
    confirm_password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const reset = JSON.parse(localStorage.getItem("reset"));
    if (state.confirm_password === "" || state.password === "")
      return toast.error("Enter both Passwords");
    if (state.confirm_password !== state.password)
      return toast.error("Passwords do not match");
    if (state.password && state.confirm_password === state.password) {
      const formDetails = new FormData();
      formDetails.append("email", reset.email);
      formDetails.append("code", reset.code);
      formDetails.append("password", state.password);
      dispatch(resetPassword(formDetails));
    }
  };

  const notifySuccess = (msg) => toast.success(msg, successStyle);
  const notifyFail = (err) => toast.error(err, errorStyle);

  useEffect(() => {
    if (message && message === "Password reset successful") {
      notifySuccess(message);
      dispatch(updateMessage(""));
      navigate("/login");
    }
  }, [navigate, message, dispatch, state.email]);
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
        <section className="px-5 md:px-10 py-10 flex flex-col gap-10 md:gap-16 h-full justify-center items-center w-full md:w-2/5">
          <Link to="/" className="mx-auto">
            <img src={logo} alt="" className="" />
          </Link>
          <h3 className="text-2xl md:text-[32px] text-center font-bold">
            CHANGE PASSWORD!
          </h3>
          <form
            className="lato w-full flex flex-col  gap-7"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-1 w-full relative">
              <span className="flex items-center gap-1">Password</span>
              <input
                type={showP1 ? "text" : "password"}
                placeholder="Enter Password"
                className="h-12 px-5 z-10 w-full outline-none rounded border border-secondary bg-inherit"
                value={state.password}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowP1(!showP1);
                }}
                className="absolute right-3 bottom-3 z-10"
              >
                {showP1 ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </button>
            </label>
            <label className="flex flex-col gap-1 w-full relative">
              <span className="flex items-center gap-1">Confirm Password</span>
              <input
                type={showP2 ? "text" : "password"}
                placeholder="Enter Password"
                className="h-12 px-5 z-10 w-full outline-none rounded border border-secondary bg-inherit"
                value={state.confirm_password}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    confirm_password: e.target.value,
                  }))
                }
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowP2(!showP2);
                }}
                className="absolute right-3 bottom-3 z-10"
              >
                {showP2 ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </button>
            </label>
            <button
              className={`text-primary w-full text-lg flex items-center justify-center relative bg-secondary rounded-lg font-semibold h-12 transition-all duration-500 ease-in-out`}
            >
              Change Password
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

export default ChangePassword;
