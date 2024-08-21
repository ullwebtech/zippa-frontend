import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.svg";
import OTPInput from "otp-input-react";
import { errorStyle, successStyle } from "../utils/ToastStyle";
import ScrollToTop from "../layout/Scroll";
import { createPin } from "../store/asyncActions/userAsyncActions";
import { isError } from "../store/slices/userSlice";

function ConfirmPin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirm = useSelector((state) => state.user.pin);
  const [pin, setPin] = useState("");
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const notifyFail = (err) => toast.error(err, errorStyle);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof +pin !== "number" || +pin !== +confirm) {
      notifyFail("Pin does not match. Please try again.");
      return;
    }
    if (pin) {
      const formDetails = new FormData();
      formDetails.append("pin", pin);
      dispatch(createPin(formDetails));
    }
  };

  const notifySuccess = (msg) => toast.success(msg, successStyle);

  useEffect(() => {
    if (message === "Pin created successfully") {
      notifySuccess(message);
      navigate("/dashboard/home");
    }
  }, [navigate, message]);
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
            CONFIRM PIN
          </h3>
          <p className="text-center">Enter Transaction Pin Again</p>
          <form
            className="lato w-full flex flex-col  gap-5 md:gap-10"
            onSubmit={handleSubmit}
          >
            <OTPInput
              value={pin}
              onChange={setPin}
              autoFocus
              secure
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
            <button
              className={`text-primary w-full text-lg flex items-center justify-center relative bg-secondary rounded-lg font-semibold h-12 transition-all duration-500 ease-in-out`}
            >
              Continue
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

export default ConfirmPin;
