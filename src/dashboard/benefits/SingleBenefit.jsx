import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import autos from "../../assets/auto.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SingleBenefit() {
  const navigate = useNavigate();
  const benefits = useSelector((state) => state.lock.benefitSavings);
  let params = useParams();

  const [benefitState, setBenefitState] = useState(null);

  useEffect(() => {
    benefits.forEach((lock) => {

      if (lock.id === params.id) {
        setBenefitState(lock);
      }
    });
  }, [benefits, params.id]);

  return (
    <main className="h-full flex flex-col gap-10">
      <b
        className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Savings With Benefit
      </b>
      <div className="flex flex-col gap-5 md:w-2/3">
        <Single
          title={benefitState?.plan}
          amount={benefitState?.amount}
          end={benefitState?.endDate}
          start={benefitState?.startDate}
        />
        <div className="w-full h-full relative flex flex-col justify-center gap-5 md:gap-8">
          <h3 className="text-xl font-medium text-primary">About</h3>
          <div className="grid grid-cols-2 gap-5">
            <SinglePreview
              title="Total Savings"
              value={`₦${benefitState?.current}`}
            />
            <SinglePreview
              title="Frequency"
              value={`₦${benefitState?.amount}`}
            />
            <SinglePreview
              title="Benefits"
              value={benefitState?.benefits}
              style="col-span-2"
            />
            <SinglePreview
              title="Start Date"
              value={new Date(benefitState?.startDate).toLocaleDateString()}
            />
            <SinglePreview
              title="Payback Date"
              value={new Date(benefitState?.endDate).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

const Single = ({ title, amount, end, start }) => {
  const days = Math.floor(
    (new Date(end) - new Date()) / (1000 * 60 * 60 * 24)
  ); 
  const all = new Date(end) - new Date(start) / (1000 * 60 * 60 * 24);

  const percent = (days / all) * 100;
  return (
    <div className="flex gap-3 items-center rounded-xl p-4 bg-white text-primary text-sm">
      <img src={autos} alt="" className="h-full object-contain" />
      <nav className="w-full flex flex-col p-4 rounded-xl gap-2">
        <p className="">{title}</p>
        <span className="flex item-start justify-end w-full h-2 rounded-xl bg-[#D9D9D9]">
          <span
            className={`bg-[#01C853] h-full rounded-xl flex`}
            style={{
              width: `${percent}%`,
            }}
          ></span>
        </span>
        <nav className="flex justify-between gap-10">
          <nav className="flex flex-col gap-2">
            <b className="font-semibold">₦{amount} monthly</b>
          </nav>
          <p>{days} days left</p>
        </nav>
      </nav>
    </div>
  );
};

const SinglePreview = ({ title, value, style }) => {
  return (
    <nav
      className={`w-full bg-[#EDEDED] flex flex-col p-4 rounded-xl gap-2 ${style}`}
    >
      <p className="text-sm">{title}</p>
      <p className="text-lg font-semibold text-primary">{value}</p>
    </nav>
  );
};
