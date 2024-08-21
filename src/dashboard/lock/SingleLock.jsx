import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import autos from "../../assets/auto.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleAuto() {
  const navigate = useNavigate();
  const lockSavings = useSelector((state) => state.lock.lockSavings);
  let params = useParams();

  const [lockState, setLockState] = useState(null);

  useEffect(() => {
    lockSavings.forEach((lock) => {
      console.log(lock, params.id);
      if (lock.id === params.id) {
        setLockState(lock);
      }
    });
  }, [lockSavings, params.id]);

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Fixed Deposit
      </b>
      <div className="flex flex-col gap-5 md:w-2/3">
        <Single
          title={lockState?.title}
          amount={lockState?.amount}
          end={lockState?.endDate}
          start={lockState?.createdAt}
        />
        <div className="w-full h-full relative flex flex-col justify-center gap-5 md:gap-8">
          <h3 className="text-xl font-medium text-primary">About</h3>
          <div className="grid grid-cols-2 gap-5">
            <SinglePreview
              title="Fixed Deposit"
              value={`₦${lockState?.amount}`}
            />
            <SinglePreview
              title="Interest per annum"
              value={`₦${lockState?.interest}`}
            />
            <SinglePreview
              title="Start Date"
              value={new Date(lockState?.createdAt).toLocaleDateString()}
            />
            <SinglePreview
              title="Payback Date"
              value={new Date(lockState?.endDate).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

const Single = ({ title, amount, end, start }) => {
  const diff = new Date(end) - new Date();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const all = new Date(end) - new Date(start) / (1000 * 60 * 60 * 24);

  const percent = (days / all) * 100;
  return (
    <div className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm">
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title}</p>
        <nav className="flex justify-between gap-10">
          <nav className="flex flex-col gap-2">
            <b className="font-semibold">N{amount}</b>
            <p>Locked</p>
          </nav>
        </nav>
        <span className="flex item-start justify-end w-full h-2 rounded-xl bg-[#D9D9D9]">
          <span
            className={`bg-[#01C853] h-full rounded-xl flex`}
            style={{
              width: `${percent}%`,
            }}
          ></span>
        </span>
        <p>{days} days left</p>
      </nav>
    </div>
  );
};

const SinglePreview = ({ title, value }) => {
  return (
    <nav className="w-full bg-[#EDEDED] flex flex-col p-4 rounded-xl gap-2">
      <p className="text-sm">{title}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </nav>
  );
};
