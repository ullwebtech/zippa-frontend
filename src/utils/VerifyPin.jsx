import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "otp-input-react";
import { useEffect, useState } from "react";
import { updateMessage, isError } from "../store/slices/userSlice";
import { verifyPin } from "../store/asyncActions/userAsyncActions";

export const VerifyPin = ({ verified, setVerified }) => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState("");
  const user = useSelector((state) => state.user.userDetails);
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (typeof +pin === "number" && pin.length === 4) {
      const formDetails = new FormData();
      formDetails.append("email", user?.email);
      formDetails.append("pin", pin);
      dispatch(verifyPin(formDetails));
    }
  }, [pin, dispatch, user]);

  useEffect(() => {
    if (message === "Pin verified") {
      dispatch(updateMessage(""));
      setVerified(true);
    }
  }, [message, dispatch, setVerified]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(isError(""));
    }
  }, [error, dispatch]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <p className="text-center">Enter Transaction Pin</p>
      <form className="w-full flex flex-col items-center gap-5 md:gap-10">
        <OTPInput
          value={pin}
          onChange={setPin}
          autoFocus={false}
          OTPLength={4}
          secure
          otpType="number"
          disabled={verified}
          inputStyles={{
            border: "1px solid #8F8F8F",
            background: "inherit",
            height: "40px",
            width: "40px",
            fontSize: "20px",
            borderRadius: "8px",
          }}
          className="flex gap-1 justify-center "
        />
      </form>
    </div>
  );
};
