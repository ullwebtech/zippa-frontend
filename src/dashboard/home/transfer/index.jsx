import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BankSelect from "./utils/BankSelect";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  isError,
  updateMessage,
  updateTransferDetails,
} from "../../../store/slices/walletSlice";
import { useEffect } from "react";
import {
  createTransferReceipt,
  verifyAcct,
} from "../../../store/asyncActions/walletAsyncActions";
export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.wallet.loading);
  const message = useSelector((state) => state.wallet.message);
  const error = useSelector((state) => state.wallet.error);
  const trDetails = useSelector((state) => state.wallet.transferDetails);
  const [bank, setBank] = useState(null);
  const [acctNo, setAcctNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acctNo.length < 10) {
      toast.error("Account number must be 10 digits");
      return;
    }
    if (!bank) {
      toast.error("Select a bank");
      return;
    }
    const formDetails = new FormData();
    formDetails.append("name", trDetails?.account_name);
    formDetails.append("acctNo", acctNo);
    formDetails.append("bankCode", bank.value);
    dispatch(createTransferReceipt(formDetails));
  };
  
  useEffect(() => {
    if (bank && bank.value && acctNo.length === 10) {
      const formDetails = new FormData();
      formDetails.append("acctNo", Number(acctNo));
      formDetails.append("bankCode", bank.value);
      dispatch(verifyAcct(formDetails));
    } else {
      dispatch(updateTransferDetails({}));
    }
  }, [bank, acctNo, dispatch]);

  useEffect(() => {
    if (message === "Receiver created Successfully") {
      navigate("/dashboard/home/send-money/complete");
      dispatch(updateMessage(""));
    }
  }, [navigate, message, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(isError(""));
    }
  }, [error, dispatch]);

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Send Money
      </b>
      <div className="h-full py-10 md:py-20 flex flex-col items-center justify-center gap-10">
        <div className="w-1/2 bg-[#D9D9D9] flex flex-col gap-10 p-10 rounded-2xl">
          <h3
            className="text-2xl font-semibold mx-auto text-center"
            onClick={() => console.log(bank)}
          >
            Send money to bank account
          </h3>
          <form className="flex flex-col w-full gap-5">
            <label className="flex flex-col gap-2">
              <span>Account Number</span>
              <input
                type="number"
                value={acctNo}
                onChange={(e) => setAcctNo(e.target.value)}
                className="h-10 px-3 bg-white w-full rounded outline-none text-sm"
                placeholder="Enter account number"
                minLength={10}
              />
            </label>
            <BankSelect setBank={setBank} bank={bank} />
            {trDetails && trDetails?.account_name && (
              <span className="font-semibold text-secondary text-lg">
                {trDetails?.account_name}
              </span>
            )}
            {trDetails?.account_name && (
              <button
                className={`text-white text-lg flex items-center justify-center relative bg-primary rounded-lg font-semibold h-12 transition-all duration-500 ease-in-out`}
                onClick={handleSubmit}
              >
                Continue
                {loading && (
                  <div className="w-5 h-5 absolute right-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
