export default function CustomInput({
  name,
  value,
  setValue,
  type,
  disabled,
  min,
}) {
  return (
    <label className="flex flex-col gap-1 bg-white rounded p-3">
      <span className="">{name}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        min={type === "date" && min ? min : null}
        onChange={(e) => setValue(e.target.value)}
        className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
      />
    </label>
  );
}
