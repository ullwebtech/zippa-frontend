import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.svg";

import { resetMail } from "../store/asyncActions/userAsyncActions";
import { isError, updateMessage } from "../store/slices/userSlice";
import { errorStyle, successStyle } from "../utils/ToastStyle";
import ScrollToTop from "../layout/Scroll";

function ResetMail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const [state, setState] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email) {
      localStorage.setItem("reset", JSON.stringify({ email: state.email }));
      const formDetails = new FormData();
      formDetails.append("email", state.email);
      dispatch(resetMail(formDetails));
    }
  };

  const notifySuccess = (msg) => toast.success(msg, successStyle);
  const notifyFail = (err) => toast.error(err, errorStyle);

  useEffect(() => {
    if (message && message === "Password reset code sent to user email") {
      notifySuccess(message);
      navigate("/verify-code");
      dispatch(updateMessage(""));
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
            RESET YOUR PASSWORD!
          </h3>
          <form
            className="lato w-full flex flex-col  gap-10"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter Email"
              className="h-12 px-5 z-10 w-full outline-none rounded border border-secondary bg-inherit"
              value={state.email}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
            <button
              className={`text-primary w-full text-lg flex items-center justify-center relative bg-secondary rounded-lg font-semibold h-12 transition-all duration-500 ease-in-out`}
            >
              Reset Password
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

export default ResetMail;
