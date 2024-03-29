import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import moment from "moment";

export default function LoanPayModal({ passed, setLoanModal, loan }) {
  const { darkMode } = useAuth();

  // console.log(loan)

  const navigate = useNavigate();
  return ReactDOM.createPortal(
    <div
      className={`bg-black bg-opacity-30 z-20 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${
        darkMode ? "dark" : ""
      } `}
    >
      <div
        className="bg-white dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center"
        ref={passed}
      >
        {/* {children} */}
        <div className="flex justify-between items-center w-full mb-5">
          <div>
            <h1 className="font-bold text-lg">
              Loan Payment Details
              <span
                className={` py-1 px-2 rounded-lg text-white text-xs ml-1 ${
                  loan?.transaction_meta ? 
                  'bg-green-400' :
                  loan?.application_meta?.review_status === 'rejected'
                  ? 'bg-red-400' :
                  'bg-yellow-400'
                }`}
              >
                {loan?.loan_status === "defaulted" ? "arrears" : loan?.transaction_meta ? "approved" : loan?.loan_status}
              </span>
            </h1>
          </div>

          <div
            className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full cursor-pointer"
            onClick={() => setLoanModal(false)}
          >
            <IoCloseSharp />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Payment ID:</p>
          <p className="font-bold col-span-3">{loan?.application_id || loan?.trans_id || loan?.transaction_id}</p>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Applicant's name:</p>
          <p className="font-bold col-span-3">
            {loan?.application_meta?.applicants_name || loan?.transaction_meta?.member_name}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Amount Paid:</p>
          <p className="font-bold col-span-3">
            UGX {currencyFormatter(loan?.application_meta?.amount || loan?.amount)}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Account Type:</p>
          <p className="font-bold col-span-3">
            {loan?.application_meta?.account_type || loan?.transaction_meta?.account_type}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Phone Number:</p>
          <p className="font-bold col-span-3">
            {loan?.application_meta?.phone_number || loan?.transaction_meta?.phone_number || "Unspecified"}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Reason:</p>
          <p className="font-bold col-span-3">
            {loan?.application_meta?.comments || loan?.transaction_meta?.comments || "Unspecified"}
          </p>
        </div>

        {loan?.application_meta?.review_status &&
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Reviewd by:</p>
          <p className="font-bold col-span-3">
            {loan?.application_meta.reviewed_by}
          </p>
        </div>
        }
        {loan?.transaction_meta &&
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Reviewd by:</p>
          <p className="font-bold col-span-3">
            {loan?.transaction_meta?.reviewed_by || "Organisation"}
          </p>
        </div>
        }
      </div>
    </div>,
    document.getElementById("portal")
  );
}
