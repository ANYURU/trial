import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function LoanModal({ passed, setLoanModal, loan: {loan, payments} }) {
  const { darkMode } = useAuth();
  const navigate = useNavigate()
  const [ amortExpand, setAmortExpand ] = useState(true)
  const [ repaymentExpand, setRepaymentExpand] = useState(true)
  const [ {id: current_user} ] = useOutletContext()

  return ReactDOM.createPortal(
    <div
      className={`bg-black bg-opacity-30 z-40 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 overflow-scroll flex justify-center items-center max-h-full overflow-y-auto${
        darkMode ? "dark" : ""
      } `}
    >
      <div
        className="bg-white dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center mx-2 overflow-x-hidden overflow-y-scroll max-h-screen sm:mt-20 md:mt-10"
        ref={passed}
      >
        {/* {children} */}
        <div className="flex justify-between items-center w-full mb-5">
            <h1 className="font-bold text-lg flex flex-1 justify-center items-center">
              Loan Details ({loan.loan_meta.applicants_name})
              <span
                className={` py-1 px-2 rounded-lg text-white text-xs ml-1 ${
                  loan.loan_status === "pending"
                  ? "bg-yellow-400"
                  : loan.loan_status === "cleared"
                  ? "bg-green-400"
                  : loan.loan_status === "on going"
                  ? "bg-blue-400"
                  : "bg-red-400"
                }`}
              >
                {loan?.loan_status === "defaulted" ? "arrears" : loan.loan_status}
              </span>
              <span className='flex flex-1 justify-center'>
                {
                  loan?.loan_status !== "cleared" && 
                  <button
                    className="bg-green-500 text-white outline-offset-2 px-2 rounded-sm w-22 capitalize font-normal text-base py-1"
                    onClick = {() => {
                      navigate(`/loans/payment/${loan.id}`)
                    }}
                  >
                    Pay Now
                  </button>
                }
              </span>
            </h1>
            <button
              className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full cursor-pointer"
              onClick={() => setLoanModal(false)}
            >
              <IoCloseSharp />
            </button>
         
        </div>
        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Loan ID:</p>
          <p className="font-bold col-span-3">{loan.loan_id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Principal:</p>
          <p className="font-bold col-span-3">
            UGX {currencyFormatter(loan.amount_issued)}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Amount Paid:</p>
          <p className="font-bold col-span-3">
            UGX {currencyFormatter(loan.amount_paid)}
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Interest Rate:</p>
          <p className="font-bold col-span-3">{loan?.interest_rate}%</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Interest Paid:</p>
          <p className="font-bold col-span-3">UGX {loan?.interest_paid}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-5 justify-start w-full">
          <p className="col-span-2">Amount to pay:</p>
          <p className="font-bold col-span-3">
            {currencyFormatter(
              loan.outstanding_balance + (loan.interest_rate/100 * loan.outstanding_balance)
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
              
        <div className="flex justify-between w-[100%]"><span className="font-bold">Amortization Schedule</span> 
          {/* <button
            className="cursor-pointer"
            type="button"
            onClick={() => {
              setAmortExpand(!amortExpand)
            }}
          >{amortExpand ? "collapse" : "expand"}</button> */}

          { 
          
          loan.amortization_schedule.length > 2 && loan.amortization_schedule.length !== 3 &&
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                setAmortExpand(!amortExpand)
              }}
            >{amortExpand ? "collapse" : "expand"}</button>
          }
        </div> 



        <table className="w-[100%] text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-scroll">
          <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
            <tr>
              <th className="px-8 py-2">Date</th>
              <th className="px-8 py-2">Principal</th>
              <th className="px-8 py-2">Interest Paid</th>
              <th className="px-8 py-2">Amount To Pay</th>
              <th className="px-8 py-2">Reducing Balance</th>
            </tr>
          </thead>
          <tbody>
            {loan.amortization_schedule &&
              loan.amortization_schedule.map((amort, index) => (
                <tr key={index} className={`${amortExpand ? "" : "hidden"}`}>
                  <td className="px-8 py-2">
                    {console.log(amort)}
                    {moment(loan.created_at).add(amort.month, "months").format("DD-MM-YYYY")}
                  </td>
                  <td className="px-8 py-2">
                    {currencyFormatter(Math.round(amort.principal_installment * 100) / 100)}
                  </td>
                  <td className="px-8 py-2">
                    {currencyFormatter(Math.round(amort.interest * 100) / 100)}
                  </td>
                  <td className="px-8 py-2">
                    { amort.repayment_balance <= 0
                      ? "0.00"
                      : currencyFormatter(
                      Math.round(amort.repayment_amount * 100) / 100
                    )}
                  </td>
                  <td className="px-8 py-2">
                    {amort.reducing_balance <= 0
                      ? "0.00"
                      : currencyFormatter(
                          Math.round(amort.reducing_balance * 100) / 100
                        )}

                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between w-[100%]"><span className="font-bold">Repayments</span> 
          {
            payments?.length > 2 && payments.length !== 3 &&
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                setRepaymentExpand(!repaymentExpand)
              }}
            >{repaymentExpand ? "collapse" : "expand"}</button>
          }
        </div>
        { 
          payments && payments?.length > 0 ? 
          <>
            <table className="w-[100%] text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-scroll">
              <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                <tr>
                  <th className="px-8 py-2">Date</th>
                  <th className="px-8 py-2">Principal</th>
                  <th className="px-8 py-2">Interest Paid</th>
                  <th className="px-8 py-2">Amount To Pay</th>
                  <th className="px-8 py-2">Reducing Balance</th>
                </tr>
              </thead>
              {
                payments.map((payment, index) => (
                  <tr 
                    key={index}
                    className={`${repaymentExpand && payments > 3 ? "hidden" : ""}`}
                  >
                    <td className="px-8 py-2">
                      {moment(payment.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-8 py-2">
                      {currencyFormatter(Math.round(payment.amount * 100) / 100)}
                    </td>
                    <td className="px-8 py-2">
                      {currencyFormatter(Math.round(payment?.transaction_meta?.interest_paid * 100) / 100)}
                    </td>
                    <td className="px-8 py-2">
                      {currencyFormatter(
                        Math.round(payment?.transactions_meta?.amount_to_pay ?? 0 * 100) / 100
                        )}
                    </td>
                    <td className="px-8 py-2">
                      {payment?.reducing_balance <= 0
                        ? "0.00"
                        : currencyFormatter(
                          Math.round(payment?.reducing_balance ?? 0 * 100) / 100
                          )}
                    </td>
                  </tr>
                ))
              }
              </table>
            
            <div className="flex justify-center">
            {
              loan?.loan_status === "cleared" ? (loan?.member_id === current_user ? 'Thank you for clearing your loan.': 'Loan Cleared') 
              : loan?.loan_status === "on going" ? (loan?.member_id === current_user && 'You are advised to clear your monthly repayments. Thank you.')
              : loan?.loan_status === "pending" ? (loan?.member_id === current_user ? 'Your loan repayment period starting soon.' : 'loan yet to start')
              : loan?.loan_status === "defaulted" && (loan?.member_id === current_user ? "Please clear your arrears." : "Please remind the member to clear the loan.")
            }
            </div>
            </>
          :
          <div className="flex flex-col gap-2 items-center">
              You haven't made any payments yet.
          </div>
        }
        </div>
      </div>,
    document.getElementById("portal")
  );
}
