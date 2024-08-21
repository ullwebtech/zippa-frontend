import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../../utils/DropDown";
import close from "../../../assets/icons/close.svg";
import {
  buyData,
  getDataVariations,
} from "../../../store/asyncActions/billsAsyncActions";
import PaystackPop from "@paystack/inline-js";
import { Keys } from "../../../utils/Keys";
import { FundSource } from "../../../utils/FundSource";
import toast from "react-hot-toast";
import { isError, updateMessage } from "../../../store/slices/billsSlice";
import { VerifyPin } from "../../../utils/VerifyPin";

export const Data = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.bills.dataVariations);
  const [network, setNetwork] = useState("");
  const [plan, setPlan] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const message = useSelector((state) => state.bills.message);
  const error = useSelector((state) => state.bills.error);
  const loading = useSelector((state) => state.bills.loading);
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
      amount: amount * 100,
      ref: `${ref}`,
      onSuccess: (transaction) => {
        const formDetails = new FormData();
        formDetails.append("phone", phoneNumber);
        formDetails.append("amount", amount);
        formDetails.append("serviceID", network);
        formDetails.append("variation_code", plan);
        formDetails.append("billersCode", "08036923643");
        formDetails.append("method", "newCard");
        formDetails.append("reference", transaction.trxref);
        dispatch(buyData(formDetails));
      },
      onCancel: () => {
        return toast.error("Transaction Cancelled");
      },
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber === "" || amount === "" || name === "" || plan === "") {
      return toast.error("All fields required");
    }
    if (source === "") {
      return toast.error("Select a funding source");
    }
    if (source === "add") {
      return handleNewCard();
    }
    if (source === "card") {
      const formDetails = new FormData();
      formDetails.append("phone", phoneNumber);
      formDetails.append("amount", amount);
      formDetails.append("serviceID", network);
      formDetails.append("variation_code", plan);
      formDetails.append("billersCode", "08036923643");
      formDetails.append("method", "card");
      formDetails.append("card_id", cardDetails.id);
      dispatch(buyData(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("phone", phoneNumber);
      formDetails.append("amount", amount);
      formDetails.append("serviceID", network);
      formDetails.append("variation_code", plan);
      formDetails.append("billersCode", "08036923643");
      formDetails.append("method", "wallet");
      dispatch(buyData(formDetails));
    }
  };

  useEffect(() => {
    if (message === "TRANSACTION SUCCESSFUL") {
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

  useEffect(() => {
    if (network) {
      dispatch(getDataVariations(network));
    }
  }, [network, dispatch]);

  useEffect(() => {
    if (name) {
      const selectedName = plans.find((item) => item.name === name);
      if (selectedName) {
        setAmount(selectedName.variation_amount);
        setPlan(selectedName.variation_code);
      }
    }
  }, [name, plans, plan]);

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-xl font-medium">DATA TOP UP</h3>
      <p>Please select a network and enter the recipient phone number</p>
      <DropDown
        items={["mtn-data", "glo-data", "airtel-data", "9mobile-data"]}
        placeholder="Select network"
        selected={network}
        setSelected={setNetwork}
      />
      <DropDown
        items={plans.map((item) => item.name)}
        placeholder="Select data plan"
        selected={name}
        setSelected={setName}
      />
      <label className="flex flex-col gap-1 bg-white rounded p-3">
        <span className="">Phone Number</span>
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 bg-white rounded p-3">
        <span className="">Amount</span>
        <input
          type="text"
          value={amount}
          disabled
          className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
        />
      </label>
      <FundSource
        source={source}
        setSource={setSource}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
      />
      <VerifyPin verified={verified} setVerified={setVerified} />
      {verified && (
        <nav className="flex items-center justify-center gap-5 ">
          <button
            className={`w-2/3 h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
              loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            Pay {amount}
          </button>
        </nav>
      )}
    </div>
  );
};
