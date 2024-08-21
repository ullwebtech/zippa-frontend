import close from "../../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import {
  createAutoSave,
  createAutoSaveCard,
} from "../../../store/asyncActions/targetAsyncActions";
import { useEffect, useState } from "react";
import { isError, updateMessage } from "../../../store/slices/targetSlice";
import { toast } from "react-hot-toast";
import { FundSource } from "../../../utils/FundSource";
import { VerifyPin } from "../../../utils/VerifyPin";

export const PreviewAuto = ({ setShowModal, nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const autoState = useSelector((state) => state.target.autoState);
  const message = useSelector((state) => state.target.message);
  const error = useSelector((state) => state.target.error);
  const loading = useSelector((state) => state.target.loading);
  const [source, setSource] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [verified, setVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (source === "") {
      return toast.error("Select a funding source");
    }
    if (source === "card") {
      const formDetails = new FormData();
      formDetails.append("title", autoState.title);
      formDetails.append("amount", autoState.target);
      formDetails.append("startDate", autoState.startDate);
      formDetails.append("endDate", autoState.end);
      formDetails.append("frequency", autoState.frequency);
      formDetails.append("per", autoState.per);
      if (autoState.frequency === "weekly") {
        formDetails.append("dayOfWeek", autoState.dayOfWeek);
      }
      if (autoState.frequency === "monthly") {
        formDetails.append("dayOfMonth", autoState.dayOfMonth);
      }
      formDetails.append("timeOfDay", autoState.timeOfDay);
      formDetails.append("card_id", cardDetails.id);
      dispatch(createAutoSaveCard(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("title", autoState.title);
      formDetails.append("amount", autoState.target);
      formDetails.append("startDate", autoState.startDate);
      formDetails.append("endDate", autoState.end);
      formDetails.append("frequency", autoState.frequency);
      formDetails.append("per", autoState.per);
      if (autoState.frequency === "weekly") {
        formDetails.append("dayOfWeek", autoState.dayOfWeek);
      }
      if (autoState.frequency === "monthly") {
        formDetails.append("dayOfMonth", autoState.dayOfMonth);
      }
      formDetails.append("timeOfDay", autoState.timeOfDay);
      dispatch(createAutoSave(formDetails));
    }
  };

  useEffect(() => {
    if (message === "Autosave Created Successfully") {
      toast.success(message);
      dispatch(updateMessage(""));
      nextStep();
    }
  }, [message, dispatch, nextStep]);

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
      <FaArrowLeft
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={prevStep}
      />
      <h3 className="text-xl font-medium text-primary">{autoState?.title}</h3>
      <div className="grid grid-cols-2 gap-5">
        <Single title="Target" value={`₦${autoState?.target}`} />
        <Single title="Withdraw Date" value={autoState?.end} />
        <Single
          title="Frequency"
          value={`${autoState?.per} ${autoState?.frequency}`}
        />
        <Single title="Interest" value={`₦${autoState?.interest}`} />
        <Single
          title="Days Left"
          value={Math.floor(
            (new Date(autoState?.end) - new Date()) / (1000 * 60 * 60 * 24)
          )}
        />
      </div>
      <FundSource
        source={source}
        setSource={setSource}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
        removeAddCard={true}
      />
      <VerifyPin verified={verified} setVerified={setVerified} />
      {verified && (
        <nav className="flex items-center justify-center gap-5 ">
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
              loading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
          >
            Autosave now
          </button>
        </nav>
      )}
    </div>
  );
};

const Single = ({ title, value }) => {
  return (
    <nav className="w-full bg-[#EDEDED] flex flex-col p-4 rounded-xl gap-2">
      <p className="text-sm">{title}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </nav>
  );
};
