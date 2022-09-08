import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";

export default function WithdrawModal({ passed, setWithdrawModal, withdraw }) {
  console.log(withdraw)

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
            <h1 className="font-bold text-lg">Withdraw Details</h1>
          </div>

          <div
            className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full cursor-pointer"
            onClick={() => setWithdrawModal(false)}
          >
            <IoCloseSharp />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">withdraw ID:</p>
          <p className="font-bold col-span-3">:{" "} {withdraw.app_id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Created At</p>
          <p className="font-bold col-span-3">:{" "}
            {moment(withdraw.created_at).format("Do MMMM YYYY, hh:mm a")}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Amount</p>
          <p className="font-bold col-span-3">: {" "}
            UGX {currencyFormatter(withdraw.amount)}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Status</p>
          <p className="font-bold col-span-3">: {" "}
            {withdraw.application_meta.review_status}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
