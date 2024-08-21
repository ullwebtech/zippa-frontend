import close from "../../../assets/icons/close.svg";
import { useEffect, useState } from "react";
import DropDown from "../../../utils/DropDown";
import CustomInput from "../../../utils/CustomInput";
import { useDispatch } from "react-redux";
import { updateAutoState } from "../../../store/slices/targetSlice";
import toast from "react-hot-toast";
import DayOfWeek from "../../../utils/DayOfWeek";
import DayOfMonth from "../../../utils/DayOfMonth";
import TimeOfDay from "../../../utils/TimeOfDay";
import { addDays, format } from "date-fns";
import moment from "moment";
import { CustomAmount } from "../../../utils/CustomAmount";

export const CreateAuto = ({ setShowModal, nextStep }) => {
  const dispatch = useDispatch();
  const [minEndDate, setMinEndDate] = useState(null);
  const currentDate = moment().startOf("day");
  const minStartDate = format(new Date(), "yyyy-MM-dd");
  const minStartTime = format(new Date(), "HH:mm");

  const [title, setValue] = useState("");
  const [target, setTarget] = useState("");
  const [end, setEnd] = useState("");
  const [frequency, setFrequency] = useState("");
  const [per, setPer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("");
  const [interest, setInterest] = useState("");

  useEffect(() => {
    if (end) {
      const int = (18 / 100) * target;
      setInterest(int);
    }
  }, [end, target]);
  useEffect(() => {
    if (startDate) {
      let minDate = new Date(startDate);
      if (frequency === "daily") {
        minDate = addDays(new Date(startDate), 1);
      } else if (frequency === "weekly") {
        minDate = addDays(new Date(startDate), 7);
      } else if (frequency === "monthly") {
        minDate = addDays(new Date(startDate), 31);
      }
      setMinEndDate(format(minDate, "yyyy-MM-dd"));
    }
  }, [startDate, frequency]);

  const handleSubmit = () => {
    if (
      per === "" ||
      frequency === "" ||
      title === "" ||
      target === "" ||
      end === "" ||
      startDate === "" ||
      timeOfDay === "" ||
      (frequency === "weekly" && dayOfWeek === "") ||
      (frequency === "monthly" && dayOfMonth === "")
    )
      return toast.error("Fill all fields");
    dispatch(
      updateAutoState({
        title,
        target,
        end,
        frequency,
        per,
        interest,
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
      <h3 className="text-xl font-medium">Create a Personal Autosave</h3>
      <p>Set up your personal saving goal. E.g Rent, Jappa</p>
      <CustomInput
        name="Title of Autosave"
        value={title}
        setValue={setValue}
        type="text"
      />
      <CustomInput
        name="What is your target amount"
        value={target}
        setValue={setTarget}
        type="number"
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
      <CustomInput
        name="Withdraw Date"
        value={end}
        setValue={setEnd}
        type="date"
        min={minEndDate}
        disabled={startDate === ""}
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
