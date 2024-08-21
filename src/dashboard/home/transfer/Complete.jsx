import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { ConfirmTransfer } from "./utils/ConfirmTransfer";
import { Success } from "../../../utils/Success";
import Modal from "../../../utils/Modal";

export default function Complete() {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.wallet.loading);
  const wallet = useSelector((state) => state.wallet.wallet);
  const trState = useSelector((state) => state.wallet.transferState);
  const trDetails = useSelector((state) => state.wallet.transferDetails);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const nextStep = () => {
    console.log("got here")
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < 100) {
      toast.error("Minimum amount is 500");
      return;
    }
    if (!description) {
      toast.error("Add description");
      return;
    }
    setShowModal(true);
  };

  let child;
  switch (step) {
    case 1:
      child = (
        <ConfirmTransfer
          nextStep={nextStep}
          setShowModal={setShowModal}
          amount={amount}
          description={description}
        />
      );
      break;
    case 2:
      child = (
        <Success
          text={`Your transfer of ₦${trDetails?.amount / 100} to ${trDetails?.recipient?.details?.account_name} is on its way.`}
          setShowModal={setShowModal}
          setStep={setStep}
          slug="/dashboard/home"
        />
      );
      break;
    default:
      child = null;
  }

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </b>
      <div className="h-full py-10 md:py-20 flex flex-col items-center justify-center gap-10">
        <div className="flex gap-5 flex-col md:flex-row items-center">
          <nav className="flex flex-col gap-4 rounded-xl bg-primary p-6 text-white">
            <b className="text-lg">Wallet</b>
            <span className="">Total balance</span>
            <b className="text-lg">₦{wallet.amount || 0}</b>
          </nav>
          <FaArrowRight className="text-3xl text-primary" />
          <nav className="flex flex-col gap-4 rounded-xl border bg-white p-6">
            <b className="text-lg">{trState?.details?.account_name}</b>
            <span className="">{trState?.details?.bank_name}</span>
            <b className="text-lg">{trState?.details?.account_number}</b>
          </nav>
        </div>
        <div className="w-1/2 bg-[#D9D9D9] flex flex-col gap-10 p-10 rounded-2xl">
          <form className="flex flex-col w-full gap-5">
            <label className="flex flex-col gap-2">
              <span>Amount</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-10 px-3 bg-white w-full rounded outline-none text-sm"
                placeholder="Enter amount"
                min={500}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Description</span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-10 px-3 bg-white w-full rounded outline-none text-sm"
                placeholder="Enter description"
                minLength={4}
              />
            </label>
            {amount && description && (
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
      {showModal && <Modal child={child} />}
    </main>
  );
}
