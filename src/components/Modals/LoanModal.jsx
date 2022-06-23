import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { IconContext } from "react-icons/lib";
import AmortizationSchedule from "../AmortizationSchedule"

export default function LoanModal({ passed, setLoanModal, loan, amortization_schedule, start_date }) {

    const { darkMode } = useAuth()

    console.log(loan)

  const navigate = useNavigate()
  return ReactDOM.createPortal(
    <div className={`bg-black bg-opacity-30 z-20 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${darkMode ? "dark" : ""} `}>
      <div className="bg-white dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center" ref={passed}>
        {/* {children} */}
        <div className="flex justify-between items-center w-full mb-2">
            <h1 className="font-bold font-lg">Loan Details ({loan.date})</h1>
            <div className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full cursor-pointer" onClick={() => setLoanModal(false)}>
                    <IoCloseSharp />
            </div>
        </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Principal:</p>
              <p className="font-bold col-span-3">{loan.principal}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Amount Paid:</p>
              <p className="font-bold col-span-3">{loan.amountPaid}</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Interest Rate:</p>
              <p className="font-bold col-span-3">{loan.interest_rate}%</p>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Amount to pay:</p>
              <p className="font-bold col-span-3">{loan.amountToPay}</p>
          </div>
          <AmortizationSchedule  amortization_schedule={amortization_schedule} start_date={loan.start_date}/>


      </div>
    </div>,
    document.getElementById('portal')
  )
}