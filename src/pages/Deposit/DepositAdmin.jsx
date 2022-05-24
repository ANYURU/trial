import { supabase } from "../../helpers/supabase"
import { useEffect, useState, useParams } from "react"
import { Loader } from "../../components"
import { useNavigate } from "react-router-dom"
import { MdOutlineSearch } from 'react-icons/md'
import { Pagination } from "../../components"

export default function DepositAdmin() {
  const [ deposits, setDeposits ] = useState([]) 

  useEffect(() => {
    getApplications()
    document.title = 'Deposit Applications - Bweyogere tuberebumu'
  }, [deposits])

  //pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ withdrawPerPage, setWithdrawPerPage ] = useState(10)
  const indexOfLastPage = currentPage * withdrawPerPage
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage

  

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "deposit")
    .order("created_at",  { ascending: false })
    .range(indexOfFirstPage, indexOfLastPage)

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

  

  let shownDeposits = deposits.slice(indexOfFirstPage, indexOfLastPage)

  shownDeposits = shownDeposits.filter(deposit => !account || deposit?.application_meta.account_type === account)

  //context
  const [ show, setShow ] = useState(false)
  if(show === true){
    window.onclick = function(event) {
        if (!event.target.matches('.dialog')) {
            setShow(false)
        }
    }
  }

  console.log(deposits)

  
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Member Deposits</h1>
        <div className="my-2 flex justify-between searchInput">
            <input type="text" className="px-2 py-2 sm:py-1 dark:bg-dark-bg-600 dark:text-secondary-text" placeholder="Search by name..."
              onChange={(event) => setSearchText(event.target.value)}
            />
            <MdOutlineSearch className="search_icon" />
        </div>

        <div className='flex my-1 justify-between gap-5'>
          <div className='flex flex-col w-56'>
            <select name="status" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => {setFilterName(event.target.name);setStatus(event.target.value)}}
            >
                <option value="">Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className='flex flex-col w-56'>
            <select name="account" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => setAccount(event.target.value)}
            >
                <option value="">Account</option>
                <option value="savings">Savings</option>
                <option value="shares">Shares</option>
                <option value="mwana">Mwana</option>
                <option value="fixed">Fixed</option>
            </select>
          </div>
          <div className='flex flex-col w-56'>
            <input type="date" name="inputDate" onChange={(event) => setDate(event.target.value)} id="" placeholder='Old Password' className='rounded inputDate dark:bg-dark-bg-600 dark:text-secondary-text' />
          </div>
        </div>

      <div className="bg-white dark:bg-dark-bg-700 p-6 min-h-full">
        {deposits !== null && deposits.length > 0 ? 
        <>
        <div className="w-full overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Deposit Method</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {shownDeposits.map((deposit, index) => (
                <tr className={`cursor-pointer ${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600`} key={index}
                  onClick={() => handleDeposit(deposit.application_id)}
                >
                    <td className='px-6 py-3'>{new Date(deposit.created_at).toISOString().split('T')[0]}</td><td className='px-6 py-3'>{deposit.application_id}</td><td className='px-6 py-3'>{deposit?.application_meta.account_type}</td><td className='px-6 py-3'>{deposit?.application_meta.amount}</td><td className='px-6 py-3'>{deposit.depositMethod}</td><td className='px-6 py-3'>{deposit.reviewed ? "Approved" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between px-6 my-5">
          <Pagination
            pages={Math.ceil(deposits.length/withdrawPerPage)}
            setCurrentPage={setCurrentPage}
            indexOfFirstPage={indexOfFirstPage}
            indexOfLastPage={indexOfLastPage}
            data={deposits}
            depositsPerPage={withdrawPerPage}
            setDepositsPerPage={setWithdrawPerPage}
          />
        </div>
        </>
        :
        <div className="w-full flex justify-center">
          <Loader />
        </div>
        }
        
      </div>
    </div>
  )
}