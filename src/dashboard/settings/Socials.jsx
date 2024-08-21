import close from "../../assets/icons/close.svg";
import social from "../../assets/social.png";

export const Socials = ({ setShowModal }) => {
  return (
    <div className="w-full h-full relative p-5 md:p-10 flex flex-col justify-center items-center text-center text-base gap-4">
      <button
        onClick={() => setShowModal(false)}
        className={`flex items-center justify-center h-10 w-10 absolute top-3 right-3`}
      >
        <img src={close} alt="" className="w-full h-full" />
      </button>
      <div className="text-start mr-auto flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">WE ARE SOCIAL</h3>
        <p>Like and follow us on all our social media platforms</p>
      </div>
      <img src={social} alt="" className="object-contain" />
      <b className="text-xl text-primary font-semibold">We are social</b>
      <a href="https://web.facebook.com/profile.php?id=100063653785332&mibextid=LQQJ4d&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="w-full">
        <nav className="bg-white text-[#3D92D7] w-full h-14 rounded-lg px-5 flex items-center justify-center gap-1">
          Zippa Wallet on Facebook
        </nav>
      </a>
      <a href="https://www.instagram.com/zippawalletapp" target="_blank" rel="noopener noreferrer" className="w-full">
        <nav className="bg-white text-[#9203BB] w-full h-14 rounded-lg px-5 flex items-center justify-center gap-1">
          Zippa Wallet on Instagram
        </nav>
      </a>
      <a href="http://" target="_blank" rel="noopener noreferrer" className="w-full">
        <nav className="bg-white text-primary w-full h-14 rounded-lg px-5 flex items-center justify-center gap-1">
          Zippa Wallet on X
        </nav>
      </a>
      <a href="https://www.youtube.com/@capitaledgemcsl" target="_blank" rel="noopener noreferrer" className="w-full">
        <nav className="bg-white text-[#3D92D7] w-full h-14 rounded-lg px-5 flex items-center justify-center gap-1">
          Zippa Wallet on Youtube
        </nav>
      </a>
    </div>
  );
};
