import close from "../../../assets/icons/close.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFlexState } from "../../../store/slices/targetSlice";
import { toast } from "react-hot-toast";
import moment from "moment";
import { CustomAmount } from "../../../utils/CustomAmount";

export const WithdrawAmount = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const flexTotal = useSelector((state) => state.target.flexTotal);
  const withdrawDate = useSelector((state) => state.target.withdrawDate);
  const currentDate = moment().startOf("day");
  const due = moment(withdrawDate).startOf("day");

  const [amount, setAmount] = useState("");
  const handleSubmit = () => {
    if (flexTotal < amount) {
      return toast.error("Insufficient balance");
    }
    dispatch(
      updateFlexState({
        amount,
      })
    );
    nextStep();
  };

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-xl font-medium">Withdraw Flex</h3>
      {currentDate.isBefore(due) && (
        <p className="text-tg text-sm">
          You can only withdraw your Flex balance on minimum withdraw date (
          {new Date(withdrawDate).toLocaleDateString()}), withdrawing before the
          due date will attract a 1% charge.
        </p>
      )}
      <CustomAmount name="Enter amount" value={amount} setValue={setAmount} />
      <nav
        className="flex items-center justify-between"
        onClick={() => console.log(amount)}
      >
        <span className="text-tg">Flex Balance: ₦{flexTotal}</span>
        <span className="text-primary">Top Up </span>
      </nav>
      <nav className="flex items-center justify-center gap-5 ">
        <button
          className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary`}
          onClick={handleSubmit}
        >
          Continue
        </button>
      </nav>
    </div>
  );
};
