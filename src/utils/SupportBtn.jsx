import { useState } from "react";
import { FaHeadphones } from "react-icons/fa";
import Modal from "./Modal";
import { Support } from "../dashboard/home/utils/Support";

export default function SupportBtn() {
  const [support, setSupport] = useState(false);

  return (
    <button className="py-2 px-5 rounded-md  text-center flex items-center gap-3 w-full">
      <button
        className={`flex flex-col bg-inherit w-full`}
        onClick={() => setSupport(true)}
      >
        <div className={`text-white flex items-center gap-4 w-full`}>
          <FaHeadphones /> Support
        </div>
      </button>
      {support && <Modal child={<Support setShowModal={setSupport} />} />}
    </button>
  );
}
