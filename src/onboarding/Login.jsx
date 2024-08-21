import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/asyncActions/userAsyncActions";
import { isError, updateMessage, updateUser } from "../store/slices/userSlice";
import { errorStyle, successStyle } from "../utils/ToastStyle";
import { toast } from "react-hot-toast";
import ScrollToTop from "../layout/Scroll";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const [showP1, setShowP1] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      const formDetails = new FormData();
      formDetails.append("email", state.email);
      formDetails.append("password", state.password);
      dispatch(login(formDetails));
    }
  };
  const notifySuccess = (msg) => toast.success(msg, successStyle);
  const notifyFail = (err) => toast.error(err, errorStyle);

  useEffect(() => {
    if (message === "Login Successful") {
      notifySuccess(message);
      navigate("/dashboard/home");
      dispatch(updateMessage(""));
    }
  }, [navigate, message, dispatch, state.email]);

  useEffect(() => {
    if (error) {
      if (error === "User not verified, verification code sent to email") {
        dispatch(updateUser({ email: state.email }));
        navigate("/confirm-registration");
      }
      notifyFail(error);
      dispatch(isError(""));
    }
  }, [navigate, error, dispatch, state.email]);

  return (
    <main className="">
      <ScrollToTop />
      <main className="min-h-screen flex justify-center items-center px-5 py-20 ">
        <section className="px-5 md:px-10 py-10 md:py-16 rounded-3xl md:rounded-[70px] bg-[#EAECFF] w-full md:w-2/5 flex flex-col gap-5 justify-center items-center text-primary md:text-lg">
          <Link to="/" className="mx-auto">
            <img src={logo} alt="" className="" />
          </Link>
          <h3 className="text-2xl md:text-[32px] text-center font-bold">
            WELCOME!
          </h3>
          <form
            className="flex flex-col gap-5 md:w-3/4 text-sm"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-1 w-full">
              <input
                type="email"
                placeholder="john@gmail.com"
                className="h-12 px-5 z-10 w-full outline-none rounded border border-[#919AFF] bg-inherit"
                value={state.email}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-1 w-full relative">
              <input
                type={showP1 ? "text" : "password"}
                placeholder="PASSWORD"
                className="h-12 px-5 z-10 w-full outline-none rounded border border-[#919AFF] bg-inherit"
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
            <label className="flex flex-col gap-5 z-20 mx-auto mt-10 w-full">
              <button
                className={`text-white text-lg flex items-center justify-center relative bg-primary rounded-lg font-semibold h-12 transition-all duration-500 ease-in-out`}
              >
                <FaSignInAlt className="absolute left-4" />
                Sign in
                {loading && (
                  <div className="w-5 h-5 absolute right-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                )}
              </button>
              <nav className="flex justify-between items-center text-sm">
                <div
                  className="font-[500] cursor-pointer text-left"
                  onClick={() => navigate("/register")}
                >
                  CREATE ACCOUNT
                </div>
                <div
                  className="font-[500] cursor-pointer text-right"
                  onClick={() => navigate("/forgot-password")}
                >
                  FORGOT PASSWORD?
                </div>
              </nav>
            </label>
          </form>
        </section>
      </main>
    </main>
  );
}

export default Login;
