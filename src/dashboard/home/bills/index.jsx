import { useState } from "react";
import Modal from "../../../utils/Modal";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { Cable } from "../utils/Cable";
import { Electricity } from "../utils/Electricity";
import { Airtime } from "../utils/Airtime";
import { Data } from "../utils/Data";
import icon1 from "../../../assets/icons/settings/icon2.svg";
import icon2 from "../../../assets/icons/settings/icon3.svg";
import icon3 from "../../../assets/icons/settings/icon6.svg";
import { useNavigate } from "react-router-dom";
import { Success } from "../../../utils/Success";
import { useSelector } from "react-redux";

export default function Index() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.bills.token);
  const [showCable, setShowCable] = useState(false);
  const [showElect, setShowElect] = useState(false);
  const [showAirtime, setShowAirtime] = useState(false);
  const [showData, setShowData] = useState(false);
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  let childAirtime;
  switch (step) {
    case 1:
      childAirtime = (
        <Airtime nextStep={nextStep} setShowModal={setShowAirtime} />
      );
      break;
    case 2:
      childAirtime = (
        <Success
          text={`Airtime Recharge Successful`}
          setShowModal={setShowAirtime}
          setStep={setStep}
        />
      );
      break;
    default:
      childAirtime = null;
  }
  let childCable;
  switch (step) {
    case 1:
      childCable = <Cable nextStep={nextStep} setShowModal={setShowCable} />;
      break;
    case 2:
      childCable = (
        <Success
          text={`Cable Subscription Successful`}
          setShowModal={setShowCable}
          setStep={setStep}
        />
      );
      break;
    default:
      childCable = null;
  }
  let childData;
  switch (step) {
    case 1:
      childData = <Data nextStep={nextStep} setShowModal={setShowData} />;
      break;
    case 2:
      childData = (
        <Success
          text={`Data Purchase Successful`}
          setShowModal={setShowData}
          setStep={setStep}
        />
      );
      break;
    default:
      childData = null;
  }
  let childElect;
  switch (step) {
    case 1:
      childElect = (
        <Electricity nextStep={nextStep} setShowModal={setShowElect} />
      );
      break;
    case 2:
      childElect = (
        <Success
          text={`Electricity Payment Successful, token has also been sent to registered email`}
          token={token ? token : null}
          setShowModal={setShowElect}
          setStep={setStep}
        />
      );
      break;
    default:
      childElect = null;
  }

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Bills & Utilities
      </b>
      <div className="h-full py-10 md:py-20 flex flex-col items-center justify-center gap-10 text-center">
        <div className="w-1/2 bg-[#D9D9D9] flex flex-col gap-10 justify-center items-center p-10 rounded-2xl">
          <h3 className="text-2xl font-semibold">Bills & Data</h3>
          <p>Pay bills, buy data and subscribe your internet</p>
          <Single
            name="Airtime"
            icon={icon1}
            onClick={() => setShowAirtime(true)}
          />
          <Single name="Data" icon={icon2} onClick={() => setShowData(true)} />
          <Single
            name="Electricity"
            icon={icon2}
            onClick={() => setShowElect(true)}
          />
          <Single
            name="Cable TV"
            icon={icon3}
            onClick={() => setShowCable(true)}
          />
        </div>
      </div>
      {showCable && <Modal child={childCable} />}
      {showElect && <Modal child={childElect} />}
      {showAirtime && <Modal child={childAirtime} />}
      {showData && <Modal child={childData} />}
    </main>
  );
}

const Single = ({ name, icon, onClick }) => {
  return (
    <div
      className="flex items-center justify-between p-5 gap-5 bg-white rounded-2xl w-full cursor-pointer"
      onClick={onClick}
    >
      <img src={icon} alt="" className="object-contain" />
      <b className="font-semibold text-xl">{name}</b>
      <FaChevronRight />
    </div>
  );
};
