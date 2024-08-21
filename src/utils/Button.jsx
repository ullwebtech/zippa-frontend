import { Link } from "react-router-dom";
import arrW from "../assets/arr-w.png";
import arrB from "../assets/arr-b.png";

export function ButtonBlack({ name, width = "fit-content", slug }) {
  return (
    <Link
      to={slug}
      className={`min-w-fit h-14 font-[500] bg-black border border-white hover:bg-white hover:text-black hover:gap-6 transition-all ease-in-out duration-500 text-white rounded-full flex items-center justify-between px-8 gap-4`}
      style={{ width: `${width}` }}
    >
      {name} <img src={arrW} alt="" />
    </Link>
  );
}
export function ButtonWhite({ name, width = "fit-content", slug }) {
  return (
    <Link
      to={slug}
      className={`min-w-fit h-14 font-[500] text-sm md:text-base bg-white border border-black hover:bg-white hover:text-white hover:gap-6 transition-all ease-in-out duration-500 text-black rounded-full flex items-center justify-between px-8 gap-4`}
      style={{ width: `${width}` }}
    >
      {name} <img src={arrB} alt="" />
    </Link>
  );
}

export function ButtonTrans({ name, width = "fit-content" }) {
  return (
    <button
      className={`min-w-fit h-14 font-[500] text-black bg-inherit border border-black rounded-full flex items-center justify-between px-8 gap-4`}
      style={{ width: `${width}` }}
    >
      {name} <img src={arrB} alt="" />
    </button>
  );
}
