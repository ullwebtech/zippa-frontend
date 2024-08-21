import { useEffect, useState } from "react";
import DropDown from "../../../utils/DropDown";
import { useDispatch, useSelector } from "react-redux";
import close from "../../../assets/icons/close.svg";
import PaystackPop from "@paystack/inline-js";
import { Keys } from "../../../utils/Keys";
import { FundSource } from "../../../utils/FundSource";
import toast from "react-hot-toast";
import {
  isError,
  updateDecoder,
  updateMessage,
} from "../../../store/slices/billsSlice";
import {
  getCableVariations,
  subscribeCable,
  verifyDecoder,
} from "../../../store/asyncActions/billsAsyncActions";
import { VerifyPin } from "../../../utils/VerifyPin";

export const Cable = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.bills.cableVariations);
  const decoder = useSelector((state) => state.bills.decoder);
  const [provider, setProvider] = useState("");
  const [plan, setPlan] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [check, setCheck] = useState(false);
  const [change, setChange] = useState("");
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
        formDetails.append("billersCode", customerNumber);
        formDetails.append("serviceID", provider);
        formDetails.append("variation_code", plan);
        formDetails.append(
          "amount",
          change === "renew" ? decoder?.Renewal_Amount : amount
        );
        formDetails.append("phone", "08036923643");
        formDetails.append("change", change);
        formDetails.append("method", "newCard");
        formDetails.append("reference", transaction?.trxref);
        dispatch(subscribeCable(formDetails));
      },
      onCancel: () => {
        return toast.error("Transaction Cancelled");
      },
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      customerNumber === "" ||
      amount === "" ||
      provider === "" ||
      change === ""
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
      formDetails.append("billersCode", customerNumber);
      formDetails.append("serviceID", provider);
      formDetails.append("variation_code", plan);
      formDetails.append(
        "amount",
        change === "renew" ? decoder?.Renewal_Amount : amount
      );
      formDetails.append("phone", "08036923643");
      formDetails.append("change", change);
      formDetails.append("method", "card");
      formDetails.append("card_id", cardDetails?.id);
      dispatch(subscribeCable(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("billersCode", customerNumber);
      formDetails.append("serviceID", provider);
      formDetails.append("variation_code", plan);
      formDetails.append(
        "amount",
        change === "renew" ? decoder?.Renewal_Amount : amount
      );
      formDetails.append("phone", "08036923643");
      formDetails.append("change", change);
      formDetails.append("method", "wallet");
      dispatch(subscribeCable(formDetails));
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
    if (decoder) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [decoder]);

  useEffect(() => {
    if (change === "renew") {
      setAmount(decoder?.Renewal_Amount);
    }
  }, [change, decoder]);

  useEffect(() => {
    if (provider && customerNumber.length > 9) {
      const formDetails = new FormData();
      formDetails.append("billersCode", customerNumber);
      formDetails.append("serviceID", provider);
      dispatch(verifyDecoder(formDetails));
    } else {
      dispatch(updateDecoder(null));
    }
  }, [provider, customerNumber, dispatch]);

  useEffect(() => {
    if (provider) {
      dispatch(getCableVariations(provider));
    }
  }, [provider, dispatch]);

  useEffect(() => {
    if (plan) {
      const selectedPlan = plans.find((item) => item.name === plan);
      if (selectedPlan) {
        setAmount(selectedPlan?.variation_amount);
        setPlan(selectedPlan?.variation_code);
      }
    }
  }, [plan, plans, decoder]);

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-xl font-medium">PAY YOUR CABLE SUBSCRIPTION</h3>
      <p>Please select your cable provider and enter the customer number</p>
      <DropDown
        items={["dstv", "gotv", "startimes", "showmax"]}
        placeholder="Select cable provider"
        selected={provider}
        setSelected={setProvider}
      />
      <label className="flex flex-col gap-1 bg-white rounded p-3">
        <span className="">UID/Decoder Number</span>
        <input
          type="text"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
        />
      </label>
      {decoder && (
        <div className="flex gap-4 text-sm flex-wrap">
          <span className="">Name: {decoder?.Customer_Name}</span>
          <span className="">Current Bouquet: {decoder?.Current_Bouquet}</span>
          <span className="">Due Date: {decoder?.Due_Date}</span>
          <span className="">Renewal Amount: {decoder?.Renewal_Amount}</span>
        </div>
      )}
      <DropDown
        items={["renew", "change"]}
        placeholder="Select subscription option"
        selected={change}
        setSelected={setChange}
      />
      {check && (
        <div className="flex flex-col gap-5 md:gap-6">
          {change === "renew" ? (
            <label className="flex flex-col gap-1 bg-white rounded p-3">
              <span className="">Amount</span>
              <input
                type="text"
                value={decoder?.Renewal_Amount}
                disabled
                className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
              />
            </label>
          ) : (
            <div className="w-full flex flex-col gap-5 md:gap-8">
              <DropDown
                items={plans.map((item) => item.name)}
                placeholder="Select plan"
                selected={plan}
                setSelected={setPlan}
              />
              <label className="flex flex-col gap-1 bg-white rounded p-3">
                <span className="">Amount</span>
                <input
                  type="text"
                  value={amount}
                  disabled
                  className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
                />
              </label>
            </div>
          )}
          <FundSource
            source={source}
            setSource={setSource}
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
          />{" "}
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
