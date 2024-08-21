import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import autos from "../../assets/auto.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../../utils/Modal";
import { Success } from "../../utils/Success";
import { Withdraw } from "./utils/Withdraw";
import { useParams } from "react-router-dom";

export default function SingleAuto() {
  const navigate = useNavigate();
  const thrifts = useSelector((state) => state.thrift.thriftSavings);
  let params = useParams();
  const [thriftState, setThriftState] = useState(null);

  useEffect(() => {
    thrifts.forEach((auto) => {
      if (auto.id === params.id) {
        setThriftState(auto);
      }
    });
  }, [thrifts, params.id]);

  const [step, setStep] = useState(1);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  
  let child;
  switch (step) {
    case 1:
      child = (
        <Withdraw
          nextStep={nextStep}
          id={thriftState?.id}
          amount={thriftState?.amount}
          setShowModal={setShowWithdraw}
        />
      );
      break;
    case 2:
      child = (
        <Success
          text="You have successfully withdrawn your thrift savings"
          setShowModal={setShowWithdraw}
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
      <div className="flex flex-col gap-5 md:w-2/3">
        <SingleDet
          title={thriftState?.title}
          per={thriftState?.per}
          frequency={thriftState?.frequency}
        />

        <button
          className="h-12 rounded-xl px-5 text-white bg-primary w-full"
          onClick={() => setShowWithdraw(true)}
        >
          Withdraw
        </button>
        <div className="w-full relative flex flex-col justify-center gap-5 md:gap-8">
          <h3 className="text-xl font-medium text-primary">About</h3>

          <div className="grid grid-cols-2 gap-5">
            <Single
              title="Total thrift saved"
              value={`₦${thriftState?.amount}`}
            />
            <Single
              title="Total Interest rate"
              value={"15%"}
            />
            <Single
              title="Start date"
              value={new Date(thriftState?.startDate).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
      {showWithdraw && <Modal child={child} />}
    </main>
  );
}

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
