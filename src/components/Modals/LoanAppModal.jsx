import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import moment from "moment";

export default function LoanModal({ passed, setLoanModal, loan }) {
  const { darkMode } = useAuth();

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
              Loan Application Details
              <span
                className={` py-1 px-2 rounded-lg text-white text-xs ml-1 ${
                  !loan.reviewed
                    ? "bg-yellow-400"
                    : loan.application_meta.review_status === "approved"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              >
                {!loan.reviewed
                  ? "Pending"
                  : loan.application_meta.review_status === "approved"
                  ? "Approved"
                  : "Rejected"}
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
              <p className="col-span-2">Application ID:</p>
              <p className="font-bold col-span-3">{loan.application_id}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Applicant's name:</p>
              <p className="font-bold col-span-3">{loan.application_meta.applicants_name}</p>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Amount Requested:</p>
              <p className="font-bold col-span-3">UGX {currencyFormatter(loan.application_meta.amount)}</p>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Amount in words:</p>
              <p className="font-bold col-span-3">{loan.application_meta.amount_in_words}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Assets:</p>
              <p className="font-bold col-span-3">{loan.application_meta.asset1}, {loan.application_meta.asset2}, {loan.application_meta?.asset3 && loan.application_meta.asset3}</p>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Loan Type:</p>
              <p className="font-bold col-span-3">{loan.application_meta.loan_type}</p>
          </div>
          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Duration:</p>
              <p className="font-bold col-span-3">{loan.application_meta.months} months</p>
          </div>
        {/* 



          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Interest Rate:</p>
              <p className="font-bold col-span-3">5%</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-5 justify-start w-full">
              <p className="col-span-2">Amount to pay:</p>
              <p className="font-bold col-span-3">{currencyFormatter(loan.outstanding_balance + 0.05 * loan.outstanding_balance)}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Approved at:</p>
              <p className="font-bold col-span-3">{moment(loan.loan_meta.approved_at).format("DD-MM-YYYY  HH:MM")}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">End Date:</p>
              <p className="font-bold col-span-3">{moment(loan.end_date).format("DD-MM-YYYY HH:MM")}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Approved by:</p>
              <p className="font-bold col-span-3">{loan.loan_meta.approved_by}</p>
          </div> */}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
