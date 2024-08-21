import icon1 from "../../../assets/icons/icon5.svg";
import icon2 from "../../../assets/icons/icon6.svg";
import icon3 from "../../../assets/icons/icon7.svg";
import bg from "../../../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../utils/Modal";
import { Target } from "./Target";
import { Lock } from "./Lock";
import { useSelector } from "react-redux";

export default function Index() {
  const [show, setShow] = useState(false);
  const [showLock, setShowLock] = useState(false);
  const savings = useSelector((state) => state.wallet.savings);
  const kidSavings = useSelector((state) => state.lock.kidSavings);
  const benefitSavings = useSelector((state) => state.lock.benefitSavings);
  const fixedSavings = useSelector((state) => state.lock.lockSavings);
  const autoSavings = useSelector((state) => state.target.autoSavings);
  const thriftSavings = useSelector((state) => state.thrift.thriftSavings);

  return (
    <main className="h-full flex flex-col gap-10">
      <b className="text-lg md:text-xl font-semibold">Savings</b>
      <div
        className="flex flex-col md:flex-row justify-between gap-5 px-5 md:px-10 py-10 w-full min-h-[250px] rounded-2xl bg-[#2E2E2E] bg-right bg-no-repeat text-white"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <nav className="flex flex-col gap-3">
          <p className="text-xl font-semibold">Savings</p>
          <b className="font-bold text-2xl">
            ₦{Number(savings).toFixed(2) || 0}
          </b>
          <p className="">Wallet Balance</p>
        </nav>
        <nav className="flex flex-col gap-3 items-end">
          <p>Start saving the little you have</p>
          <button className="bg-secondary px-10 h-12 rounded-2xl">
            Control your finances
          </button>
          <p>Get jaw-dropping interests</p>
        </nav>
      </div>
      <div className="flex flex-col md:grid grid-cols-3 gap-5">
        <Single
          name="Zippa Target"
          icon={icon1}
          active={
            autoSavings.filter((saving) => saving.status === "ongoing").length
          }
          text="Save toward a particular goal. Don’t limit yourself by one goal"
          color="#3D92D7"
          onClick={() => setShow(true)}
        />
        <Single
          name="Zippa Lock"
          icon={icon2}
          active={
            kidSavings.filter((saving) => saving.status === "ongoing").length +
            benefitSavings.filter((saving) => saving.status === "ongoing")
              .length +
            fixedSavings.filter((saving) => saving.status === "ongoing").length
          }
          text="Lock your money away for a fixed period of time. Feed your focus"
          color="#724CCF"
          onClick={() => setShowLock(true)}
        />
        <Single
          name="Zippa Thrift"
          icon={icon3}
          active={
            thriftSavings.filter((saving) => saving.status === "ongoing").length
          }
          text="Save little by little. It’s the little drops that make an ocean"
          color="#C68F00"
          slug="thrift"
        />
      </div>
      {show && <Modal child={<Target setShowModal={setShow} />} />}
      {showLock && <Modal child={<Lock setShowModal={setShowLock} />} />}
    </main>
  );
}

const Single = ({ name, icon, active, text, color, slug, onClick }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-start p-5 gap-5 bg-white rounded-2xl w-full border border-[#A4A4A4]"
      style={{ borderColor: `${color}` }}
    >
      <b className="font-semibold text-xl">{name}</b>
      <nav
        className="w-full flex justify-between items-center"
        style={{ color: `${color}` }}
      >
        <img src={icon} alt="" />
        <span className="flex gap-1 items-center">{active} Active</span>
      </nav>
      <p className="text-[#8E8E8E]">{text}</p>
      <button
        className="text-sm font-bold text-[#01063D]"
        onClick={slug ? () => navigate(`/dashboard/savings/${slug}`) : onClick}
      >
        See details
      </button>
    </div>
  );
};
