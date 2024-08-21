import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import moment from "moment";

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
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export default function TimeOfDay({ setSelected, selected, min, disable }) {
  const [open, setOpen] = useState(false);
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

  return (
    <label className="flex flex-col gap-1 ">
      <span className="">Preferred Time</span>
      <div className="w-full h-12 font-medium" ref={dropdownRef}>
        <div
          onClick={() => {
            !disable && setOpen(!open);
          }}
          tabIndex={0}
          className={`bg-white placeholder:text-[#929292] h-12 px-5 flex justify-between items-center ${
            !selected && "text-[#212121]"
          }`}
        >
          {selected ? (
            selected
          ) : (
            <span className="text-[#929292]">Select a time</span>
          )}
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
                setOpen(false);
              }}
            >
              Select a time
            </li>
            {items
              ?.filter((item) => moment(item, "HH:mm") >= moment(min, "HH:mm"))
              ?.map((item, i) => (
                <li
                  key={i}
                  className={`p-2 text-sm cursor-pointer flex items-center gap-2`}
                  onClick={() => {
                    if (item !== selected) {
                      setSelected(item);
                      setOpen(false);
                    }
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
    </label>
  );
}
