import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../utils/Modal";
import autos from "../../assets/auto.png";
import { FaArrowLeft } from "react-icons/fa";
import close from "../../assets/icons/close.svg";
import { CreateThrift } from "./utils/CreateThrift";
import { Success } from "../../utils/Success";
import { PreviewThrift } from "./utils/PreviewThrift";
import { useSelector } from "react-redux";

export default function Index() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState("ongoing");

  const thriftTotal = useSelector((state) => state.thrift.thriftTotal);
  const thriftSavings = useSelector((state) => state.thrift.thriftSavings);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  let child;
  switch (step) {
    case 1:
      child = <CreateThrift nextStep={nextStep} setShowModal={setShowModal} />;
      break;
    case 2:
      child = (
        <PreviewThrift
          nextStep={nextStep}
          prevStep={prevStep}
          setShowModal={setShowModal}
        />
      );
      break;
    case 3:
      child = (
        <Success
          text="You have successfully created your thrift plan"
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
        <FaArrowLeft /> Zippa Thrift
      </b>
      <div
        className={`flex flex-col gap-5 p-5 w-full rounded-2xl bg-thrift text-white relative ${
          show ? "hidden" : ""
        }`}
      >
        <p className="text-xl font-semibold">What is Zippa Thrift?</p>
        <p className="">
          Zippa thrift allows you to save daily, weekly... you can withdraw your
          money anytime
        </p>
        <button
          onClick={() => setShow(!show)}
          className={`flex items-center justify-center h-8 w-8 absolute top-3 right-3`}
        >
          <img src={close} alt="" className="w-full h-full" />
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5 px-5 md:p7-10 py-8 w-full rounded-2xl bg-[#FFF2D2]">
        <nav className="flex flex-col gap-3">
          <p className="text-sm px-2 py-1 w-fit bg-[#F0F0F0] text-primary rounded-lg">
            15% per annum
          </p>
          <p className="text-tg">Thrift balance</p>
          <b className="font-bold text-primary text-xl">₦{thriftTotal}</b>
          <button
            className="rounded-xl px-5 py-2 text-white bg-primary"
            onClick={() => setShowModal(true)}
          >
            Set up thrift
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
          {thriftSavings?.filter((thrift) => thrift?.status === active).length ===
            0 && (
            <p className="text-center text-primary">
              You have no {active} thrift
            </p>
          )}
          {thriftSavings
            ?.filter((thrift) => thrift?.status === active)
            ?.map((thrift) => (
              <Single
                key={thrift?.id}
                title={thrift?.title}
                total={thrift?.amount}
                frequency={thrift?.frequency}
                per={thrift?.per}
                slug={thrift?.id}
              />
            ))}
        </div>
      </div>
      {showModal && <Modal child={child} />}
    </main>
  );
}

const Single = ({ title, total, frequency, per, slug }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm cursor-pointer"
      onClick={() => navigate(`/dashboard/savings/thrift/${slug}`)}
    >
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title}</p>
        <div className="w-full grid grid-cols-2 gap-5">
          <nav className="flex flex-col gap-2">
            <b className="font-semibold">₦{total}</b>
            <p>Total</p>
          </nav>
          <nav className="flex flex-col gap-2">
            <b className="font-semibold">
            ₦{per} {frequency}
            </b>
            <p>Frequency</p>
          </nav>
        </div>
      </nav>
    </div>
  );
};
