import close from "../../../assets/icons/close.svg";
export const Withdraw = ({ setShowModal, nextStep }) => {
  const handleSubmit = () => {
    nextStep();
  };
  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-xl font-medium">Withdraw Savings</h3>
      <p>Are you sure you want to withdraw savings?</p>
      <nav className="flex flex-col items-center justify-center gap-5 ">
        <button
          className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary`}
          onClick={handleSubmit}
        >
          Yes, Withdraw
        </button>
        <button
          className={`w-full h-14 font-medium text-primary border border-primary rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-inherit`}
          onClick={() => setShowModal(false)}
        >
          No, Cancel
        </button>
      </nav>
    </div>
  );
};
