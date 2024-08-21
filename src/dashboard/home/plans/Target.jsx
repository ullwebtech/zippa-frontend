import icon1 from "../../../assets/icons/icon5.svg";
import close from "../../../assets/icons/close.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Target = ({ setShowModal }) => {
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
        <h3 className="text-xl font-medium text-primary">Zippa Target</h3>
      </nav>
      <nav className="flex flex-col p-4 rounded-lg bg-tg text-white gap-3">
        <b className="font-semibold">Set a TARGET savings plan</b>
        <p className="">
          Save towards a particular goal. Don’t limit yourself by one goal
        </p>
      </nav>
      <Single
        name="Auto Savings"
        text="Direct debit set"
        duration="Target up to 6 months"
        onClick={() => setSlug("auto-saving")}
        slug={slug}
        active="auto-saving"
      />
      <Single
        name="Flex Savings"
        text="Manual debit set"
        duration="Target up to 6 months"
        onClick={() => setSlug("flex-saving")}
        slug={slug}
        active="flex-saving"
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
        <b className="font-semibold text-tg">{name}</b>
        <p className="text-primary">{text}</p>
        <span className="text-sm">{duration}</span>
      </div>
      <img src={icon1} alt="" />
    </nav>
  );
};
