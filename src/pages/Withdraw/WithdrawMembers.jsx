import { withdrawHistory } from "../../helpers/mockData"
import { useState } from "react"
import { MdAdd } from "react-icons/md"
import { searchByName, filterByStatus } from "../../helpers/utilites"
import { MdOutlineSearch } from 'react-icons/md'
import Pagination from "../../components/Pagination"

export default function WithdrawMembers() {
  const [ status, setStatus ] = useState('')
  const [ account, setAccount ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const [ date, setDate ] = useState(null)
  const [ filterName, setFilterName ] = useState('')

  let loans = filterByStatus(withdrawHistory, "status", status)

  const approvedMembers = loans.filter(member => member.status === 'Approved')
  const pendingMembers = loans.filter(member => member.status === 'Pending')
  const rejectedMembers = loans.filter(member => member.status === 'Rejected')

  loans = filterByStatus(loans, "account", account)
  loans = loans.filter(loan => !date || loan.date === date)

  const approved = Math.round((approvedMembers.length/loans.length) * 100)
  const pending = Math.round((pendingMembers.length/loans.length) * 100)
  const rejected = Math.round((rejectedMembers.length/loans.length) * 100)

  //pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ withdrawPerPage, setWithdrawPerPage ] = useState(10)
  const indexOfLastPage = currentPage * withdrawPerPage
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage

  const shownWithdraw = loans.slice(indexOfFirstPage, indexOfLastPage)

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Members Withdraw History</h1>

        <div className="bg-white rounded">
          <div className="w-full h-7 rounded flex overflow-hidden">
            <div className="h-7 inline-block bg-green-400" style={{width: `${approved}%`}}></div>
            <div className="h-7 inline-block bg-yellow-400" style={{width: `${pending}%`}}></div>
            <div className="h-7 inline-block bg-red-400" style={{width: `${rejected}%`}}></div>
          </div>
          <div className="flex justify-between px-2 items-center py-2">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-400 inline-block rounded-full"></div> Approved: {approvedMembers.length}</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 inline-block rounded-full"></div> Pending: {pendingMembers.length}</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 inline-block rounded-full"></div> Reject: {rejectedMembers.length}</div>
          </div>
        </div>
      <div className='my-3'>
          <div className="my-2 flex justify-between searchInput">
              <input type="text" name="" id="" className="px-2 py-2 sm:py-1" placeholder="Search by name..." 
                onChange={(event) => setSearchText(event.target.value)}
              />
              <MdOutlineSearch className="search_icon" />
          </div>
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
                  <input type="date" name="inputDate" onChange={(event) => setDate(event.target.value)} id="" placeholder='Old Password' className=' rounded inputDate' />
                </div>
              </div>
            </form>
        </div>
      <div className="bg-white p-6 min-h-full">
        <div className="w-full relative overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Name</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Cashout Method</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {searchByName(shownWithdraw, searchText).map((loan, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`} key={index}>
                  <td className='px-6 py-3'>{loan.date}</td><td className='px-6 py-3'>{loan.transactionId}</td><td className='px-6 py-3'>{loan.name}</td><td className='px-6 py-3'>{loan.account}</td><td className='px-6 py-3'>{loan.amount}</td><td className='px-6 py-3'>{loan.depositMethod}</td><td className='px-6 py-3'>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between px-6 my-5">
          <Pagination
            pages={Math.ceil(withdrawHistory.length/withdrawPerPage)}
            setCurrentPage={setCurrentPage}
            indexOfFirstPage={indexOfFirstPage}
            indexOfLastPage={indexOfLastPage}
            data={withdrawHistory}
            depositsPerPage={withdrawPerPage}
            setDepositsPerPage={setWithdrawPerPage}
          />
          </div>
      </div>
    </div>
  )
}