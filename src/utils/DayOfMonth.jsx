import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

function useOnHoverOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mouseover", listener);
    return () => {
      document.removeEventListener("mouseout", listener);
    };
  }, [ref, handler]);
}

const items = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
].map((day, index) => ({ display: day, value: index + 1 }));

export default function DayOfMonth({ setSelected }) {
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("Day Of The Month");
  const dropdownRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const closeHoverMenu = () => {
    setOpen(false);
  };
  useOnHoverOutside(dropdownRef, closeHoverMenu);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownWidth(dropdownRef.current.offsetWidth);
    }
  }, [dropdownRef]);

  const handleSelect = (day) => {
    setSelected(day.value);
    setPlaceholder(day.display);
    setOpen(false);
  };

  return (
    <label className="flex flex-col gap-1 ">
      <span className="">Day Of Month</span>
      <div className="w-full h-12 font-medium" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          tabIndex={0}
          className={`bg-white placeholder:text-[#929292] h-12 px-5 flex justify-between items-center`}
        >
          {placeholder}
          <FaCaretDown className={`${open && "rotate-180"} text-xl`} />
        </div>
        {open && (
          <ul
            className={`bg-white backdrop-blur-[8px] shadow-[0px_4px_4px_0px_rgba(18,18,18,0.10)] px-4 py-6 flex flex-col gap-3 rounded-xl overflow-y-auto z-[9999999] max-h-[400px] absolute `}
            style={{ width: dropdownWidth }}
          >
            <li
              className={`p-2 text-sm cursor-pointer flex items-center gap-2`}
              onClick={() => {
                setSelected("");
                setPlaceholder("Day Of The Month");
                setOpen(false);
              }}
            >
              Day Of The Month
            </li>
            {items?.map((item, i) => (
              <li
                key={i}
                className={`p-2 text-sm cursor-pointer flex items-center gap-2`}
                onClick={() => handleSelect(item)}
              >
                {item.display}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
}
