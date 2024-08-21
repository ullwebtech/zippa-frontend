import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isError, updateMessage } from "../store/slices/userSlice";
import ScrollToTop from "../layout/Scroll";
import { successStyle, errorStyle } from "../utils/ToastStyle";
import { register } from "../store/asyncActions/userAsyncActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const [showP1, setShowP1] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.name && state.password) {
      const formDetails = new FormData();
      formDetails.append("name", state.name);
      formDetails.append("email", state.email);
      formDetails.append("phone", state.phone);
      formDetails.append("password", state.password);
      dispatch(register(formDetails));
    }
  };

  const notifySuccess = (msg) => toast.success(msg, successStyle);
  const notifyFail = (err) => toast.error(err, errorStyle);

  useEffect(() => {
    if (message === "Verification code sent to user email") {
      notifySuccess(message);
      dispatch(updateMessage(""));
      navigate("/confirm-registration");
    }
  }, [navigate, message, dispatch]);
  useEffect(() => {
    if (error) {
      notifyFail(error);
      dispatch(isError(""));
    }
  }, [error, dispatch]);

  return (
    <main className="">
      <ScrollToTop />
      <main className="min-h-screen flex justify-center items-center px-5 py-20 ">
        <section className="px-5 md:px-10 py-10 md:py-16 rounded-3xl md:rounded-[70px] bg-[#EAECFF] w-full md:w-2/5 flex flex-col gap-5 justify-center items-center text-primary md:text-lg">
          <Link to="/" className="mx-auto">
            <img src={logo} alt="" className="" />
          </Link>
          <h3 className="text-2xl md:text-[32px] text-center font-bold">
            REGISTER!
          </h3>
          <form
            className="lato flex flex-col gap-5 w-3/4 text-sm"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-1 w-full">
              <input
                type="text"
                placeholder="John Doe"
                className="h-12 px-5 z-10 w-full outline-none rounded border border-[#919AFF] bg-inherit"
                value={state.name}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-1 w-full">
              <input
                type="email"
                placeholder="johndoe@gmail.com"
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
            <label className="flex flex-col gap-1 w-full">
              <input
                type="tel"
                placeholder="09012345678"
                className="h-12 px-5 z-10 w-full outline-none rounded border border-[#919AFF] bg-inherit"
                value={state.phone}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-1 w-full relative">
              <input
                type={showP1 ? "text" : "password"}
                placeholder="********"
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
            <label className="flex flex-col items-center gap-5 z-20 mx-auto mt-5 w-full">
              <button
                className={`text-white text-lg w-full flex items-center justify-center relative bg-primary rounded-lg font-semibold h-12 transition-all duration-500 ease-in-out`}
              >
                Sign Up
                {loading && (
                  <div className="w-5 h-5 absolute right-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                )}
              </button>
              <button
                className={`text-primary w-full bg-inherit font-[600] md:px-16`}
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            </label>
          </form>
        </section>
      </main>
    </main>
  );
}

export default Register;
