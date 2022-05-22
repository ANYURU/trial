import { depositHistory } from "../../helpers/mockData"
import { Pagination } from "../../components"
import { useState } from "react"

export default function Deposit() {
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ depositsPerPage, setDepositsPerPage ] = useState(10)
  const indexOfLastPage = currentPage * depositsPerPage
  const indexOfFirstPage = indexOfLastPage - depositsPerPage

  const shownDeposits = depositHistory.slice(indexOfFirstPage, indexOfLastPage)
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>My Deposit</h1>
      <div className="bg-white p-6 min-h-full dark:bg-dark-bg-700">
        <div className="w-full relative overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Deposit Method</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {shownDeposits.map((loan, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`} key={index}>
                  <td className='px-6 py-3'>{loan.date}</td><td className='px-6 py-3'>{loan.transactionId}</td><td className='px-6 py-3'>{loan.account}</td><td className='px-6 py-3'>{loan.amount}</td><td className='px-6 py-3'>{loan.depositMethod}</td><td className='px-6 py-3'>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between px-6 my-5">
          <Pagination
            pages={Math.ceil(depositHistory.length/depositsPerPage)}
            setCurrentPage={setCurrentPage}
            indexOfFirstPage={indexOfFirstPage}
            indexOfLastPage={indexOfLastPage}
            data={depositHistory}
            depositsPerPage={depositsPerPage}
            setDepositsPerPage={setDepositsPerPage}
          />
          </div>
      </div>
    </div>
  )
}