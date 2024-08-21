import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../../utils/DropDown";
import close from "../../../assets/icons/close.svg";
import PaystackPop from "@paystack/inline-js";
import { Keys } from "../../../utils/Keys";
import { FundSource } from "../../../utils/FundSource";
import toast from "react-hot-toast";
import {
  isError,
  updateMessage,
  updateMeter,
} from "../../../store/slices/billsSlice";
import {
  buyElectricity,
  verifyMeter,
} from "../../../store/asyncActions/billsAsyncActions";
import { VerifyPin } from "../../../utils/VerifyPin";

export const Electricity = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const meter = useSelector((state) => state.bills.meter);
  const [disco, setDisco] = useState("");
  const [meterType, setMeterType] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [check, setCheck] = useState(false);
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
        formDetails.append("billersCode", meterNumber);
        formDetails.append("serviceID", disco);
        formDetails.append("variation_code", meterType);
        formDetails.append("amount", amount);
        formDetails.append("phone", "08036923643");
        formDetails.append("method", "newCard");
        formDetails.append("reference", transaction.trxref);
        dispatch(buyElectricity(formDetails));
      },
      onCancel: () => {
        return toast.error("Transaction Cancelled");
      },
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      disco === "" ||
      meterType === "" ||
      meterNumber === "" ||
      amount === ""
    ) {
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
      formDetails.append("billersCode", meterNumber);
      formDetails.append("serviceID", disco);
      formDetails.append("variation_code", meterType);
      formDetails.append("amount", amount);
      formDetails.append("phone", "08036923643");
      formDetails.append("method", "card");
      formDetails.append("card_id", cardDetails.id);
      dispatch(buyElectricity(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("billersCode", meterNumber);
      formDetails.append("serviceID", disco);
      formDetails.append("variation_code", meterType);
      formDetails.append("amount", amount);
      formDetails.append("phone", "08036923643");
      formDetails.append("method", "wallet");
      dispatch(buyElectricity(formDetails));
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
    if (meter) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [meter, dispatch]);

  useEffect(() => {
    if (disco && meterType && meterNumber.length > 9) {
      const formDetails = new FormData();
      formDetails.append("billersCode", meterNumber);
      formDetails.append("serviceID", disco);
      formDetails.append("type", meterType);
      dispatch(verifyMeter(formDetails));
    } else {
      dispatch(updateMeter(null));
    }
  }, [meterNumber, disco, meterType, dispatch]);

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-xl font-medium">BUY ELECTRICITY</h3>
      <p>Please select your disco and enter the meter number</p>
      <DropDown
        items={[
          "ikeja-electric",
          "eko-electric",
          "kano-electric",
          "portharcourt-electric",
          "jos-electric",
          "ibadan-electric",
          "kaduna-electric",
          "abuja-electric",
          "enugu-electric",
          "benin-electric",
          "aba-electric",
          "yola-electric",
        ]}
        placeholder="Select disco provider"
        selected={disco}
        setSelected={setDisco}
      />
      <DropDown
        items={["prepaid", "postpaid"]}
        placeholder="Select meter type"
        selected={meterType}
        setSelected={setMeterType}
      />
      <label className="flex flex-col gap-1 bg-white rounded p-3">
        <span className="">Meter Number</span>
        <input
          type="text"
          value={meterNumber}
          onChange={(e) => setMeterNumber(e.target.value)}
          className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
        />
      </label>
      {meter && (
        <div className="flex gap-4 text-sm">
          <span className="">{meter?.Customer_Name}</span>
          <span className="">{meter?.Address}</span>
        </div>
      )}
      {check && (
        <div className="w-full flex flex-col gap-5 md:gap-8">
          <label className="flex flex-col gap-1 bg-white rounded p-3">
            <span className="">Amount</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
      )}
    </div>
  );
};
