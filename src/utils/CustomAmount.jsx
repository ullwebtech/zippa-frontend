import { useState, useEffect } from "react";

export const CustomAmount = ({
  value,
  setValue,
  name
}) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(formatWithCommas(value));
  }, [value]);

  function handleChange(e) {
    const inputVal = e.target.value;
    const cleanedInput = inputVal.replace(/[^\d,]/g, '');
    const numericValue = cleanedInput.replace(/,/g, "");
    if (numericValue === "") {
      setDisplayValue("");
      setValue("");
      return;
    }
    
    if (!isNaN(numericValue)) {
      setValue(inputVal);
      setDisplayValue(formatWithCommas(numericValue));
    }
  }
  
  function formatWithCommas(value) {
    const strValue = String(value);
    return strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <label className="flex flex-col gap-1 bg-white rounded p-3">
      <span className="">{name}</span>
      <input
        type="text" 
        value={displayValue}
        onChange={handleChange}
        className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </label>
  );
};