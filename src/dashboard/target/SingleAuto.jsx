import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import autos from "../../assets/auto.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SingleAuto() {
  const navigate = useNavigate();
  let params = useParams();
  const autoSavings = useSelector((state) => state.target.autoSavings);
  const [autoState, setAutoState] = useState(null);

  useEffect(() => {
    autoSavings.forEach((auto) => {
      if (auto.id === params.id) {
        setAutoState(auto);
      }
    });
  }, [autoSavings, params.id]);

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Auto Savings
      </b>
      <div className="flex flex-col gap-5 md:w-2/3">
        <Single
          title={autoState?.title}
          target={autoState?.amount}
          current={autoState?.current}
        />
        <div className="w-full h-full relative flex flex-col justify-center gap-5 md:gap-8">
          <h3
            className="text-xl font-medium text-primary"
            onClick={() => console.log(autoState)}
          >
            About
          </h3>
          <div className="grid grid-cols-2 gap-5">
            <SinglePreview title="Target" value={`₦${autoState?.amount}`} />
            <SinglePreview
              title="Start Date"
              value={new Date(autoState?.startDate).toLocaleDateString()}
            />
            <SinglePreview
              title="Withdraw Date"
              value={new Date(autoState?.endDate).toLocaleDateString()}
            />
            <SinglePreview
              title="Frequency"
              value={`₦${autoState?.per} ${autoState?.frequency}`}
            />
            <SinglePreview
              title="Interest per annum"
              value={`₦${autoState?.interest}`}
            />
            <SinglePreview
              title="Days Left"
              value={Math.max(
                0,
                Math.floor(
                  (new Date(autoState?.endDate) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )
              )}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

const Single = ({ title, target, current }) => {
  const percent = (+current / +target) * 100;
  return (
    <div className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm w-full">
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title}</p>
        <nav className="flex justify-between gap-10">
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
        <p>{percent.toFixed()}%</p>
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
