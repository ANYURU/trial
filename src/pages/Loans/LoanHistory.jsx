import { loanHistory } from "../../helpers/mockData"

function LoanHistory() {
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Loan History</h1>
      <div className="flex bg-white p-6 min-h-full">
        <div className="w-full relative overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3'>Date</th><th className='px-6 py-3'>Amount to Pay</th><th className='px-6 py-3'>Amount Paid</th><th className='px-6 py-3'>Principal</th><th className='px-6 py-3'>Interest</th><th className='px-6 py-3'>Status</th>
              </tr>
            </thead>
            <tbody>
              {loanHistory.map((loan, index) => (
                <tr>
                  <td className='px-6 py-3'>{loan.date}</td><td className='px-6 py-3'>{loan.amountToPay}</td><td className='px-6 py-3'>{loan.amountPaid}</td><td className='px-6 py-3'>{loan.principal}</td><td className='px-6 py-3'>{loan.interest}</td><td className='px-6 py-3'>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LoanHistory