import { toast } from "react-hot-toast";
import CustomInput from "../../utils/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { verifyBVN } from "../../store/asyncActions/userAsyncActions";
import { isError, updateMessage } from "../../store/slices/userSlice";
import { useEffect, useState } from "react";
import close from "../../assets/icons/close.svg";

export default function KYCVerification({ setShowModal }) {
  const dispatch = useDispatch();
  const [bvn, setBvn] = useState("");
  const user = useSelector((state) => state.user.userDetails);
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = new FormData();
    formDetails.append("bvn", bvn);
    dispatch(verifyBVN(formDetails));
  };

  useEffect(() => {
    if (message === "BVN verified") {
      toast.success(message);
      dispatch(updateMessage(""));
      setShowModal(false);
    }
  }, [message, dispatch, setShowModal]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(isError(""));
    }
  }, [error, dispatch]);

  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center gap-5 md:gap-8">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-xl font-medium">KYC VERIFICATION</h3>
      <p>Simply verify your identity to complete the KYC registration.</p>
      <small className="text-red-500">
        *Ensure Profile is complete before attempt
      </small>
      {user.bvnVerified && <p className="text-green-500">BVN verified</p>}
      {!user.bvnVerified && (
        <>
          <CustomInput
            name="Enter Bank Verification Number"
            value={bvn}
            setValue={setBvn}
            type="text"
          />
          <nav className="flex items-center justify-center gap-5 ">
            <button
              className={`w-2/3 h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
                loading ? "animate-pulse" : ""
              }`}
              onClick={handleSubmit}
            >
              Verify BVN
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
