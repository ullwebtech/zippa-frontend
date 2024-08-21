import close from "../../../assets/icons/close.svg";
import { useState } from "react";
import CustomInput from "../../../utils/CustomInput";
import { useDispatch} from "react-redux";
import { updateLockState } from "../../../store/slices/lockSlice";
import { toast } from "react-hot-toast";
import { CustomAmount } from "../../../utils/CustomAmount";

export const CreateFixed = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();

  const [title, setValue] = useState("");
  const [amount, setAmount] = useState("");
  // const [end, setEnd] = useState("");

  const handleSubmit = () => {
    if (!title || !amount) {
      return toast.error("All fields are required");
    }
    dispatch(
      updateLockState({
        title,
        amount,
        // end,
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
      <h3 className="text-xl font-medium">Create a fixed deposit</h3>
      <p>Create a save that proects you from temptation</p>
      <CustomInput
        name="Title of fixed lock"
        value={title}
        setValue={setValue}
        type="text"
      />
      <CustomAmount
        name="How much do you want to lock"
        value={amount}
        setValue={setAmount}
      />
      {/* <CustomInput
        name="Set Payback Date"
        value={end}
        setValue={setEnd}
        type="date"
      /> */}
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
