import close from "../../../assets/icons/close.svg";
import logo from "../../../assets/logo-ce.png";

export const Support = ({ setShowModal }) => {
  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center items-center text-center text-base gap-4">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <h3 className="text-2xl text-primary font-semibold">Customer Support</h3>
      <p>You can reach the zippa support team</p>
      <p>09:00Am - 05:00PM</p>
      <p>Monday - Friday</p>
      <a className="w-full" href="mailto:support@zippawallet.com">
        <nav className="bg-white w-full h-14 rounded-lg px-5 flex items-center justify-center gap-1">
          write us:
          <span className="text-primary">support@zippawallet.com</span>
        </nav>
      </a>
      <a className="w-full" href="https://wa.me/2348036923643">
        <nav className="bg-white w-full h-14 rounded-lg px-5 flex items-center justify-center gap-1">
          WhatsApp:
          <span className="text-primary">+234 803 692 3643</span>
        </nav>
      </a>
      <nav className="bg-white w-full h-14 rounded-lg px-5 flex items-center justify-center gap-1">
        visit our website:
        <span className="text-primary">zippawallet.com</span>
      </nav>
      <b className="text-xl text-primary font-semibold">Zippa Wallet</b>
      <p>A product of Capital Edge Group</p>
      <img src={logo} alt="" className="object-contain" />
      <p>
        House 1, 2nd Avenue, Gwarinmpa, FCT <br />
        Abuja, Nigerai
      </p>
    </div>
  );
};
