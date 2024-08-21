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

export default function DropDown({
  items,
  setSelected,
  selected,
  placeholder,
}) {
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
    <div className="w-full h-12 font-medium" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        tabIndex={0}
        className={` rounded-xl bg-white placeholder:text-[#929292] h-12 px-5 flex justify-between items-center ${
          !selected && "text-[#212121]"
        }`}
      >
        {selected ? (
          selected
        ) : (
          <span className="text-[#929292]">{placeholder}</span>
        )}
        <FaCaretDown className={`${open && "rotate-180"} text-xl`} />
      </div>
      {open && (
        <ul
          className={`bg-white backdrop-blur-[8px] shadow-[0px_4px_4px_0px_rgba(18,18,18,0.10)] mt-[2px] px-4 py-6 flex flex-col gap-3 rounded-xl overflow-y-auto z-[9999999] max-h-[400px] absolute `}
          style={{ width: dropdownWidth }}
        >
          <li
            className={`p-2 text-sm cursor-pointer flex items-center gap-2`}
            onClick={() => {
              setSelected("");
              setOpen(false);
            }}
          >
            {placeholder}
          </li>
          {items?.map((item, i) => (
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
  );
}
