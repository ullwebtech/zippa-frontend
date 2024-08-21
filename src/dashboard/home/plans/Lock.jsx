import icon1 from "../../../assets/icons/icon6.svg";
import close from "../../../assets/icons/close.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Lock = ({ setShowModal }) => {
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full h-full relative p-5 md:p-7 flex flex-col justify-center gap-5">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <nav className="flex flex-col items-start gap-4">
        <h3 className="text-xl font-medium text-primary">Zippa Lock</h3>
        <p>Select to get started</p>
      </nav>
      <nav className="flex flex-col p-4 rounded-lg bg-lock text-white gap-3">
        <b className="font-semibold">Set a LOCK savings plan</b>
        <p className="">
          Lock your money away for a fixed period of time. Feed your focus.
        </p>
      </nav>
      <Single
        name="Fixed Deposit"
        text="Save and Lock"
        duration="Lock up to 12 Months and  get 22% ROI"
        onClick={() => setSlug("fixed-deposit")}
        slug={slug}
        active="fixed-deposit"
      />
      <Single
        name="Savings With Benefits"
        text="Diamond | Gold | Silver | Bronze | Basic"
        duration="Lock up to  12 months and get amazing benefits"
        onClick={() => setSlug("save-with-benefit")}
        slug={slug}
        active="save-with-benefit"
      />
      <Single
        name="Smart Kiddies Savings"
        text="Smart 100 | 50 | 30 | 20"
        duration="Lock up to  12 months"
        onClick={() => setSlug("smart-kiddies")}
        slug={slug}
        active="smart-kiddies"
      />
      <nav className="flex items-center justify-center gap-5 ">
        <button
          className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary`}
          onClick={() => navigate(`/dashboard/savings/${slug}`)}
        >
          Continue
        </button>
      </nav>
    </div>
  );
};

const Single = ({ name, text, duration, onClick, slug, active }) => {
  return (
    <nav
      className={`flex justify-between bg-white border rounded-lg p-4 items-center gap-10 ${
        slug === active && "border-primary"
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-3">
        <b className="font-semibold text-lock">{name}</b>
        <p className="text-primary">{text}</p>
        <span className="text-sm">{duration}</span>
      </div>
      <img src={icon1} alt="" />
    </nav>
  );
};
