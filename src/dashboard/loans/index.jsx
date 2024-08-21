import loan from "../../assets/loan.png";

export default function Index() {
  return (
    <main className="py-10 flex flex-col items-center justify-center gap-7 text-center">
      <div className="md:w-1/2 flex flex-col gap-5 justify-center items-center">
        <b className="text-xl leading-normal font-semibold">
          Feature coming soon on zippa wallet
        </b>
        <img src={loan} alt="" className="object-contain" />
        <b className="text-2xl md:text-[32px] font-medium leading-snug text-black">
          Get instant access to loans
        </b>
        <p className="text-lg text-black md:w-2/3">
          Walk into any of our offices to get authenticated fast and easy
        </p>
      </div>
    </main>
  );
}
