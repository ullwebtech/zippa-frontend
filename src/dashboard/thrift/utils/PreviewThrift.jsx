import close from "../../../assets/icons/close.svg";
import { FaArrowLeft } from "react-icons/fa";
import autos from "../../../assets/auto.png";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { isError, updateMessage } from "../../../store/slices/thriftSlice";
import { toast } from "react-hot-toast";
import {
  createThriftSave,
  createThriftSaveCard,
} from "../../../store/asyncActions/thriftAsyncActions";
import { FundSource } from "../../../utils/FundSource";
import { VerifyPin } from "../../../utils/VerifyPin";

export const PreviewThrift = ({ setShowModal, nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const thrift = useSelector((state) => state.thrift.thriftState);
  const message = useSelector((state) => state.thrift.message);
  const error = useSelector((state) => state.thrift.error);
  const loading = useSelector((state) => state.thrift.loading);
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
      formDetails.append("title", thrift.title);
      formDetails.append("frequency", thrift.frequency);
      formDetails.append("per", thrift.per);
      if (thrift.frequency === "weekly") {
        formDetails.append("dayOfWeek", thrift.dayOfWeek);
      }
      if (thrift.frequency === "monthly") {
        formDetails.append("dayOfMonth", thrift.dayOfMonth);
      }
      formDetails.append("timeOfDay", thrift.timeOfDay);
      formDetails.append("startDate", thrift.startDate);
      formDetails.append("card_id", cardDetails.id);
      dispatch(createThriftSaveCard(formDetails));
    }
    if (source === "wallet") {
      const formDetails = new FormData();
      formDetails.append("title", thrift.title);
      formDetails.append("frequency", thrift.frequency);
      formDetails.append("per", thrift.per);
      if (thrift.frequency === "weekly") {
        formDetails.append("dayOfWeek", thrift.dayOfWeek);
      }
      if (thrift.frequency === "monthly") {
        formDetails.append("dayOfMonth", thrift.dayOfMonth);
      }
      formDetails.append("timeOfDay", thrift.timeOfDay);
      formDetails.append("startDate", thrift.startDate);
      dispatch(createThriftSave(formDetails));
    }
  };

  useEffect(() => {
    if (message === "Thrift Created Successfully") {
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
      <h3 className="text-xl font-medium text-primary">Preview Thrift</h3>
      <SingleDet
        title={thrift?.title}
        per={thrift?.per}
        frequency={thrift?.frequency}
      />
      <div className="grid grid-cols-2 gap-5">
        <Single title="Total thrift saved" value={`₦0`} />
        <Single title="Interest rate" value={"15%"} />
        <Single title="Start date" value={thrift?.startDate} />
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
            Create Thrift
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

const SingleDet = ({ title, frequency, per }) => {
  return (
    <div className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm">
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title}</p>
        <div className="w-full grid grid-cols-2 gap-5">
          {/* <nav className="flex flex-col gap-2">
            <b className="font-semibold">N{total}</b>
            <p>Total</p>
          </nav> */}
          <nav className="flex flex-col gap-2">
            <b className="font-semibold">
              N{per} {frequency}
            </b>
            <p>Frequency</p>
          </nav>
        </div>
      </nav>
    </div>
  );
};
