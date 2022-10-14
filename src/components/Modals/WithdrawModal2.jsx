import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function WithdrawModal({ passed, setWithdrawModal, withdraw }) {
  const { darkMode } = useAuth();
  const navigate = useNavigate();
  const [ user, profile, setProfile, roles] = useOutletContext()
  console.log(withdraw)
  console.log(roles)

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
            <span className="font-bold text-lg">
              Withdraw Details ({withdraw?.application_meta?.applicants_name || withdraw?.transaction_meta?.member_name})
              <span
                className={` py-1 px-2 rounded-xl text-white text-xs ml-3 ${
                  withdraw?.transaction_meta ? "bg-green-400"
                    : withdraw?.application_meta?.review_status === "rejected"
                    ? "bg-red-400"
                    : "bg-yellow-400"
                }`}
              >
                { withdraw?.transaction_meta
                    ? "Approved" :
                    withdraw?.application_meta?.review_status === "rejected"
                    ? "Rejected"
                  : "Pending"}
              </span>
            </span>
            {
              withdraw?.application_meta && (
                roles.includes('treasurer') || 
                roles.includes('asst_treasurer') || 
                roles.includes('secretary') || 
                roles.includes('asst_secretary') ||
                roles.includes('chairperson') ||
                roles.includes('vice_chairperson')
              ) && 
              <button
                className="bg-green-500 text-white outline-offset-2 px-1 rounded-sm w-22 capitalize font-normal text-base py-0.5 ml-5 mr-5"
                onClick = {() => {
                  navigate(`/withdraw/members/${withdraw.application_id}`);
                }}
              >
                Verify
              </button>
            }
          </div>

          <div
            className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full cursor-pointer"
            onClick={() => setWithdrawModal(false)}
          >
            <IoCloseSharp />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">withdraw ID</p>
          <p className="font-bold col-span-3">: {withdraw?.app_id || withdraw?.application_id  || withdraw?.trans_id }</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Created At</p>
          <p className="font-bold col-span-3">:{" "} 
            {moment(withdraw?.created_at).format("Do MMMM YYYY, hh:mm a")}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Applicant's Name</p>
          <p className="font-bold col-span-3">: {" "}
            {withdraw?.application_meta?.applicants_name || withdraw?.transaction_meta?.fullname || "Unknown"}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Amount</p>
          <p className="font-bold col-span-3">: 
            UGX {currencyFormatter(withdraw?.application_meta?.amount || withdraw?.amount)}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Account Type:</p>
          <p className="font-bold col-span-3">:{" "}
            {withdraw?.application_meta?.account_type || withdraw?.transaction_meta?.account_type}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Cashout method</p>
          <p className="font-bold col-span-3">:{" "}
            {withdraw?.application_meta?.cashout_method || withdraw?.transaction_meta?.cashout_method}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Reason</p>
          <p className="font-bold col-span-3">:{" "}
            {withdraw?.application_meta?.comments || withdraw?.transaction_meta?.comments || "Unspecified"}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
