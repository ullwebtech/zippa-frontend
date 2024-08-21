import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.svg";
import OTPInput from "otp-input-react";
import { updatePin } from "../store/slices/userSlice";
import { errorStyle } from "../utils/ToastStyle";
import ScrollToTop from "../layout/Scroll";

function CreatePin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const notifyFail = (err) => toast.error(err, errorStyle);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof +pin !== "number" || pin.length !== 4) {
      notifyFail("Please enter a valid pin");
      return;
    }
    if (pin) {
      dispatch(updatePin(pin));
      navigate("/confirm-pin");
    }
  };

  return (
    <main>
      <ScrollToTop />
      <main className="min-h-screen flex justify-center items-center px-5 py-20 bg-primary text-white">
        <section className="px-5 md:px-10 py-10 flex flex-col gap-10 md:gap-16 h-full justify-center items-center w-full md:w-2/5">
          <Link to="/" className="mx-auto">
            <img src={logo} alt="" className="" />
          </Link>
          <h3 className="text-2xl md:text-[32px] text-center font-bold">
            SET PIN
          </h3>
          <p className="text-center">Enter Transaction Pin</p>
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
            </button>
          </form>
        </section>
      </main>
    </main>
  );
}

export default CreatePin;
