import { useEffect, useRef, useState } from "react";

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

export default function Drop({ Main, Dropdown, direction }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeHoverMenu = () => {
    setOpen(false);
  };
  useOnHoverOutside(dropdownRef, closeHoverMenu);

  return (
    <div
      className="w-fit relative"
      ref={dropdownRef}
      onClick={() => setOpen(!open)}
    >
      <Main />
      {open && (
        <div
          className={`absolute bottom-0 translate-y-full flex flex-col ${direction}`}
        >
          <Dropdown />
        </div>
      )}
    </div>
  );
}
