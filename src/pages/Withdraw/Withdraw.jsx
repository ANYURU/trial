import { depositHistory } from "../../helpers/mockData"
import { useState } from "react"
import { MdAdd } from "react-icons/md"
import { searchByName, filterByStatus } from "../../helpers/utilites"

export default function Withdrawy() {
  const [ status, setStatus ] = useState('')
  const [ account, setAccount ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  let loans = filterByStatus(depositHistory, "status", status)

  loans = filterByStatus(loans, "account", account)

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Withdraw</h1>

      <div className='my-3'>
            <form action="" className='m-1'>
              <div className='flex justify-between gap-5'>
                <div className='flex flex-col w-56'>
                  <select name="status" id="" className="py-2 px-2 rounded bg-white"
                    onChange={(event) => {setFilterName(event.target.name);setStatus(event.target.value)}}
                  >
                      <option value="">Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className='flex flex-col w-56'>
                  <select name="account" id="" className="py-2 px-2 rounded bg-white"
                    onChange={(event) => {setFilterName(event.target.name);setStatus(event.target.value)}}
                  >
                      <option value="">Account</option>
                      <option value="Savings">Savings</option>
                      <option value="Shares">Shares</option>
                      <option value="Mwana">Mwana</option>
                      <option value="Fixed">Fixed</option>
                  </select>
                </div>
                <div className='flex flex-col w-56'>
                  <label htmlFor="" className='text-sm'>Date</label>
                  <input type="date" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
              </div>
            </form>
        </div>
      <div className="flex bg-white p-6 min-h-full">
        <div className="w-full relative overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Cashout Method</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`} key={index}>
                  <td className='px-6 py-3'>{loan.date}</td><td className='px-6 py-3'>{loan.transactionId}</td><td className='px-6 py-3'>{loan.account}</td><td className='px-6 py-3'>{loan.amount}</td><td className='px-6 py-3'>{loan.depositMethod}</td><td className='px-6 py-3'>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}