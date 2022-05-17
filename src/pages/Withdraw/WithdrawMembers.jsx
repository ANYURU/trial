import { withdrawHistory } from "../../helpers/mockData"
import { useState } from "react"
import { MdAdd } from "react-icons/md"
import { searchByName, filterByStatus } from "../../helpers/utilites"
import { MdOutlineSearch } from 'react-icons/md'

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

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Members Withdraw History</h1>
      {loans.length > 0 &&
      <div className="flex justify-between my-3 gap-0 w-full">
          <div className={`bg-green-400 w-${
            Math.round(((approvedMembers.length)*12)/loans.length) <= 0
            ? "0.5"
            : Math.round(((approvedMembers.length)*12)/loans.length) === 12
            ? "11" 
            : Math.round(((approvedMembers.length)*12)/loans.length)
          }/12 flex flex-col justify-center items-center py-1 border-l-8 border-green-800`}>
              <h1 className="text-lg font-bold">{approvedMembers.length}</h1>
              <p className="uppercase">Approved</p>
          </div>

          {pendingMembers.length > 0 &&<div className={`bg-yellow-400 w-${
            Math.round(((pendingMembers.length)*12)/loans.length) <= 0
            ? "0.5"
            : Math.round(((pendingMembers.length)*12)/loans.length) === 12
            ? "11" 
            : Math.round(((pendingMembers.length)*12)/loans.length)
          }/12 flex flex-col justify-center items-center py-1 border-l-8 border-yellow-600`}>
              <h1 className="text-lg font-bold">{pendingMembers.length}</h1>
              <p className="uppercase">Pending</p>
          </div>}

          <div className={`bg-red-400 w-${
            Math.round(((rejectedMembers.length)*12)/loans.length) <= 0
            ? "0.5"
            : Math.round(((rejectedMembers.length)*12)/loans.length) === 12
            ? "11" 
            : Math.round(((rejectedMembers.length)*12)/loans.length)
          }/12 flex flex-col justify-center items-center py-1 border-l-8 border-red-800`}>
              <h1 className="text-lg font-bold">{rejectedMembers.length}</h1>
              <p className="uppercase">Rejected</p>
          </div>
      </div>}
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
      <div className="flex bg-white p-6 min-h-full">
        <div className="w-full relative overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Name</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Cashout Method</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {searchByName(loans, searchText).map((loan, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`} key={index}>
                  <td className='px-6 py-3'>{loan.date}</td><td className='px-6 py-3'>{loan.transactionId}</td><td className='px-6 py-3'>{loan.name}</td><td className='px-6 py-3'>{loan.account}</td><td className='px-6 py-3'>{loan.amount}</td><td className='px-6 py-3'>{loan.depositMethod}</td><td className='px-6 py-3'>{loan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}