import withd from "../../assets/icons/withdraw.svg";
import deposit from "../../assets/icons/deposit.svg";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

export default function Index() {
  const transactions = useSelector((state) => state.wallet.transactions);
  const transArray = Object.values(transactions);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  const itemsToDisplay = transArray?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(transArray?.length / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <main className="h-full flex flex-col gap-10">
      <b className="text-lg md:text-xl font-semibold flex items-center gap-3 cursor-pointer">
        Transactions
      </b>
      <div className="flex flex-col gap-5 bg-white p-5 rounded-2xl">
        <b className="text-primary font-bold">Transaction History</b>
        <div className="flex flex-col">
          {itemsToDisplay &&
            itemsToDisplay.map((transaction, i) => (
              <Single
                key={i}
                title={transaction.title}
                date={new Date(transaction.createdAt).toLocaleDateString()}
                amount={transaction.amount}
                status={transaction.status}
                type={transaction.type}
              />
            ))}
          {itemsToDisplay.length === 0 && (
            <p className="text-center">No transactions yet</p>
          )}
        </div>
        {itemsToDisplay.length > 0 && (
          <div className="flex gap-2 items-center py-2">
            <button
              onClick={handlePreviousPage}
              className="flex items-center gap-2 rounded-md bg-inherit border border-black text-black h-8 px-4"
            >
              <FaChevronLeft />
              Previous
            </button>
            {Array.from(Array(Math.ceil(transArray?.length / 10)).keys()).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`h-8 w-8 rounded-md ${
                    currentPage === pageNumber + 1
                      ? "bg-[#1E1E1E] text-white"
                      : "bg-[#E8E8E8] text-black"
                  }`}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              )
            )}
            <button
              onClick={handleNextPage}
              className="flex items-center gap-2 rounded-md bg-inherit border border-black text-black h-8 px-4"
            >
              Next
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

const Single = ({ title, date, amount, type, status }) => {
  return (
    <div className="flex gap-4 items-center py-4 border-b">
      <img
        src={type === "credit" ? deposit : withd}
        alt=""
        className="object-contain h-10 w-10"
      />
      <nav className="flex flex-col gap-1">
        <b className="font-medium text-primary capitalize">{title}</b>
        <div className="flex gap-2 items-center">
          <p>{type}</p>
          <p>{date}</p>
        </div>
      </nav>
      <span
        className={`${
          status === "success" ? "text-[#0EA169]" : "text-[#A10F18]"
        } ml-auto font-bold`}
      >
        {title === "deposit" ? "+" : "-"}N{amount} | {status}
      </span>
    </div>
  );
};
