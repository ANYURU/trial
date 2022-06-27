import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import moment from "moment";

export default function LoanModal({ passed, setLoanModal, loan }) {
  const { darkMode } = useAuth();
  console.log(loan);

  return ReactDOM.createPortal(
    <div
      className={`bg-black bg-opacity-30 z-40 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 overflow-scroll flex justify-center items-center ${
        darkMode ? "dark" : ""
      } `}
    >
      <div
        className="bg-white dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center mx-2 overflow-x-hidden overflow-y-scroll sm:mt-20 md:mt-10"
        ref={passed}
      >
        {/* {children} */}
        <div className="flex justify-between items-center w-full mb-5">
          <div>
            <h1 className="font-bold text-lg">
              Loan Details ({loan.loan_meta.applicants_name})
              <span
                className={` py-1 px-2 rounded-lg text-white text-xs ml-1 ${
                  loan.loan_status === "pending"
                    ? "bg-yellow-400"
                    : loan.loan_status === "paid"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              >
                {loan.loan_status}
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
          <p className="col-span-2">Loan ID:</p>
          <p className="font-bold col-span-3">{loan.id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Principal:</p>
          <p className="font-bold col-span-3">UGX {" "}
            {currencyFormatter(loan.amount_issued)}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Amount Paid:</p>
          <p className="font-bold col-span-3">UGX {" "}
            {currencyFormatter(loan.amount_paid)}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Interest Rate:</p>
          <p className="font-bold col-span-3">5%</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-5 justify-start w-full">
          <p className="col-span-2">Amount to pay:</p>
          <p className="font-bold col-span-3">
            {currencyFormatter(
              loan.outstanding_balance + 0.05 * loan.outstanding_balance
            )}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Approved at:</p>
          <p className="font-bold col-span-3">
            {moment(loan.loan_meta.approved_at).format("DD-MM-YYYY  hh:mm a")}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">End Date:</p>
          <p className="font-bold col-span-3">
            {moment(loan.end_date).format("DD-MM-YYYY hh:mm a")}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-5 justify-start w-full">
          <p className="col-span-2">Approved by:</p>
          <p className="font-bold col-span-3">{loan.loan_meta.approved_by}</p>
        </div>

          <h3 className="font-bold">Amortization Schedule</h3>
          <table className="w-[100%] text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-scroll">
            <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2">Principal</th>
                <th className="px-3 py-2">Interest</th>
                <th className="px-3 py-2">Amount to Pay</th>
                <th className="px-3 py-2">Balance</th>
              </tr>
            </thead>
            {loan.amortization_schedule && 
            loan.amortization_schedule.map((amort, index) => (
              <tr key={index}>
                <td className="px-3 py-2">{currencyFormatter(Math.round(amort.principal * 100)/100)}</td>
                <td className="px-3 py-2">{currencyFormatter(Math.round(amort.interest * 100)/100)}</td>
                <td className="px-3 py-2">{currencyFormatter(Math.round(amort.repayment_amount * 100)/100)}</td>
                <td className="px-3 py-2">{amort.outstanding_balance <=0 ? "0.00" : currencyFormatter(Math.round(amort.outstanding_balance * 100)/100)}</td>
              </tr>
            ))}
          </table>
        </div>
    </div>,
    document.getElementById("portal")
  );
}
