import close from "../../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { isError, updateMessage } from "../../../store/slices/lockSlice";
import {
  createKidLock,
  createKidLockCard,
  createKidLockNewCard,
} from "../../../store/asyncActions/lockAsyncActions";
import PaystackPop from "@paystack/inline-js";
import { Keys } from "../../../utils/Keys";
import { FundSource } from "../../../utils/FundSource";
import CustomInput from "../../../utils/CustomInput";
import DayOfMonth from "../../../utils/DayOfMonth";
import { VerifyPin } from "../../../utils/VerifyPin";

export const CreateKids = ({ setShowModal, nextStep, plan, amount }) => {
  const dispatch = useDispatch();

  const [terms, setTerms] = useState(false);
  const [auth, setAuth] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [dayOfMonth, setDayOfMonth] = useState("");
  const message = useSelector((state) => state.lock.message);
  const error = useSelector((state) => state.lock.error);
  const loading = useSelector((state) => state.lock.loading);
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
      amount: 10000 * 100,
      ref: `${ref}`,
      onSuccess: (transaction) => {
        const formDetails = new FormData();
        formDetails.append("plan", plan);
        formDetails.append("startDate", startDate);
        formDetails.append("dayOfMonth", dayOfMonth);
        formDetails.append("reference", transaction.trxref);
        dispatch(createKidLockNewCard(formDetails));
      },
      onCancel: () => {
        return toast.error("Transaction Cancelled");
      },
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!terms || !auth)
      return toast.error("You must accept terms and authorize Zippa to save");
    if (source === "") {
      return toast.error("Select a funding source");
    }
    if (source === "add") {
      return handleNewCard();
    }
    if (source === "card") {
      const formDetails = new FormData();
      formDetails.append("plan", plan);
      formDetails.append("startDate", startDate);
      formDetails.append("dayOfMonth", dayOfMonth);
      formDetails.append("card_id", cardDetails.id);
      dispatch(createKidLockCard(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("plan", plan);
      formDetails.append("startDate", startDate);
      formDetails.append("dayOfMonth", dayOfMonth);
      dispatch(createKidLock(formDetails));
    }
  };

  useEffect(() => {
    if (message === "Kid Lock Created Successfully") {
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

  const handleTermsChange = (e) => {
    if (e.target.checked) {
      setTerms(true);
    } else {
      setTerms(false);
    }
  };
  const handleAuthChange = (e) => {
    if (e.target.checked) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-xl font-medium">
        Smart Kiddies - <b className="uppercase">{plan}</b>
      </h3>
      <CustomInput
        name="Start Date"
        value={startDate}
        setValue={setStartDate}
        type="date"
      />
      <DayOfMonth setSelected={setDayOfMonth} />
      <FundSource
        source={source}
        setSource={setSource}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
      />
      <p className="text-primary">Term & conditions</p>
      <div className="flex flex-col gap-2">
        <p>
          Please note that the equivalent of the plan amount will be taken out
          of your wallet on a monthly basis.
        </p>
        <p>The registration is a one time fee.</p>
        <p className="text-red-500">
          If payment is defaulted, you will get only your 100% money back at the
          end of the year but no benefits.
        </p>
        <p className="text-green-500">
          If you complete all payment till the end of the year, Your 100%
          moneyback will be automatically deposited in your wallet. And you will
          receive all benefits attached to this plan.
        </p>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-5 w-5"
            onChange={handleTermsChange}
          />{" "}
          I accept the above terms and condition
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-5 w-5"
            onChange={handleAuthChange}
          />{" "}
          I authorize Zippa to deduct
          {amount} monthly from my wallet
        </label>
      </div>
      <VerifyPin verified={verified} setVerified={setVerified} />
      {verified && (
        <nav className="flex items-center justify-center gap-5 ">
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
              loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
          >
            Automate saving
          </button>
        </nav>
      )}
    </div>
  );
};
