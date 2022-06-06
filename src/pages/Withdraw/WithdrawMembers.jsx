import { withdrawHistory } from "../../helpers/mockData"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { MdAdd } from "react-icons/md"
import { searchByName2, filterByStatus } from "../../helpers/utilites"
import { MdOutlineSearch } from 'react-icons/md'
import Pagination from "../../components/Pagination"
import { Loader } from "../../components"
import { useNavigate } from "react-router-dom"
import { FaEllipsisV } from 'react-icons/fa'

export default function WithdrawMembers() {
  const [ status, setStatus ] = useState('')
  const [ account, setAccount ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const [ date, setDate ] = useState(null)
  const [ filterName, setFilterName ] = useState('')

  const navigate = useNavigate()

  const [ withdraws, setWithraw ] = useState([])

  const handleWithdraw = withdrawID => {
    navigate(`/withdraw/members/${withdrawID}`)
  }

  useEffect(() => {
    getApplications()
  }, [])

  let loans = filterByStatus(withdrawHistory, "status", status)

  const [ show, setShow ] = useState(false)

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "withdraw")
    .order("created_at",  { ascending: false })
    // .range(indexOfFirstPage, indexOfLastPage)

    setWithraw(data)
  }

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

  const shownWithdraw = withdraws.slice(indexOfFirstPage, indexOfLastPage)

  console.log(withdraws)

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Members Withdraw History</h1>

        <div className=" dark:text-secondary-text rounded">
          <div className="w-full h-7 rounded flex overflow-hidden">
            <div className="h-7 inline-block bg-green-400" style={{width: `${approved}%`}}></div>
            <div className="h-7 inline-block bg-yellow-400" style={{width: `${pending}%`}}></div>
            <div className="h-7 inline-block bg-red-400" style={{width: `${rejected}%`}}></div>
          </div>
          <div className="flex justify-between px-2 items-center py-2">
            <div className="flex items-center gap-1 text-sm"><div className="w-2 h-2 bg-green-400 inline-block rounded-full"></div> Approved: {approvedMembers.length} ({approved}%)</div>
            <div className="flex items-center gap-1 text-sm"><div className="w-2 h-2 bg-yellow-400 inline-block rounded-full"></div> Pending: {pendingMembers.length} ({pending}%)</div>
            <div className="flex items-center gap-1 text-sm"><div className="w-2 h-2 bg-red-400 inline-block rounded-full"></div> Reject: {rejectedMembers.length} ({rejected}%)</div>
          </div>
        </div>
      <div className='my-3'>
          <div className="my-2 flex justify-between searchInput">
              <input type="text" name="" id="" className="px-2 py-2 sm:py-1 dark:bg-dark-bg-700" placeholder="Search by name..." 
                onChange={(event) => setSearchText(event.target.value)}
              />
              <MdOutlineSearch className="search_icon" />
          </div>
            <form action="" className='m-1'>
              <div className='flex justify-between gap-5'>
                <div className='flex flex-col w-56'>
                  <select name="status" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-700 dark:text-secondary-text"
                    onChange={(event) => {setFilterName(event.target.name);setStatus(event.target.value)}}
                  >
                      <option value="">Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className='flex flex-col w-56'>
                  <select name="account" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-700 dark:text-secondary-text"
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
                  <input type="date" name="inputDate" onChange={(event) => setDate(event.target.value)} id="" placeholder='Old Password' className=' rounded inputDate dark:bg-dark-bg-700 dark:text-secondary-text' />
                </div>
              </div>
            </form>
        </div>
      <div className="bg-white dark:bg-dark-bg-700 p-6 min-h-full">
        { withdraws.length > 0 ?
        <>
        <div className="w-full overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Name</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Cashout Method</th><th className='px-6 py-4'>Status</th><th className='px-6 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {shownWithdraw.map((withdraw, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600`} key={index}
                  onClick={() => handleWithdraw(withdraw.application_id)}
                >
                  <td className='px-6 py-3'>{new Date(withdraw.created_at).toISOString().split('T')[0]}</td><td className='px-6 py-3'>{withdraw.application_id}</td><td className='px-6 py-3'>{withdraw.application_meta.applicants_name}</td><td className='px-6 py-3'>{withdraw.application_meta.account_type}</td><td className='px-6 py-3'>{withdraw.application_meta.amount}</td><td className='px-6 py-3'></td>
                  <td className={`px-6 py-3`}>
                      <span className={` py-1 px-2 rounded-xl text-white ${withdraw.reviewed ? "bg-red-400" : "bg-yellow-400"}`}>
                      {withdraw.reviewed ? "Rejected" : "Pending"}
                      </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="relative">
                      <button className="block p-2 rounded-md dialog"
                        onClick={(event) => {
                          // setActiveIndex(index)
                          setShow(!show)
                          event.stopPropagation()
                        }}
                      >
                          <FaEllipsisV />
                      </button>
                      {/* <LoansContext activeIndex={activeIndex} show={show} index={index} setShow={setShow} member={activeIndex === index ? loan : null} id={loan.ID} setLoanModal={setLoanModal} /> */}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between px-6 my-5">
          <Pagination
            pages={Math.ceil(withdraws.length/withdrawPerPage)}
            setCurrentPage={setCurrentPage}
            indexOfFirstPage={indexOfFirstPage}
            indexOfLastPage={indexOfLastPage}
            data={withdraws}
            depositsPerPage={withdrawPerPage}
            setDepositsPerPage={setWithdrawPerPage}
          />
          </div>
          </>
          :
          <div className="w-full flex">
            <Loader />
          </div>
          }
      </div>
    </div>
  )
}