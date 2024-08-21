import { useState } from "react";
import { FaCaretDown, FaWallet } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Cable } from "../dashboard/home/utils/Cable";
import { Electricity } from "../dashboard/home/utils/Electricity";
import { Airtime } from "../dashboard/home/utils/Airtime";
import { Data } from "../dashboard/home/utils/Data";
import Modal from "./Modal";
import { Success } from "./Success";
import { useSelector } from "react-redux";

export default function SideBarBtn() {
  const token = useSelector((state) => state.bills.token);
  const [showDrop, setShowDrop] = useState(false);
  const [showCable, setShowCable] = useState(false);
  const [showElect, setShowElect] = useState(false);
  const [showAirtime, setShowAirtime] = useState(false);
  const [showData, setShowData] = useState(false);
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleClick = () => {
    setShowDrop(!showDrop);
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
    <div className="w-full">
      <button className="py-2 px-5 rounded-md  text-center flex items-center gap-3 w-full">
        <button
          className={`flex flex-col bg-inherit w-full`}
          onClick={handleClick}
        >
          <div className={`text-white flex items-center gap-4 w-full`}>
            <FaWallet className="" />
            <p className="whitespace-nowrap">Bills & Payments</p>
            <FaCaretDown
              className={`ml-auto transition-all ease-in-out duration-300 ${
                showDrop && "rotate-180"
              }`}
            />
          </div>
        </button>
      </button>
      <AnimatePresence>
        {showDrop && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col text-left w-full bg-white gap-4 my-3 py-4 px-5 text-primary rounded-xl"
          >
            <li className="cursor-pointer" onClick={() => setShowAirtime(true)}>
              Airtime
            </li>
            <li className="cursor-pointer" onClick={() => setShowData(true)}>
              Data
            </li>
            <li className="cursor-pointer" onClick={() => setShowElect(true)}>
              Electricity
            </li>
            <li className="cursor-pointer" onClick={() => setShowCable(true)}>
              Cable TV
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
      {showCable && <Modal child={childCable} />}
      {showElect && <Modal child={childElect} />}
      {showAirtime && <Modal child={childAirtime} />}
      {showData && <Modal child={childData} />}
    </div>
  );
}
