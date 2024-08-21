import { useEffect, useState, useRef } from "react";
import icon1 from "../../assets/icons/settings/icon1.svg";
import icon2 from "../../assets/icons/settings/icon2.svg";
import icon3 from "../../assets/icons/settings/icon3.svg";
import icon4 from "../../assets/icons/settings/icon4.svg";
import icon5 from "../../assets/icons/settings/icon5.svg";
import Modal from "../../utils/Modal";
import close from "../../assets/icons/close.svg";
import { toast } from "react-hot-toast";
import CustomInput from "../../utils/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDp,
  updatePin,
  updateProfile,
} from "../../store/asyncActions/userAsyncActions";
import { isError, updateMessage } from "../../store/slices/userSlice";
import { Socials } from "./Socials";
import KYCVerification from "./KYCVerification";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Index() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const user = useSelector((state) => state.user.userDetails);
  const [showPin, setShowPin] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const fileHandler = (selectedFile) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

    if (selectedFile.length < 1) {
      return;
    }

    const file = selectedFile[0];
    const extension = file.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(extension)) {
      const formDetails = new FormData();
      formDetails.append(`image`, file);
      dispatch(updateDp(formDetails));
    } else {
      toast.error("File type not supported: " + file.name);
    }
  };

  return (
    <main className="h-full flex flex-col gap-10">
      <b className="text-lg md:text-xl font-semibold">Settings</b>
      <div className="md:w-1/3 flex flex-col gap-2 text-center justify-center items-center">
        <figure className="relative w-fit flex justify-center items-center">
          <input
            accept=".png, .jpg, .jpeg"
            value=""
            className="absolute opacity-0 w-full h-full top-0 bottom-0"
            ref={inputRef}
            type="file"
            onChange={(e) => fileHandler(e.target.files)}
          />
          <img
            src={user?.image?.url}
            alt=""
            className="object-contain rounded-[50%] h-12 aspect-square"
          />
        </figure>
        <p>{user?.name}</p>
        <span>{user?.email}</span>
      </div>
      <div className="flex flex-col gap-7 text-xl">
        <nav
          className="flex gap-5 items-center font-medium cursor-pointer"
          onClick={() => setShowKYC(true)}
        >
          <img src={icon1} alt="" className="object-contain h-12 w-12" />
          Edit Personal Data
        </nav>
        <nav
          className="flex gap-5 items-center font-medium cursor-pointer"
          onClick={() => setShowPin(true)}
        >
          <img src={icon1} alt="" className="object-contain h-12 w-12" />
          Reset Transaction Pin
        </nav>
        <nav
          className="flex gap-5 items-center font-medium cursor-pointer"
          onClick={() => setShowVerify(true)}
        >
          <img src={icon2} alt="" className="object-contain h-12 w-12" />
          KYC/Verification
        </nav>
        <a
          href="https://www.zippawallet.com/index.html#faq"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <nav className="flex gap-5 items-center font-medium cursor-pointer">
            <img src={icon3} alt="" className="object-contain h-12 w-12" />
            FAQ
          </nav>
        </a>
        <a
          href="https://www.zippawallet.com/privacy-policy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <nav className="flex gap-5 items-center font-medium cursor-pointer">
            <img src={icon3} alt="" className="object-contain h-12 w-12" />
            Privacy Policy
          </nav>
        </a>
        <a
          href="https://www.zippawallet.com/terms-of-use.html"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <nav className="flex gap-5 items-center font-medium cursor-pointer">
            <img src={icon4} alt="" className="object-contain h-12 w-12" />
            Terms of Use
          </nav>
        </a>
        <nav
          className="flex gap-5 items-center font-medium cursor-pointer"
          onClick={() => setShowSocials(true)}
        >
          <img src={icon5} alt="" className="object-contain h-12 w-12" />
          Social Media
        </nav>
      </div>
      {showPin && <Modal child={<ChildPin setShowModal={setShowPin} />} />}
      {showKYC && <Modal child={<ChildKYC setShowModal={setShowKYC} />} />}
      {showVerify && (
        <Modal child={<KYCVerification setShowModal={setShowVerify} />} />
      )}
      {showSocials && (
        <Modal child={<Socials setShowModal={setShowSocials} />} />
      )}
    </main>
  );
}

