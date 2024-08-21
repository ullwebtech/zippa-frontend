import { FaEye, FaEyeSlash, FaStarOfLife } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Savings = ({ bal }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start p-5 gap-5 bg-secondary text-white rounded-2xl w-full min-h-[200px]">
      <b className="font-semibold text-xl">Savings</b>
      <nav className="flex justify-between items-center gap-4 w-full text-lg">
        <span>Total Bal</span>
        {show ? (
          <FaEye className="" onClick={() => setShow(!show)} />
        ) : (
          <FaEyeSlash className="" onClick={() => setShow(!show)} />
        )}
      </nav>
      <b className="font-semibold flex items-center gap-2">
        {show ? (
          <span className="text-2xl">₦{Number(bal).toFixed(2)}</span>
        ) : (
          <nav className="flex gap-1 items-center">
            <FaStarOfLife className="" />
            <FaStarOfLife className="" />
            <FaStarOfLife className="" />
            <FaStarOfLife className="" />
          </nav>
        )}
        <span className="text-xl font-semibold">Active</span>
      </b>
      <button
        className="rounded-xl px-4 py-2 bg-primary"
        onClick={() => navigate("/dashboard/savings")}
      >
        View all plans
      </button>
    </div>
  );
};
