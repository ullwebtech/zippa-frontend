import toast from "react-hot-toast";
import check from "../assets/check.png";
import close from "../assets/icons/close.svg";
import { FaClipboard } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateToken } from "../store/slices/billsSlice";
import { useNavigate } from "react-router-dom";

export const Success = ({ setShowModal, text, setStep, token, slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success("Token copied");
      dispatch(updateToken(null));
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center items-center gap-5 md:gap-8">
      <button
        onClick={() => {
          setShowModal(false);
          setStep(1);
        }}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <img src={check} alt="" className="object-contain mx-auto" />
      <h3 className="text-xl text-[#006D2D] font-medium">Success</h3>
      <p className="text-center">{text}</p>
      {token && (
        <p
          onClick={copyToClipboard}
          className="rounded-xl w-full border bg-white flex h-14 justify-center items-center relative"
        >
          {token}
          <FaClipboard className="absolute right-3 text-sm" />
        </p>
      )}
      <nav className="flex items-center justify-center gap-5 w-full">
        {slug ? (
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary`}
            onClick={() => navigate(slug)}
          >
            Continue
          </button>
        ) : (
          <button
            className={`w-full h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary`}
            onClick={() => {
              setShowModal(false);
              setStep(1);
            }}
          >
            Continue
          </button>
        )}
      </nav>
    </div>
  );
};
