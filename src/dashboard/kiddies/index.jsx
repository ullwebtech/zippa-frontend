import { useNavigate } from "react-router-dom";
import { useState } from "react";
import autos from "../../assets/auto.png";
import { FaArrowLeft } from "react-icons/fa";
import close from "../../assets/icons/close.svg";
import { useSelector } from "react-redux";

export default function Index() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [active, setActive] = useState("ongoing");

  const kidTotal = useSelector((state) => state.lock.kidTotal);
  const kidSavings = useSelector((state) => state.lock.kidSavings);

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Smart Kiddies
      </b>
      <div
        className={`flex flex-col gap-5 p-5 w-full rounded-2xl bg-lock text-white relative ${
          show ? "hidden" : ""
        }`}
      >
        <p className="text-xl font-semibold">What is smart kiddies?</p>
        <p className="">
          Thi allows you to save fixed amount monthly. You get 100% cashback
          after a year + extra goodies.
        </p>
        <button
          onClick={() => setShow(!show)}
          className={`flex items-center justify-center h-8 w-8 absolute top-3 right-3`}
        >
          <img src={close} alt="" className="w-full h-full" />
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-5 px-5 md:p7-10 py-8 w-full rounded-2xl bg-[#E4D9FF]">
        <nav className="flex flex-col gap-3">
          <p className="text-sm px-2 py-1 w-fit bg-[#F0F0F0] text-primary rounded-lg">
            Goodie Bag
          </p>
          <p className="text-tg">Savings balance</p>
          <b className="font-bold text-primary text-xl">₦{kidTotal}</b>
          <button
            className="rounded-xl px-5 py-2 text-white bg-primary"
            onClick={() => navigate("/dashboard/savings/smart-kiddies/plans")}
          >
            Select a plan
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
          {kidSavings?.filter((kid) => kid?.status === active).length === 0 && (
            <p className="text-center text-primary">
              You have no {active} kiddies savings
            </p>
          )}
          {kidSavings
            ?.filter((kid) => kid?.status === active)
            ?.map((kid) => (
              <Single
                key={kid?.id}
                title={kid?.plan}
                amount={kid?.amount}
                endDate={kid?.endDate}
                startDate={kid?.createdAt}
                slug={kid?.id}
              />
            ))}
        </div>
      </div>
    </main>
  );
}

const Single = ({ title, amount, endDate, startDate, slug }) => {
  const navigate = useNavigate();
  const days = Math.max(0, Math.floor((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)));
  const diff = new Date(Date) - new Date();
  const percentDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const all = new Date(Date) - new Date(startDate) / (1000 * 60 * 60 * 24);

  const percent = (percentDays / all) * 100;
  return (
    <div
      className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm cursor-pointer"
      onClick={() => navigate(`/dashboard/savings/smart-kiddies/${slug}`)}
    >
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title} Plan</p>
        <span className="flex item-start w-full h-2 rounded-xl bg-[#D9D9D9]">
          <span
            className={`bg-[#01C853] h-full rounded-xl flex`}
            style={{
              width: `${percent}%`,
            }}
          ></span>
        </span>
        <nav className="flex justify-between gap-10">
          <nav className="flex gap-1 items-center">N{amount} monthly</nav>
          <p className="ml-auto">{days} days left</p>
        </nav>
      </nav>
    </div>
  );
};
