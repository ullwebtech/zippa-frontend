import icon1 from "../../../assets/icons/icon8.svg";
import close from "../../../assets/icons/close.svg";
import CustomInput from "../../../utils/CustomInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  initiateTopup,
  verifyTopup,
} from "../../../store/asyncActions/walletAsyncActions";
import PaystackPop from "@paystack/inline-js";
import { isError, isLoading, updateMessage } from "../../../store/slices/walletSlice";
import { Keys } from "../../../utils/Keys";

export const FundWallet = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  const message = useSelector((state) => state.wallet.message);
  const error = useSelector((state) => state.wallet.error);
  const loading = useSelector((state) => state.wallet.loading);
  useEffect(() => {
    if (message === "Wallet Topup Successful") {
      toast.success("Wallet funded successfully");
      dispatch(updateMessage(""));
      nextStep();
    }
  }, [message, nextStep, dispatch]);

  const paystack = new PaystackPop();

  function handleClick() {
    if (!amount) return;
    dispatch(isLoading());
    const ref = Math.floor(Math.random() * 1000000000);

    const formDetails = new FormData();
    formDetails.append("amount", amount);
    formDetails.append("ref", `${ref}`);
    dispatch(initiateTopup(formDetails));

    paystack.newTransaction({
      key: Keys?.key,
      email: user?.email,
      amount: amount * 100,
      ref: `${ref}`,
      onSuccess: (transaction) => {
        console.log(transaction);
        const formDetails = new FormData();
        formDetails.append("saveCard", saveCard);
        dispatch(verifyTopup(transaction.trxref, formDetails));
      },
      onCancel: () => {
        return toast.error("Fund your wallet to access our offers :)");
      },
    });
  }

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
      <nav className="flex flex-col items-start gap-4">
        <img src={icon1} alt="" />
        <h3
          className="text-xl font-medium"
          onClick={() => console.log(saveCard)}
        >
          WALLET TOP-UP
        </h3>
      </nav>
      <CustomInput
        name="Enter amount"
        value={amount}
        setValue={setAmount}
        type="number"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="saveCard"
          onChange={(e) => {
            console.log(e.target);
            setSaveCard(e.target.checked);
          }}
          className="h-5 w-5"
        />
        <label htmlFor="saveCard">Save Card</label>
      </div>
      <nav className="flex items-center justify-center gap-5 ">
        <button
          className={`w-2/3 h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
            loading ? "animate-pulse" : ""
          }`}
          disabled={loading}
          onClick={handleClick}
        >
          Okay
        </button>
      </nav>
    </div>
  );
};


