import { useState } from "react";
import { FaEye, FaEyeSlash, FaStarOfLife } from "react-icons/fa";

export const Wallet = ({ bal }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col items-start p-5 gap-5 bg-primary text-white rounded-2xl w-full min-h-[200px]">
      <b className="font-semibold text-xl">Wallet</b>
      <nav className="flex justify-between items-center gap-4 w-full text-lg">
        <span>Total Bal</span>
        {show ? (
          <FaEye className="" onClick={() => setShow(!show)} />
        ) : (
          <FaEyeSlash className="" onClick={() => setShow(!show)} />
        )}
      </nav>
      <b className="font-semibold flex items-center">
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
        {/* <span className="text-xl font-semibold">Active</span> */}
      </b>
    </div>
  );
};
