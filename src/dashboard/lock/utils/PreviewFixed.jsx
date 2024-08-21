import { useDispatch, useSelector } from "react-redux";
import close from "../../../assets/icons/close.svg";
import { FaArrowLeft } from "react-icons/fa";
import autos from "../../../assets/auto.png";
import { isError, updateMessage } from "../../../store/slices/lockSlice";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  createFixedLock,
  createFixedLockCard,
  createFixedLockNewCard,
} from "../../../store/asyncActions/lockAsyncActions";
import PaystackPop from "@paystack/inline-js";
import { Keys } from "../../../utils/Keys";
import { FundSource } from "../../../utils/FundSource";
import { VerifyPin } from "../../../utils/VerifyPin";

export const PreviewFixed = ({ setShowModal, nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const [terms, setTerms] = useState(false);
  const [auth, setAuth] = useState(false);
  const lockState = useSelector((state) => state.lock.lockState);
  const message = useSelector((state) => state.lock.message);
  const error = useSelector((state) => state.lock.error);
  const loading = useSelector((state) => state.lock.loading);
  const user = useSelector((state) => state.user.userDetails);
  const [source, setSource] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [verified, setVerified] = useState(false);

  const paystack = new PaystackPop();
  // end date is 1 year from current date
  const now = new Date();
  const endDate = new Date(now.setFullYear(now.getFullYear() + 1));
  function handleNewCard() {
    const ref = Math.floor(Math.random() * 1000000000);

    paystack.newTransaction({
      key: Keys?.key,
      email: user?.email,
      amount: lockState.amount * 100,
      ref: `${ref}`,
      onSuccess: (transaction) => {
        const formDetails = new FormData();
        formDetails.append("title", lockState.title);
        formDetails.append("amount", lockState.amount);
        // formDetails.append("endDate", lockState.end);
        formDetails.append("reference", transaction.trxref);
        dispatch(createFixedLockNewCard(formDetails));
      },
      onCancel: () => {
        return toast.error("Transaction Cancelled");
      },
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!terms || !auth)
      return toast.error(
        "You must accept terms and authorize Zippa to Benefit save"
      );
    if (source === "") {
      return toast.error("Select a funding source");
    }
    if (source === "add") {
      return handleNewCard();
    }
    if (source === "card") {
      const formDetails = new FormData();
      formDetails.append("title", lockState.title);
      formDetails.append("amount", lockState.amount);
      // formDetails.append("endDate", lockState.end);
      formDetails.append("card_id", cardDetails.id);
      dispatch(createFixedLockCard(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("title", lockState.title);
      formDetails.append("amount", lockState.amount);
      // formDetails.append("endDate", lockState.end);
      dispatch(createFixedLock(formDetails));
    }
  };

  useEffect(() => {
    if (message === "Fixed Lock Created Successfully") {
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
      <FaArrowLeft
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={prevStep}
      />
      <h3 className="text-xl font-medium text-primary">Preview Autosave</h3>
      <SingleDet
        title={lockState?.title}
        amount={lockState?.amount}
        end={endDate}
      />
      <div className="grid grid-cols-2 gap-5">
        <Single title="Fixed deposit" value={`₦${lockState?.amount}`} />
        <Single
          title="Interest per annum"
          value={`₦${(22 / 100) * lockState?.amount}`}
        />
        <Single title="Start Date" value={new Date().toLocaleDateString()} />
        <Single title="Payback Date" value={endDate.toLocaleDateString()} />
      </div>

      <FundSource
        source={source}
        setSource={setSource}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-5 w-5"
          onChange={handleTermsChange}
        />{" "}
        I authorize Zippa to Lock ₦{lockState?.amount} immediately and return it
        in full on {endDate.toLocaleDateString()} to my Zippa wallet. I confirm
        and approve this transaction
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-5 w-5"
          onChange={handleAuthChange}
        />{" "}
        I authorize Zippa to Lock ₦{lockState?.amount} I hereby acknowledge that
        the lock cannot be broken once it has been created
      </label>
      <VerifyPin verified={verified} setVerified={setVerified} />
      {verified && (
        <nav className="flex items-center justify-center gap-5 ">
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
              loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
          >
            Create fixed deposit
          </button>
        </nav>
      )}
    </div>
  );
};

const Single = ({ title, value }) => {
  return (
    <nav className="w-full bg-[#EDEDED] flex flex-col p-4 rounded-xl gap-2">
      <p className="text-sm">{title}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </nav>
  );
};

const SingleDet = ({ title, amount, end }) => {
  const diff = end - new Date();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <div className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm">
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title}</p>
        <nav className="flex justify-between gap-10">
          <nav className="flex flex-col gap-2">
            <b className="font-semibold">N{amount}</b>
            <p>Locked</p>
          </nav>
          {/* <nav className="flex flex-col gap-2 text-end">
            <b className="font-semibold">N{target}</b>
            <p>Target</p>
          </nav> */}
        </nav>
        <span className="flex item-start justify-end w-full h-2 rounded-xl bg-[#D9D9D9]">
          <span
            className={`bg-[#01C853] h-full rounded-xl flex`}
            style={{
              width: `${0}%`,
            }}
          ></span>
        </span>
        <p>{days} days left</p>
      </nav>
    </div>
  );
};
