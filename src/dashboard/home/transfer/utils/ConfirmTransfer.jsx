import close from "../../../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { isError, updateMessage } from "../../../../store/slices/walletSlice";
import {
  initiateTransfer,
  verifyTransfer,
} from "../../../../store/asyncActions/walletAsyncActions";
import random from "random-string-generator";
import { VerifyPin } from "../../../../utils/VerifyPin";

export const ConfirmTransfer = ({
  setShowModal,
  nextStep,
  amount,
  description,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.wallet.loading);
  const message = useSelector((state) => state.wallet.message);
  const error = useSelector((state) => state.wallet.error);
  const trState = useSelector((state) => state.wallet.transferState);
  const trDetails = useSelector((state) => state.wallet.transferDetails);
  const [verified, setVerified] = useState(false);
  const reference = random(18, "alphanumeric");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = new FormData();
    formDetails.append("description", description);
    formDetails.append("amount", amount);
    formDetails.append("reference", reference);
    formDetails.append("recipient_code", trState?.recipient_code);
    dispatch(initiateTransfer(formDetails));
  };

  useEffect(() => {
    if (message === "Transfer Initiated Successfully") {
      nextStep();
      const formDetails = new FormData();
      formDetails.append("reference", trDetails?.reference);
      dispatch(verifyTransfer(formDetails));
      dispatch(updateMessage(""));
    }
  }, [message, dispatch, trDetails, nextStep]);

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
      <h3 className="text-xl font-medium">CONFIRM TRANSFER</h3>
      <div className="flex flex-col gap-3 divide-y-2 text-sm font-medium">
        <div className="flex justify-between items-center py-2 px-3">
          <h3 className="">Amount</h3>
          <p className="">₦{amount}</p>
        </div>
        <div className="flex justify-between items-center py-2 px-3">
          <h3 className="">Description</h3>
          <p className="">{description}</p>
        </div>
        <div className="flex justify-between items-center py-2 px-3">
          <h3 className="">Beneficiary Bank</h3>
          <p className="">{trState?.details?.bank_name}</p>
        </div>
        <div className="flex justify-between items-center py-2 px-3">
          <h3 className="">Beneficiary Details</h3>
          <div className="flex flex-col gap-1 text-right">
            <p className="">{trState?.details?.account_name}</p>
            <p className="">{trState?.details?.account_number}</p>
          </div>
        </div>
      </div>
      <VerifyPin verified={verified} setVerified={setVerified} />
      {verified && (
        <nav className="flex items-center justify-center gap-5 ">
          <button
            className={`text-white text-lg flex items-center justify-center relative bg-primary rounded-lg font-semibold px-10 w-full h-12 transition-all duration-500 ease-in-out`}
            onClick={handleSubmit}
          >
            Confirm Transfer
            {loading && (
              <div className="w-5 h-5 absolute right-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
            )}
          </button>
        </nav>
      )}
    </div>
  );
};
