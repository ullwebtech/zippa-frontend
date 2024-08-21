import {
  FaCashRegister,
  FaChartBar,
  FaCreditCard,
  FaHeadphones,
  FaHome,
  FaUniversity,
  FaUserCog,
} from "react-icons/fa";

export const navLinks = [
  {
    path: "home",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "savings",
    name: "Savings",
    icon: <FaCreditCard />,
  },
  {
    path: "bills",
    name: "Bills & Payments",
    icon: <FaCashRegister />,
  },
  {
    path: "transactions",
    name: "Transactions",
    icon: <FaChartBar />,
  },
  {
    path: "loan",
    name: "Loan",
    icon: <FaUniversity />,
  },
  {
    path: "settings",
    name: "Settings",
    icon: <FaUserCog />,
  },
  {
    path: "support",
    name: "Support",
    icon: <FaHeadphones />
  }
];
