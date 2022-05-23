import { supabase } from "../../helpers/supabase"
import { useEffect, useState, useParams } from "react"
import { Loader } from "../../components"
import { useNavigate } from "react-router-dom"
import { MdOutlineSearch } from 'react-icons/md'

export default function DepositAdmin() {
  useEffect(() => {
    getApplications()
  })

  const [ deposits, setDeposits ] = useState([])

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "deposit")
    setDeposits(data)
  }

  const navigate = useNavigate()

  const handleDeposit = depositID => {
    navigate(`/deposit/members/${depositID}`)
  }

  const [ status, setStatus ] = useState('')
  const [ account, setAccount ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const [ date, setDate ] = useState(null)
  const [ filterName, setFilterName ] = useState('')

  
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Member Deposits</h1>
      <div className="my-2 flex justify-between searchInput">
          <input type="text" className="px-2 py-2 sm:py-1" placeholder="Search by name..." 
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
      <div className="flex bg-white p-6 min-h-full">
        {deposits !== null && deposits.length > 0 ? <div className="w-full relative overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Deposit Method</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit, index) => (
                <tr className={`cursor-pointer ${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`} key={index}
                  onClick={() => handleDeposit(deposit.application_id)}
                >
                    <td className='px-6 py-3'>{new Date(deposit.created_at).toISOString().split('T')[0]}</td><td className='px-6 py-3'>{deposit.application_id}</td><td className='px-6 py-3'>{deposit?.application_meta.account_type}</td><td className='px-6 py-3'>{deposit?.application_meta.amount}</td><td className='px-6 py-3'>{deposit.depositMethod}</td><td className='px-6 py-3'>{deposit.reviewed ? "Approved" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        :
        <Loader />
        }
      </div>
    </div>
  )
}