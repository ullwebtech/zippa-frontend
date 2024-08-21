import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../utils/Modal";
import autos from "../../assets/auto.png";
import { FaArrowLeft } from "react-icons/fa";
import close from "../../assets/icons/close.svg";
import { CreateAuto } from "./utils/CreateAuto";
import { Success } from "../../utils/Success";
import { PreviewAuto } from "./utils/PreviewAuto";
import { useSelector } from "react-redux";

export default function Auto() {
  const navigate = useNavigate();
  const autosaveTotal = useSelector((state) => state.target.autosaveTotal);
  const autoSavings = useSelector((state) => state.target.autoSavings);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState("ongoing");

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  let child;
  switch (step) {
    case 1:
      child = <CreateAuto nextStep={nextStep} setShowModal={setShowModal} />;
      break;
    case 2:
      child = (
        <PreviewAuto
          nextStep={nextStep}
          prevStep={prevStep}
          setShowModal={setShowModal}
        />
      );
      break;
    case 3:
      child = (
        <Success
          text="You have successfully created an autosave"
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
        <FaArrowLeft /> Auto Savings
      </b>
      <div
        className={`flex flex-col gap-5 p-5 w-full rounded-2xl bg-tg text-white relative ${
          show ? "hidden" : ""
        }`}
      >
        <p className="text-xl font-semibold">What is Auto Savings?</p>
        <p className="">
          Set you Savings Target to Daily, Weekly.. and the app will
          automatically save for you.
        </p>
        <button
          onClick={() => setShow(!show)}
          className={`flex items-center justify-center h-8 w-8 absolute top-3 right-3`}
        >
          <img src={close} alt="" className="w-full h-full" />
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5 px-5 md:p7-10 py-8 w-full rounded-2xl bg-[#D7EDFF]">
        <nav className="flex flex-col gap-3">
          <p className="text-sm px-2 py-1 w-fit bg-[#F0F0F0] text-primary rounded-lg">
            18% per annum
          </p>
          <p className="text-tg">Auto save balance</p>
          <b className="font-bold text-primary text-xl">₦{autosaveTotal}</b>
          <button
            className="rounded-xl px-5 py-2 text-white bg-primary"
            onClick={() => setShowModal(true)}
          >
            Autosave today
          </button>
        </nav>
      </div>

      <div className="flex flex-col gap-5 md:gap-10">
        <nav className="flex gap-10 border-b">
          <button
            className={`h-full text-center py-2 px-5
           ${active === "ongoing" ? "text-primary border-b border-primary" : ""}
          `}
            onClick={() => setActive("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`h-full text-center py-2 px-5
           ${
             active === "completed"
               ? "text-primary border-b border-primary"
               : ""
           }
          `}
            onClick={() => setActive("completed")}
          >
            Paid back
          </button>
        </nav>
        <div className="flex flex-col gap-5 md:grid grid-cols-2">
          {autoSavings.filter((auto) => auto.status === active).length ===
            0 && (
            <p className="text-center text-primary">
              You have no {active} autosave
            </p>
          )}
          {autoSavings
            .filter((auto) => auto.status === active)
            .map((auto) => (
              <Single
                key={auto.id}
                title={auto.title}
                target={auto.amount}
                current={auto.current}
                slug={auto.id}
              />
            ))}
        </div>
      </div>
      {showModal && <Modal child={child} />}
    </main>
  );
}

const Single = ({ title, target, current, slug }) => {
  const navigate = useNavigate();
  const percent = +current / +target * 100;
  return (
    <div
      className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm cursor-pointer"
      onClick={() => navigate(`/dashboard/savings/auto-saving/${slug}`)}
    >
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title}</p>
        <nav className="w-full flex justify-between gap-10">
          <nav className="flex flex-col gap-2">
            <b className="font-semibold">₦{current}</b>
            <p>Total saved</p>
          </nav>
          <nav className="flex flex-col gap-2 text-end">
            <b className="font-semibold">₦{target}</b>
            <p>Target</p>
          </nav>
        </nav>
        <span className="flex item-start w-full h-2 rounded-xl bg-[#D9D9D9]">
          <span
            className={`bg-[#01C853] h-full rounded-xl flex`}
            style={{
              width: `${percent}%`,
            }}
          ></span>
        </span>
        <p className="ml-auto">{percent.toFixed()}%</p>
      </nav>
    </div>
  );
};
