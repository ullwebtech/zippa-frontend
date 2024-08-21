import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// import { errorStyle } from "../utils/ToastStyle";
import logo from "../assets/logo.svg";
import { navLinks } from "./Navlinks";
import dp from "../assets/dp.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Logout } from "../utils/Logout";
import bell from "../assets/bell.svg";
import Drop from "../utils/Drop";
// import profile from "../assets/icons/profile.svg";
import lg from "../assets/icons/logout.svg";
import settings from "../assets/icons/settings.png";
import SideBarBtn from "../utils/SideBarBtn";
import { logout } from "../store/asyncActions/userAsyncActions";
import SupportBtn from "../utils/SupportBtn";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);
  const verified = useSelector((state) => state.user.verified);
  const message = useSelector((state) => state.user.message);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (message === "Logged out successfully") {
      Logout("Logged out successfully", "/login");
    }
  }, [message, navigate]);

  useEffect(() => {
    if (!verified) {
      navigate("/login");
    }
  }, [verified, navigate]);

  return (
    <main className="md:grid grid-cols-[1.3fr_5fr] h-screen lato">
      <aside
        className={`${
          open ? " left-0 top-0 " : " left-[-900%] top-0"
        } fixed md:static  z-[999999999]  transition-all duration-1000 ease-in-out overflow-y-scroll snap w-3/4 md:w-full px-5 py-16 h-full flex flex-col gap-5 md:gap-10 bg-primary`}
      >
        <div
          className="md:hidden absolute top-3 right-3"
          onClick={() => setOpen(!open)}
        >
          <FaTimes className="text-xl" />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center text-dark md:hidden">
          <img src={dp} alt="" className="h-20 w-20 rounded-[50%]  md:hidden" />
          <span className="text-white">{user.name}</span>
        </div>
        <img src={logo} alt="" className="h-20 hidden md:block" />
        <ul className="flex flex-col gap-5 w-full">
          {navLinks.map((link, index) => (
            <li key={index} className="w-full rounded-md min-h-fit font-medium">
              {link.path === "bills" ? (
                <SideBarBtn />
              ) : link.path === "support" ? (
                <SupportBtn />
              ) : (
                <NavLink
                  to={`${link.path}`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "bg-[#E8FFF1] text-secondary py-2 px-5 rounded-md flex items-center gap-3 w-full"
                      : isPending
                      ? "py-2 animate-pulse w-full bg-admin"
                      : "py-2 px-5 rounded-md text-white text-center flex items-center gap-3 w-full"
                  }
                >
                  {link.icon} {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <section className="overflow-y-scroll min-h-screen bg-[#F4F6FC] w-full flex flex-col">
        <header className="px-5 md:pl-10 md:pr-20 py-2 md:py-4 flex justify-end items-center min-h-fit z-10 gap-5 bg-white">
          <div className="md:hidden mr-auto" onClick={() => setOpen(!open)}>
            <FaBars className="text-xl" />
          </div>
          <Drop
            Main={() => (
              <img src={bell} alt="" className="object-contain h-8 w-8" />
            )}
            Dropdown={() => (
              <div className="text-xs bg-white z-10 mt-2g rounded-xl shadow-[0px_2px_16px_0px_rgba(17,24,39,0.08)] flex flex-col divide-y">
                <p className="py-4 px-4 md:whitespace-nowrap">
                  A request was submitted for the approval of...
                </p>
                <p className="py-4 px-4 md:whitespace-nowrap">
                  A request was submitted for the approval of...
                </p>
                <p className="py-4 px-4 md:whitespace-nowrap">
                  A request was submitted for the approval of...
                </p>
              </div>
            )}
          />
          <Drop
            Main={() => (
              <div className="flex gap-3 items-center cursor-pointer">
                <img src={user?.image?.url} alt="" className="object-contain rounded-[50%] h-8 aspect-square" />
                {/* <span className="hidden md:block">{user?.name}</span>
                <FaChevronDown className="hidden md:block" /> */}
              </div>
            )}
            Dropdown={() => (
              <div className="text-xs bg-white rounded-xl shadow-[0px_2px_16px_0px_rgba(17,24,39,0.08)] flex flex-col divide-y mx-auto">
                {/* <nav
                  className="flex items-center gap-2 cursor-pointer py-4 px-4 pr-14"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <img src={profile} alt="" className="object-contain" />
                  <span>Profile</span>
                </nav> */}
                <nav
                  className="flex items-center gap-2 cursor-pointer py-4 px-4 pr-14"
                  onClick={() => navigate("/dashboard/settings")}
                >
                  <img src={settings} alt="" className="object-contain" />
                  <span>Settings</span>
                </nav>
                <nav
                  className="flex items-center gap-2 cursor-pointer py-4 px-4 pr-14 text-red"
                  onClick={handleLogout}
                >
                  <img src={lg} alt="" className="object-contain" />
                  <span>Logout</span>
                </nav>
              </div>
            )}
            direction="right-0"
          />
        </header>
        <section className={`p-5 md:p-10 mb-auto`}>
          <Outlet />
        </section>
        <div className="flex flex-col gap-2 py-4 px-10 bg-white text-sm text-center mt-10">
          <p>
            Zippa Wallet is a product duely owned by Capital Edge Multipurpose
            Cooperative Society (Capital Edge MCSL). Capital Edge MCSL is a
            corporative duly licensed as a Cooporative and a Money Lender by The
            Federal Capital Territory Administration.
          </p>
          <p>
            (c) 2024 Zippa Wallet (A Capital Edge MCSL Product - RC 1865000)
          </p>
        </div>
      </section>
    </main>
  );
}
