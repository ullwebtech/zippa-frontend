import { useDispatch, useSelector } from "react-redux";
import close from "../../../assets/icons/close.svg";
import { useEffect, useState } from "react";
import { isError, updateMessage } from "../../../store/slices/targetSlice";
import { toast } from "react-hot-toast";
import { withdrawFlex } from "../../../store/asyncActions/targetAsyncActions";
import { VerifyPin } from "../../../utils/VerifyPin";

export const Withdraw = ({ setShowModal, nextStep, setStep }) => {
  const dispatch = useDispatch();
  const flexState = useSelector((state) => state.target.flexState);
  const message = useSelector((state) => state.target.message);
  const error = useSelector((state) => state.target.error);
  const loading = useSelector((state) => state.target.loading);
  const [verified, setVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = new FormData();
    formDetails.append("amount", +flexState?.amount);
    dispatch(withdrawFlex(formDetails));
  };

  useEffect(() => {
    if (message === "Flex Withdrawn Successfully") {
      toast.success(message);
      dispatch(updateMessage(""));
      nextStep();
    }
  }, [message, dispatch, nextStep]);

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
      <h3 className="text-xl font-medium">Withdraw ₦{flexState?.amount}</h3>
      <p>Are you sure you want to withdraw savings?</p>
      <VerifyPin verified={verified} setVerified={setVerified} />
      <nav className="flex flex-col items-center justify-center gap-5 ">
        {verified && (
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
              loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
          >
            Yes, Withdraw
          </button>
        )}
        <button
          className={`w-full h-14 font-medium text-primary border border-primary rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-inherit ${
            loading ? "animate-pulse" : ""
          }`}
          onClick={() => {
            setShowModal(false);
            setStep(1);
          }}
        >
          No, Cancel
        </button>
      </nav>
    </div>
  );
};
