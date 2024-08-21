import { useDispatch, useSelector } from "react-redux";
import close from "../../../assets/icons/close.svg";
import { useEffect, useState } from "react";
import { isError, updateMessage } from "../../../store/slices/targetSlice";
import { toast } from "react-hot-toast";
import {
  topupFlex,
  topupFlexCard,
  topupFlexNewCard,
} from "../../../store/asyncActions/targetAsyncActions";
import { FaArrowLeft } from "react-icons/fa";
import PaystackPop from "@paystack/inline-js";
import { Keys } from "../../../utils/Keys";
import { FundSource } from "../../../utils/FundSource";
import { VerifyPin } from "../../../utils/VerifyPin";

export const ConfirmFlex = ({ setShowModal, nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const flexState = useSelector((state) => state.target.flexState);
  const message = useSelector((state) => state.target.message);
  const error = useSelector((state) => state.target.error);
  const loading = useSelector((state) => state.target.loading);

  const user = useSelector((state) => state.user.userDetails);
  const [source, setSource] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [verified, setVerified] = useState(false);

  const paystack = new PaystackPop();

  function handleNewCard() {
    const ref = Math.floor(Math.random() * 1000000000);

    paystack.newTransaction({
      key: Keys?.key,
      email: user?.email,
      amount: flexState?.amount * 100,
      ref: `${ref}`,
      onSuccess: (transaction) => {
        const formDetails = new FormData();
        formDetails.append("amount", flexState?.amount);
        formDetails.append("reference", transaction.trxref);
        dispatch(topupFlexNewCard(formDetails));
      },
      onCancel: () => {
        return toast.error("Transaction Cancelled");
      },
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (source === "") {
      return toast.error("Select a funding source");
    }
    if (source === "add") {
      return handleNewCard();
    }
    if (source === "card") {
      const formDetails = new FormData();
      formDetails.append("amount", flexState?.amount);
      formDetails.append("card_id", cardDetails.id);
      dispatch(topupFlexCard(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("amount", flexState?.amount);
      dispatch(topupFlex(formDetails));
    }
  };

  useEffect(() => {
    if (message === "Flex Topped Up Successfully") {
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
        disabled={loading}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <FaArrowLeft
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={prevStep}
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium">
          Top Up FLex ₦{flexState?.amount}
        </h3>
        <p>Are you sure you want to top up flex?</p>
      </div>
      <FundSource
        source={source}
        setSource={setSource}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
      />
      <VerifyPin verified={verified} setVerified={setVerified} />
      <nav className="flex flex-col items-center justify-center gap-5 ">
        {verified && (
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
              loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            Yes, Top Up
          </button>
        )}
        <button
          className={`w-full h-14 font-medium text-primary border border-primary rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-inherit ${
            loading ? "animate-pulse" : ""
          }`}
          onClick={() => setShowModal(false)}
          disabled={loading}
        >
          No, Cancel
        </button>
      </nav>
    </div>
  );
};
