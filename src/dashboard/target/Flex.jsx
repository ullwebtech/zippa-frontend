import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../utils/Modal";
import { FaArrowLeft } from "react-icons/fa";
import close from "../../assets/icons/close.svg";
import { Success } from "../../utils/Success";
import { ConfirmFlex } from "./utils/ConfirmFlex";
import { TopupFlex } from "./utils/TopupFlex";
import withd from "../../assets/icons/withdraw.svg";
import deposit from "../../assets/icons/deposit.svg";
import { Withdraw } from "./utils/Withdraw";
import { useSelector } from "react-redux";
import { WithdrawAmount } from "./utils/WithdrawAmount";

export default function Flex() {
  const navigate = useNavigate();
  const flexTotal = useSelector((state) => state.target.flexTotal);
  const flexTrans = useSelector((state) => state.target.flexTrans);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [stepW, setStepW] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const nextStepW = () => {
    setStepW((prevStep) => prevStep + 1);
  };
  const prevStepW = () => {
    setStepW((prevStep) => prevStep - 1);
  };

  let child;
  switch (step) {
    case 1:
      child = <TopupFlex nextStep={nextStep} setShowModal={setShowModal} />;
      break;
    case 2:
      child = (
        <ConfirmFlex
          nextStep={nextStep}
          prevStep={prevStep}
          setShowModal={setShowModal}
        />
      );
      break;
    case 3:
      child = (
        <Success
          text="You have successfully topped up your flex savings"
          setShowModal={setShowModal}
          setStep={setStep}
        />
      );
      break;
    default:
      child = null;
  }

  let wchild;
  switch (stepW) {
    case 1:
      wchild = (
        <WithdrawAmount
          nextStep={nextStepW}
          setShowModal={setShowWithdraw}
          setStep={setStepW}
        />
      );
      break;
    case 2:
      wchild = (
        <Withdraw
          nextStep={nextStepW}
          prevStep={prevStepW}
          setStep={setStepW}
          setShowModal={setShowWithdraw}
        />
      );
      break;
    case 3:
      wchild = (
        <Success
          text="You have successfully withdrawn your savings"
          setShowModal={setShowWithdraw}
          setStep={setStepW}
        />
      );
      break;
    default:
      wchild = null;
  }

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Flex Savings
      </b>
      <div
        className={`flex flex-col gap-5 p-5 w-full rounded-2xl bg-tg text-white relative ${
          show ? "hidden" : ""
        }`}
      >
        <p className="text-xl font-semibold">What is Flex Savings?</p>
        <p className="">
          Here you can save any amount manually and withdraw into your bank
          account at any time
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
          <p className="text-sm px-2 w-fit py-1 bg-[#F0F0F0] text-primary rounded-lg">
            18% per annum
          </p>
          <p className="text-tg">Flex Balance</p>
          <b className="font-bold text-primary text-xl">₦{flexTotal}</b>
          <div className="flex gap-5 items-center">
            <button
              className="rounded-xl px-5 py-2 text-white bg-primary"
              onClick={() => setShowModal(true)}
            >
              Top up flex
            </button>
            <button
              className="rounded-xl px-5 py-2 text-primary border-primary bg-inherit border"
              onClick={() => setShowWithdraw(true)}
            >
              Withdraw
            </button>
          </div>
        </nav>
      </div>
      <div className="flex flex-col gap-5">
        <b className="text-primary font-bold">Transaction History</b>
        <div className="flex flex-col">
          {flexTrans?.length === 0 && (
            <p className="text-center text-primary">
              You have no flex savings transaction
            </p>
          )}
          {flexTrans?.map((trans, id) => {
            return (
              <Single
                key={id}
                title={trans.type}
                amount={trans.amount}
                date={trans.createdAt}
              />
            );
          })}
        </div>
      </div>

      {showModal && <Modal child={child} />}
      {showWithdraw && <Modal child={wchild} />}
    </main>
  );
}

const Single = ({ title, date, amount }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="flex gap-4 items-center rounded-xl py-4 border-b">
      <img
        src={title === "deposit" ? deposit : withd}
        alt=""
        className="object-contain h-10 w-10"
      />
      <nav className="flex flex-col gap-1">
        <b className="font-medium text-primary capitalize">{title}</b>
        <p>{formattedDate}</p>
      </nav>
      <span
        className={`${
          title === "deposit" ? "text-[#0EA169]" : "text-[#A10F18]"
        } ml-auto font-bold`}
      >
        {title === "deposit" ? "+" : "-"}N{amount}
      </span>
    </div>
  );
};
