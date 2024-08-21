import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import Register from "./onboarding/Register";
import ConfirmReg from "./onboarding/ConfirmReg";
import Login from "./onboarding/Login";
import ResetMail from "./onboarding/ResetMail";
import VerifyCode from "./onboarding/VerifyCode";
import ChangeUserPassword from "./onboarding/ChangePassword";
import Dashboard from "./dashboard/Dashboard";
import DashboardHome from "./dashboard/home";
import Plans from "./dashboard/home/plans";
import Bills from "./dashboard/home/bills";
import Transfer from "./dashboard/home/transfer";
import CompleteTransfer from "./dashboard/home/transfer/Complete";
import Loans from "./dashboard/loans";
import Settings from "./dashboard/settings";
import AutoSaving from "./dashboard/target/Auto";
import FlexSaving from "./dashboard/target/Flex";
import SingleAuto from "./dashboard/target/SingleAuto";
import Thrift from "./dashboard/thrift";
import SingleThrift from "./dashboard/thrift/SingleThrift";
import FixedSaving from "./dashboard/lock";
import SingleFixed from "./dashboard/lock/SingleLock";
import BenefitSaving from "./dashboard/benefits";
import BenefitPlans from "./dashboard/benefits/Plans";
import SingleBenefit from "./dashboard/benefits/SingleBenefit";
import KidsSaving from "./dashboard/kiddies";
import KidsPlans from "./dashboard/kiddies/Plans";
import SingleKids from "./dashboard/kiddies/SingleKids";
import Transactions from "./dashboard/transactions";
import CreatePin from "./onboarding/CreatePin";
import ConfirmPin from "./onboarding/ConfirmPin";
import DeleteAccount from "./onboarding/DeleteAccount";
import { periodicFetch } from "./store/asyncActions/walletAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Logout } from "./utils/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/confirm-registration",
    element: <ConfirmReg />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-pin",
    element: <CreatePin />,
  },
  {
    path: "/confirm-pin",
    element: <ConfirmPin />,
  },
  {
    path: "/forgot-password",
    element: <ResetMail />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/change-password",
    element: <ChangeUserPassword />,
  },
  {
    path: "/delete-account",
    element: <DeleteAccount />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "savings",
        element: <Plans />,
      },
      {
        path: "savings/auto-saving",
        element: <AutoSaving />,
      },
      {
        path: "savings/auto-saving/:id",
        element: <SingleAuto />,
      },
      {
        path: "savings/flex-saving",
        element: <FlexSaving />,
      },
      {
        path: "savings/thrift",
        element: <Thrift />,
      },
      {
        path: "savings/thrift/:id",
        element: <SingleThrift />,
      },
      {
        path: "savings/fixed-deposit",
        element: <FixedSaving />,
      },
      {
        path: "savings/fixed-deposit/:id",
        element: <SingleFixed />,
      },
      {
        path: "savings/save-with-benefit",
        element: <BenefitSaving />,
      },
      {
        path: "savings/save-with-benefit/plans",
        element: <BenefitPlans />,
      },
      {
        path: "savings/save-with-benefit/:id",
        element: <SingleBenefit />,
      },
      {
        path: "savings/smart-kiddies",
        element: <KidsSaving />,
      },
      {
        path: "savings/smart-kiddies/plans",
        element: <KidsPlans />,
      },
      {
        path: "savings/smart-kiddies/:id",
        element: <SingleKids />,
      },
      {
        path: "home/bills",
        element: <Bills />,
      },
      {
        path: "home/bills&utilities",
        element: <Bills />,
      },
      {
        path: "home/send-money",
        element: <Transfer />,
      },
      {
        path: "home/send-money/complete",
        element: <CompleteTransfer />,
      },
      {
        path: "loan",
        element: <Loans />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const verified = useSelector((state) => state.user.verified);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!verified) return;
      dispatch(periodicFetch());
    };
    fetchData();

    const intervalId = setInterval(fetchData, 900000);

    return () => clearInterval(intervalId);
  }, [dispatch, verified]);

  const handleLogout = useCallback(() => {
    if (!verified) return (window.location.href = "/login");
    Logout("You have been logged out due to inactivity", "/login");
  }, [verified]);

  const onIdle = () => {
    console.log("User is idle");
    handleLogout();
  };

  const onActive = () => {
    console.log("User is active");
  };

  const onAction = () => {
    console.log("User did something");
  };

  useIdleTimer({
    ref: idleTimerRef,
    timeout: 1000 * 60 * 30,
    onIdle,
    onActive,
    onAction,
    debounce: 500,
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("hiddenTime", Date.now().toString());
      } else if (document.visibilityState === "visible") {
        const hiddenTime = localStorage.getItem("hiddenTime");
        if (hiddenTime) {
          const timeAway = Date.now() - Number(hiddenTime);
          if (timeAway > 1000 * 60 * 30) {
            handleLogout();
          } else {
            localStorage.removeItem("hiddenTime");
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleLogout]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <Outlet />
      <span className="hidden">COURTESY OF: JDAVYDZ</span>
    </div>
  );
}

export default App;
