import close from "../../../assets/icons/close.svg";
import DropDown from "../../../utils/DropDown";
import CustomInput from "../../../utils/CustomInput";
import { updateThriftState } from "../../../store/slices/thriftSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import DayOfWeek from "../../../utils/DayOfWeek";
import DayOfMonth from "../../../utils/DayOfMonth";
import TimeOfDay from "../../../utils/TimeOfDay";
import { format } from "date-fns";
import moment from "moment";
import { CustomAmount } from "../../../utils/CustomAmount";

export const CreateThrift = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const [title, setValue] = useState("");
  const [frequency, setFrequency] = useState("");
  const [per, setPer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("");

  const currentDate = moment().startOf("day");
  const minStartDate = format(new Date(), "yyyy-MM-dd");
  const minStartTime = format(new Date(), "HH:mm");

  const handleSubmit = () => {
    if (
      per === "" ||
      frequency === "" ||
      title === "" ||
      startDate === "" ||
      timeOfDay === "" ||
      (frequency === "weekly" && dayOfWeek === "") ||
      (frequency === "monthly" && dayOfMonth === "")
    ) {
      return toast.error("Fill all fields");
    }
    dispatch(
      updateThriftState({
        title,
        frequency,
        per,
        startDate,
        timeOfDay,
        dayOfWeek,
        dayOfMonth,
      })
    );
    nextStep();
  };
  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3
        className="text-xl font-medium"
        onClick={() => console.log(currentDate.isSame(startDate, "day"))}
      >
        Create Zippa Thrift
      </h3>
      <p>Set up your personal saving goal. E.g Rent, Jappa</p>
      <CustomInput
        name="Title of thrift"
        value={title}
        setValue={setValue}
        type="text"
      />
      <DropDown
        placeholder="How often do you want to save?"
        selected={frequency}
        setSelected={setFrequency}
        items={["daily", "weekly", "monthly", "yearly"]}
      />
      <CustomInput
        name="Start Date"
        value={startDate}
        setValue={setStartDate}
        type="date"
        min={minStartDate}
      />
      {frequency === "weekly" && <DayOfWeek setSelected={setDayOfWeek} />}
      {frequency === "monthly" && <DayOfMonth setSelected={setDayOfMonth} />}
      <TimeOfDay
        setSelected={setTimeOfDay}
        selected={timeOfDay}
        min={
          frequency === "daily" && currentDate.isSame(startDate, "day")
            ? minStartTime
            : "00:00"
        }
        disable={frequency !== "" && startDate !== "" ? false : true}
      />

      <CustomAmount
        name="How much do u want to contribute per transaction"
        value={per}
        setValue={setPer}
      />
      {/* <nav className="flex items-center justify-between">
        <span className="text-tg">Wallet Balance: ₦{wallet?.amount} </span>
        <span className="text-primary">Top Up </span>
      </nav> */}
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
