import close from "../../../assets/icons/close.svg";
import { useState } from "react";
import CustomInput from "../../../utils/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { updateThriftState } from "../../../store/slices/thriftSlice";

export const WithdrawAmount = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const thriftTotal = useSelector((state) => state.thrift.thriftTotal);
  const [amount, setAmount] = useState("");
  const handleSubmit = () => {
    if (thriftTotal < amount) {
      return toast.error("Insufficient balance");
    }
    dispatch(
      updateThriftState({
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
      <h3 className="text-xl font-medium">Withdraw Thrift</h3>
      <p>Withdraw at any point in time.</p>
      <CustomInput
        name="Enter amount"
        value={amount}
        setValue={setAmount}
        type="number"
      />
      <nav className="flex items-center justify-between">
        <span className="text-tg">Thrift Balance: ₦{thriftTotal}</span>
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
