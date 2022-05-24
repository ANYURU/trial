import { depositHistory } from "../../helpers/mockData"
import { Pagination } from "../../components"
import { useState, useEffect } from "react"
import { supabase } from "../../helpers/supabase"

export default function Deposit() {
  useEffect(() => {
    document.title = 'Deposit - Bweyogere tuberebumu'
    getApplications()
  }, [])

  const [ deposits, setDeposits ] = useState([])
  const [ status, setStatus ] = useState('')
  const [ date, setDate ] = useState(null)

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "deposit")
    setDeposits(data)
  }


  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ depositsPerPage, setDepositsPerPage ] = useState(10)
  const indexOfLastPage = currentPage * depositsPerPage
  const indexOfFirstPage = indexOfLastPage - depositsPerPage

  const shownDeposits = depositHistory.slice(indexOfFirstPage, indexOfLastPage)
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>My Deposits</h1>

      <div className='flex my-1 justify-between gap-5'>
          <div className='flex flex-col w-56'>
            <select name="status" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => setStatus(event.target.value)}
            >
                <option value="">Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className='flex flex-col w-56'>
            <input type="date" name="inputDate" onChange={(event) => setDate(event.target.value)} id="" placeholder='Old Password' className='rounded inputDate dark:bg-dark-bg-600 dark:text-secondary-text' />
          </div>
        </div>

      <div className="bg-white p-6 min-h-full dark:bg-dark-bg-700">
        <div className="w-full overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Deposit Method</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {shownDeposits.map((loan, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600`} key={index}>
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