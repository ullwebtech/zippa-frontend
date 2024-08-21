import close from "../../../assets/icons/close.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFlexState } from "../../../store/slices/targetSlice";
import { toast } from 'react-hot-toast';
import { CustomAmount } from "../../../utils/CustomAmount";

export const TopupFlex = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const handleSubmit = () => {
    if (amount === "") {
      return toast.error("Fill all fields");
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
      <h3 className="text-xl font-medium">Top up Flex Save</h3>
      <p>Save and withdraw at any point in time.</p>
      <CustomAmount
        name="Enter amount"
        value={amount}
        setValue={setAmount}
      />
      <nav className="flex items-center justify-center gap-5 ">
        <button
          className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary`}
          onClick={handleSubmit}
        >
          Top up savings
        </button>
      </nav>
    </div>
  );
};
