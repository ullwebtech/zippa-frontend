import { useEffect, useState } from "react";
import start from "../assets/sad.jpeg";
import done from "../assets/delete.jpeg";
import { deleteAcct, verifyPin } from "../store/asyncActions/userAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage, isError } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import Modal from "../utils/Modal";
import OTPInput from "otp-input-react";
import { Logout } from "../utils/Logout";

export default function Start() {
  const [showModal, setShowModal] = useState(false);
  const [sent, setSent] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  const [state, setState] = useState({
    email: "",
    reason: "",
  });
  const handleShow = (e) => {
    e.preventDefault();
    if (state.email && state.reason) {
      setShowModal(true);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <>
      {!sent && (
        <main className="flex flex-col md:grid grid-cols-2 grid-rows-1 items-center">
          <figure className="w-full h-full">
            <img src={start} alt="" className="w-full h-full object-cover" />
          </figure>
          <div className="flex flex-col gap-14 py-10 md:py-20 px-5 md:px-20">
            <h2 className="text-3xl md:text-[60px] font-[600] leading-tight text-primary">
              Sad To See You{" "}
              <b className="text-secondary font-[600] inline mr-3">Leave</b>
            </h2>
            <form className="w-full flex flex-col gap-7">
              <label className="flex flex-col gap-3 w-full">
                <span className="flex items-center gap-1 font-[600]">
                  Email Address
                </span>
                <input
                  type="email"
                  placeholder="john@email.com"
                  className="h-12 px-5 border z-10 w-full outline-none rounded-lg md:rounded-xl"
                  value={state.email}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="flex flex-col gap-3 w-full">
                <span className="flex items-center gap-1 font-[600]">
                  Reason For Deletion
                </span>
                <textarea
                  placeholder="Please let us know why you ae leaving us"
                  className="h-40 px-5 py-4 border z-10 w-full outline-none rounded-lg md:rounded-xl"
                  value={state.reason}
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      reason: e.target.value,
                    }))
                  }
                />
              </label>
              <button
                className={`font-[600] bg-primary text-white h-14 md:h-[70px] w-full rounded-lg md:rounded-xl px-5`}
                onClick={handleShow}
              >
                Continue
              </button>
            </form>
          </div>
          {showModal && (
            <Modal
              child={
                <Pin
                  setShowModal={setShowModal}
                  loading={loading}
                  state={state}
                  setSent={setSent}
                />
              }
            />
          )}
        </main>
      )}
      {sent && (
        <main className="min-h-screen bg-[#FFF3F6] px-5 py-10 md:py-20 flex justify-center  items-center flex-col gap-8 text-center">
          <img
            src={done}
            alt=""
            className="h-[300px] w-[300px] object-cover rounded-[50%]"
          />
          <h3 className="text-purple text-2xl md:text-3xl font-[600]">
            Your Account Deletion Is Being Processed, Sad To Loose You
          </h3>
          <p className="text-xl md:w-1/2 mx-auto">
            You have successfully activated account deletion. We are looking
            forward to getting you back and serving you better
          </p>
        </main>
      )}
    </>
  );
}

const Pin = ({ setShowModal, loading, state, setSent }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      const formDetails = new FormData();
      formDetails.append("pin", otp);
      formDetails.append("email", state.email);
      dispatch(verifyPin(formDetails));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.reason) {
      const formDetails = new FormData();
      formDetails.append("email", state.email);
      formDetails.append("reason", state.reason);
      dispatch(deleteAcct(formDetails));
    }
  };

  useEffect(() => {
    if (message === "User account deletion in process") {
      toast.success(message);
      setSent(true);
      setShowModal(false);
      dispatch(updateMessage(""));
      Logout("Deletion successful", "/register");
    }
  }, [message, dispatch, setSent, setShowModal]);

  useEffect(() => {
    if (message === "Pin verified") {
      toast.success(message);
      setVerified(true);
      dispatch(updateMessage(""));
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(isError(""));
    }
  }, [error, dispatch]);

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h2 className="text-3xl md:text-3xl font-[600] text-primary">
        {verified ? "Confirm Delete" : "Verify Your Pin"}
      </h2>
      {!verified && (
        <form className="lato w-full flex flex-col  gap-5 md:gap-10">
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
            }}
            className="flex gap-2 justify-center"
          />
          <button
            className={`text-white text-[18px] bg-primary rounded border border-secondary font-[600] md:px-16 py-2 ${
              loading ? "animate-pulse duration-500" : ""
            } `}
            type="submit"
            onClick={handleVerify}
          >
            VERIFY
          </button>
        </form>
      )}
      {verified && (
        <nav className="flex items-center justify-center gap-5 ">
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
              loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
          >
            Delete Account
          </button>
        </nav>
      )}
    </div>
  );
};
