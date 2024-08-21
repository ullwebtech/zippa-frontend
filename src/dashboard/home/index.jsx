import icon1 from "../../assets/icons/icon1.png";
import icon2 from "../../assets/icons/icon2.png";
import icon3 from "../../assets/icons/icon3.png";
import icon4 from "../../assets/icons/icon4.png";
import { Wallet } from "./utils/Wallet";
import { Savings } from "./utils/Savings";
import { FundWallet } from "./utils/FundWallet";
import Modal from "../../utils/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Success } from "../../utils/Success";
import { useSelector } from "react-redux";
import { Support } from "./utils/Support";

export default function Index() {
  const navigate = useNavigate();
  const [showFund, setShowFund] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const wallet = useSelector((state) => state.wallet.wallet);
  const savings = useSelector((state) => state.wallet.savings);
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  let child;
  switch (step) {
    case 1:
      child = <FundWallet nextStep={nextStep} setShowModal={setShowFund} />;
      break;
    case 2:
      child = (
        <Success
          text={`You have successfully funded your wallet`}
          setShowModal={setShowFund}
          setStep={setStep}
        />
      );
      break;
    default:
      child = null;
  }

  return (
    <main className="h-full flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <b className="text-lg md:text-xl font-semibold">Welcome,</b>
        <div className="flex flex-col md:grid grid-cols-3 gap-5 md:gap-10">
          <Wallet bal={wallet?.amount || 0} />
          <Savings bal={savings} />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <b className="text-lg md:text-xl font-semibold">Quick Options</b>
        <div className="flex flex-col md:grid grid-cols-4 gap-5">
          <Total
            name={"Top-up wallet"}
            icon={icon1}
            onClick={() => setShowFund(true)}
          />
          <Total
            name={"Send Money"}
            icon={icon2}
            onClick={() => navigate("/dashboard/home/send-money")}
          />
          <Total
            name={"Bills & data"}
            icon={icon3}
            onClick={() => navigate("/dashboard/home/bills&utilities")}
          />
          <Total
            name={"Support"}
            icon={icon4}
            onClick={() => setShowSupport(true)}
          />
        </div>
      </div>
      {showFund && <Modal child={child} />}
      {showSupport && (
        <Modal child={<Support setShowModal={setShowSupport} />} />
      )}
    </main>
  );
}

const Total = ({ name, icon, onClick }) => {
  return (
    <div
      className="flex flex-col items-start p-5 gap-5 bg-white rounded-2xl w-full border border-[#A4A4A4]"
      onClick={onClick}
    >
      <img src={icon} alt="" className="object-contain" />
      <b className="font-semibold text-xl">{name}</b>
    </div>
  );
};