const ChildPin = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [showP3, setShowP3] = useState(false);
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPin !== confirmNewPin) {
      toast.error("New pin and confirm new pin does not match");
      return;
    }
    if (newPin.length !== 4) {
      toast.error("Pin must be 4 digits");
      return;
    }
    if (oldPin === newPin) {
      toast.error("Old pin and new pin cannot be the same");
      return;
    }
    if (oldPin.length !== 4) {
      toast.error("Old pin must be 4 digits");
      return;
    }
    const formDetails = new FormData();
    formDetails.append("oldPin", oldPin);
    formDetails.append("newPin", newPin);
    dispatch(updatePin(formDetails));
  };

  useEffect(() => {
    if (message === "Pin updated") {
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
      <h3 className="text-xl font-medium">RESET TRANSACTION PIN</h3>
      <p>
        Reset your transaction pin only if you feel it is open and compromised
      </p>
      <label className="flex flex-col gap-1 bg-white rounded p-3">
        <span className="">Old Pin</span>
        <div className="flex flex-col gap-1 w-full relative">
          <input
            type={showP1 ? "text" : "password"}
            placeholder=""
            className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
            value={oldPin}
            onChange={(e) => setOldPin(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowP1(!showP1);
            }}
            className="absolute right-3 bottom-3 z-10"
          >
            {showP1 ? <FaEyeSlash className="" /> : <FaEye className="" />}
          </button>
        </div>
      </label>
      <label className="flex flex-col gap-1 bg-white rounded p-3">
        <span className="">New Pin</span>
        <div className="flex flex-col gap-1 w-full relative">
          <input
            type={showP2 ? "text" : "password"}
            placeholder="PASSWORD"
            className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowP2(!showP2);
            }}
            className="absolute right-3 bottom-3 z-10"
          >
            {showP2 ? <FaEyeSlash className="" /> : <FaEye className="" />}
          </button>
        </div>
      </label>
      <label className="flex flex-col gap-1 bg-white rounded p-3">
        <span className="">Confirm New Pin</span>
        <div className="flex flex-col gap-1 w-full relative">
          <input
            type={showP3 ? "text" : "password"}
            placeholder=""
            className="h-12 px-3 border-b-[0.5px] border-[#A4A4A4] w-full bg-inherit outline-none"
            value={confirmNewPin}
            onChange={(e) => setConfirmNewPin(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowP3(!showP3);
            }}
            className="absolute right-3 bottom-3 z-10"
          >
            {showP3 ? <FaEyeSlash className="" /> : <FaEye className="" />}
          </button>
        </div>
      </label>
      <nav className="flex items-center justify-center gap-5 ">
        <button
          className={`w-2/3 h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
            loading ? "animate-pulse" : ""
          }`}
          onClick={handleSubmit}
        >
          Reset pin
        </button>
      </nav>
    </div>
  );
};

const ChildKYC = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);

  const day = new Date(user?.dob);
  const dayStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(day.getDate()).padStart(2, "0")}`;

  const [name, setName] = useState(user?.name);
  const [address, setAddress] = useState(user?.address);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [phone, setPhone] = useState(user?.phone);
  const [dob, setDob] = useState(dayStr);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDetails = new FormData();
    formDetails.append("name", name);
    formDetails.append("address", address);
    formDetails.append("username", username);
    formDetails.append("phone", phone);
    formDetails.append("dob", dob);
    dispatch(updateProfile(formDetails));
  };

  useEffect(() => {
    if (message === "User info updated") {
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
      <h3 className="text-xl font-medium">Update Information</h3>
      <p>Provide your correct information</p>
      <CustomInput
        name="Full name"
        value={name}
        setValue={setName}
        type="text"
      />
      <CustomInput
        name="Username"
        value={username}
        setValue={setUsername}
        type="text"
      />
      <CustomInput
        name="Address"
        value={address}
        setValue={setAddress}
        type="text"
      />
      <CustomInput
        name="Email"
        value={email}
        setValue={setEmail}
        type="email"
        disabled={true}
      />
      <CustomInput
        name="Phone Number"
        value={phone}
        setValue={setPhone}
        type="number"
      />
      <CustomInput
        name="Date of Birth"
        value={dob}
        setValue={setDob}
        type="date"
      />
      <nav className="flex items-center justify-center gap-5 ">
        <button
          className={`w-2/3 h-14 font-medium text-white rounded-xl flex items-center justify-center px-12 gap-2 transition-all ease-in-out duration-1000 bg-primary ${
            loading ? "animate-pulse" : ""
          }`}
          onClick={handleSubmit}
        >
          Update
        </button>
      </nav>
    </div>
  );
};
