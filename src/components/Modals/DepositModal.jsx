import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";

export default function DepositModal({ passed, setDepositModal, deposit }) {
  const { darkMode } = useAuth();

  return ReactDOM.createPortal(
    <div
      className={`bg-black bg-opacity-20 z-40 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${
        darkMode ? "dark" : ""
      } `}
    >
      <div
        className="bg-white mx-2 dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center"
        ref={passed}
      >
        {/* {children} */}
        <div className="flex justify-between items-center w-full mb-5">
          <div>
            <h1 className="font-bold text-lg">Deposit Details</h1>
          </div>

          <div
            className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full cursor-pointer"
            onClick={() => setDepositModal(false)}
          >
            <IoCloseSharp />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-1">Deposit ID</p>
          <p className="font-bold col-span-3 pl-8">: {deposit?.trans_id || deposit?.app_id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-1">Created At</p>
          <p className="font-bold col-span-3 pl-8">
            : {moment(deposit.created_at).format("DD-MM-YYYY, hh:mm a")}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-1">Amount</p>
          <p className="font-bold col-span-3 pl-8">
            : UGX {currencyFormatter(deposit?.amount || deposit?.application_meta?.amount)}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-1">Account</p>
          <p className="font-bold col-span-3 pl-8">
            : {deposit?.transaction_meta?.account_type || deposit?.application_meta?.amount}
          </p>
        </div>
        {
          deposit?.transaction_meta && 
          <>
            <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-1">Approved at</p>
              <p className="font-bold col-span-3 pl-8">
                :{" "}
                {moment(deposit?.transaction_meta?.approved_at).format(
                  "DD-MM-YYYY, hh:mm a"
                )}
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-1">Status</p>
            <p className="font-bold col-span-3 pl-8">
              : {<span className="bg-green-400 py-1 px-2 rounded-xl text-white">approved</span>}
            </p>
          </div>
        </>
        }
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-1">{deposit?.transaction_meta ? "Approved by" : "Status"}</p>
          <p className="font-bold col-span-3 pl-8">
            : {deposit?.transaction_meta ? deposit?.transaction_meta?.approved_by : <span className={` py-1 px-2 rounded-xl text-white ${
                deposit?.application_meta?.review_status === "pending"
                ? "bg-yellow-400"
                : deposit?.application_meta?.review_status === "rejected" ?
                "bg-red-400" 
                : "bg-green-400"
              }`}>{deposit?.application_meta?.review_status}</span>}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
