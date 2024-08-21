import Footer from "../layout/Footer";
import ScrollToTop from "../layout/Scroll";
import PreHeader from "../layout/PreHeader";
import Header from "../layout/Header";
import onboard from "../assets/onboard.png";
import { Link, Outlet, useLocation } from "react-router-dom";
export default function Home() {
  const location = useLocation();

  const { pathname } = location;

  return (
    <main>
      <ScrollToTop />
      <PreHeader />
      <Header />
      <section className="bg-[#F9F9F9] flex flex-col-reverse md:grid grid-cols-2 ">
        <div className="w-full px-5 flex justify-center items-center py-10">
          <div
            className="w-full md:w-1/2 flex flex-col"
          >
            <nav className="flex items-center bg-[#FFF0E6] rounded-full p-2 w-full min-w-fit">
              <Link
                to="/onboard/register"
                className={`${
                  pathname === "/onboard/register" ? "bg-white" : ""
                } px-3 md:px-7 h-12 min-w-fit w-full rounded-full flex items-center justify-center`}
              >
                Register
              </Link>
              <Link
                to="/onboard/login"
                className={`${
                  pathname === "/onboard/login" ? "bg-white" : ""
                } px-3 md:px-7 h-12 min-w-fit w-full rounded-full flex items-center justify-center`}
              >
                Login
              </Link>
            </nav>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
        <figure className="w-full">
          <img src={onboard} alt="" className="w-full h-full object-cover" />
        </figure>
      </section>
      <Footer />
    </main>
  );
}
