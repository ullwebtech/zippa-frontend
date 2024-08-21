import { useState } from "react";
import { Success } from "../../utils/Success";
import Modal from "../../utils/Modal";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CreateKids } from "./utils/CreateKids";

export default function Plans() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [plan, setPlan] = useState(false);
  const [amount, setAmount] = useState(0)
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  let child;
  switch (step) {
    case 1:
      child = (
        <CreateKids
          nextStep={nextStep}
          setShowModal={setShowModal}
          plan={plan}
          amount={amount}
        />
      );
      break;
    case 2:
      child = (
        <Success
          text={`You have successfully created a ${plan} plan`}
          setShowModal={setShowModal}
          setStep={setStep}
        />
      );
      break;
    default:
      child = null;
  }

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Smart Kiddies
      </b>
      <b className="text-primary">Select any plan of your choice</b>
      <div className="grid grid-cols-2 gap-5 w-3/4">
        <Single
          name="Smart 100"
          bg="#028538"
          subBg="#D7FFE8"
          subColor="#01063D"
          color="#FFFFFF"
          per="100k"
          benefits="Birthday cake, School bag, snack pack, school shoes, Educational Tablet"
          onClick={() => {
            setShowModal(true);
            setPlan("Smart 100");
            setAmount("100k")
          }}
        />
        <Single
          name="Smart 50"
          bg="#8C52FF"
          subBg="#EFE7FF"
          subColor="#01063D"
          color="#FFFFFF"
          per="50k"
          benefits="Birthday cake, School bag, snack pack, school shoes, Colouring set"
          onClick={() => {
            setShowModal(true);
            setPlan("Smart 50");
            setAmount("50k")
          }}
        />
        <Single
          name="Smart 30"
          bg="#BB0072"
          subBg="#FFD2ED"
          subColor="#01063D"
          color="#FFFFFF"
          per="30k"
          benefits="Birthday cake, School bag, snack pack, school shoes"
          onClick={() => {
            setShowModal(true);
            setPlan("Smart 30");
            setAmount("30k")
          }}
        />
        <Single
          name="Smart 20"
          bg="#C68F00"
          subBg="#FFE9B2"
          subColor="#01063D"
          color="#FFFFFF"
          per="20k"
          benefits="Birthday cake, snack pack"
          onClick={() => {
            setShowModal(true);
            setPlan("Smart 20");
            setAmount("20k")
          }}
        />
      </div>
      {showModal && <Modal child={child} />}
    </main>
  );
}

const Single = ({
  name,
  bg,
  subBg,
  subColor,
  benefits,
  color,
  per,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col items-start p-5 gap-5 rounded-2xl w-full border"
      style={{ backgroundColor: `${bg}`, color: `${color}` }}
      onClick={onClick}
    >
      <nav className="flex items-center gap-5">
        <b className="font-bold text-lg">{name}</b>
        <span
          className="flex px-4 py-1 text-sm rounded-2xl"
          style={{ backgroundColor: `${subBg}`, color: `${subColor}` }}
        >
          Save {per} monthly
        </span>
        <span
          className="flex px-4 py-1 text-sm rounded-2xl"
          style={{ backgroundColor: `${subBg}`, color: `${subColor}` }}
        >
          Reg fee: 10k
        </span>
      </nav>
      <p className="font-semibold">BENEFITS</p>
      <p className="font-semibold">100% Money back after a year </p>
      <p className="">{benefits}</p>
    </div>
  );
};
