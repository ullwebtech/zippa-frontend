import Select from "react-select";
import { useSelector } from "react-redux";

const BankSelect = ({ bank, setBank }) => {
  const banks = useSelector((state) => state.wallet.banks);
  const options = banks.map((bank) => ({
    value: bank.code,
    label: bank.name,
  }));

  return (
    <div className="w-full flex flex-col gap-1">
      <span className="text-left">Select Bank</span>
      <Select
        options={options}
        value={bank}
        onChange={setBank}
        placeholder={"Select Bank"}
        className="w-full text-left h-12 text-sm"
      />
    </div>
  );
};

export default BankSelect;
