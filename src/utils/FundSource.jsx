import { useSelector } from "react-redux";

export const FundSource = ({
  source,
  setSource,
  cardDetails,
  setCardDetails,
  removeAddCard,
}) => {
  const wallet = useSelector((state) => state.wallet.wallet);
  const cards = useSelector((state) => state.wallet.cards);

  return (
    <div className="flex flex-col gap-2">
      <b>Select a funding source</b>
      <div className="flex gap-2 ">
        {cards?.slice(0, 2)?.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 items-center rounded px-3 py-5 bg-[#D7EDFF] text-[#0089FA]
              ${
                source === "card" && cardDetails?.id === card?.id
                  ? "border-4 border-primary"
                  : ""
              }
              `}
            onClick={() => {
              setSource("card");
              setCardDetails(card);
            }}
          >
            <p>Debit Card</p>
            <b alt="" className="text-sm">
              {card?.authorization?.account_name}
            </b>
            <b className="text-sm">****{card?.authorization?.last4}</b>
          </div>
        ))}
        <div
          className={`flex flex-col gap-2 items-center rounded px-3 py-5 bg-[#C1FFDB] text-[#01C853]
          ${source === "wallet" ? "border-4 border-primary" : ""}
          `}
          onClick={() => setSource("wallet")}
        >
          <p>Zippa Wallet</p>
          <b alt="" className="text-sm">
            ₦{Number(wallet?.amount).toFixed(2)}
          </b>
        </div>
        {removeAddCard ? null : (
          <div
            className={`flex flex-col gap-2 items-center rounded px-3 py-5 bg-[#D7EDFF] text-[#0089FA]
          ${source === "add" ? "border-4 border-primary" : ""}
          `}
            onClick={() => setSource("add")}
          >
            <b>Add Card</b>
            <p className="text-sm">Link a card</p>
          </div>
        )}
      </div>
    </div>
  );
};
