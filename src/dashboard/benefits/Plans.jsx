import { useState } from "react";
import { Success } from "../../utils/Success";
import Modal from "../../utils/Modal";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CreateBenefit } from "./utils/CreateBenefit";

export default function Plans() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState(0)
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  let child;
  switch (step) {
    case 1:
      child = (
        <CreateBenefit
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
        <FaArrowLeft /> Savings With Benefits
      </b>
      <b className="text-primary">Select any plan of your choice</b>
      <div className="flex flex-col md:grid grid-cols-2 gap-5">
        <Single
          name="Diamond Plan"
          bg="#EDEDED"
          subBg="#DCDFFF"
          color="#01063D"
          per="100k"
          benefits="Rice, Oil, Milk, Tea, Sugar, Pasta/Macaroni, Tomatoes, Beans"
          onClick={() => {
            setShowModal(true);
            setPlan("Diamond");
            setAmount("100k")
          }}
        />
        <Single
          name="Gold Plan"
          bg="#C68F00"
          subBg="#FFE9B2"
          subColor="#01063D"
          color="#FFFFFF"
          per="50k"
          benefits="Rice, Oil, Milk, Tea, Sugar, Pasta/Macaroni"
          onClick={() => {
            setShowModal(true);
            setPlan("Gold");
            setAmount("50k")
          }}
        />
        <Single
          name="Silver Plan"
          bg="#727272"
          subBg="#101010"
          color="#FFFFFF"
          per="30k"
          benefits="Rice, Oil, Milk, Tea, Sugar"
          onClick={() => {
            setShowModal(true);
            setPlan("Silver");
            setAmount("30k")
          }}
        />
        <Single
          name="Bronze Plan"
          bg="#895E3E"
          subBg="#FF8F3C"
          color="#FFFFFF"
          per="20k"
          benefits="Rice, Oil, Milk, Tea, Sugar"
          onClick={() => {
            setShowModal(true);
            setPlan("Bronze");
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
