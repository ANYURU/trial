import { depositHistory } from "../../helpers/mockData"
import { Pagination, Loader } from "../../components"
import { useState, useEffect } from "react"
import { supabase } from "../../helpers/supabase"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaEllipsisV } from 'react-icons/fa'
import { MdInfo } from 'react-icons/md'

export default function Deposit() {

  const [ deposits, setDeposits ] = useState([])
  const [ status, setStatus ] = useState('')
  const [ account, setAccount ] = useState('')
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    document.title = 'Deposit - Bweyogere tuberebumu'
    getDeposits()

    const mySubscription = supabase
      .from('transactions')
      .on('*', async payload => {
        console.log(payload)
        await getDeposits()
      })
      .subscribe()

      return () => supabase.removeSubscription(mySubscription) 
  }, [])

  const [ date, setDate ] = useState(null)

  const getDeposits = async () => {
    const { data, error } = await supabase.rpc("fetch_deposits")
      if( error ) {
        setLoading(false)
        throw error
      } else {
        setLoading(false)
        setDeposits(data)
      }
  }

  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ depositsPerPage, setDepositsPerPage ] = useState(10)
  const indexOfLastPage = currentPage * depositsPerPage
  const indexOfFirstPage = indexOfLastPage - depositsPerPage

  
  const [ show, setShow ] = useState(false)
  const [ activeIndex, setActiveIndex ] = useState(false)
  
  if(show === true){
    window.onclick = function(event) {
      if (!event.target.matches('.dialog')) {
        setShow(false)
      }
    }
  }
  
  const filteredDeposits = deposits?.length > 0 && deposits.filter(application => status === "" ? application : status === 'pending' ? !application.reviewed : status === "approved" ? application.application_meta.review_status === status : application.reviewed && application.application_meta.review_status !== "approved" ).filter(deposit => !account || deposit.application_meta.account_type === account)
  let depositsToDisplay = filteredDeposits?.length > 0 && filteredDeposits.slice(indexOfFirstPage, indexOfLastPage)


  return (

    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>My Deposits</h1>
      <div className='flex my-3 justify-between gap-5'>
          <div className='flex flex-col w-56'>
            <select name="status" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => setStatus(event.target.value)}
            >
                <option value="">Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className='flex flex-col w-56'>
            <select name="account" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => setAccount(event.target.value)}
            >
                <option value="">Account</option>
                <option value="savings">Savings</option>
                <option value="shares">Shares</option>
                <option value="fixed">Fixed</option>
                <option value="mwana">Mwana</option>
            </select>
          </div>

          <div className='flex flex-col w-56'>
            <input type="date" name="" onChange={(event) => setDate(event.target.value)} id="" placeholder='Old Password' className='py-2 px-2 rounded dark:bg-dark-bg-600 dark:text-secondary-text' />
          </div>
      </div>

      <div className="bg-white p-6 min-h-full dark:bg-dark-bg-700">
        {
          loading 
          ? 
          <div className="w-full flex justify-center">
            <Loader />
          </div>
          : 
          ( 
            deposits === null || depositsToDisplay?.length < 1
            ?
            <div className="w-full flex justify-center">
              You do not have any deposits    
            </div>
            :
            <>
              <div className="w-full overflow-x-auto sm:rounded-lg">
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Status</th><th className='px-6 py-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depositsToDisplay?.length > 0 && depositsToDisplay.map((deposit, index) => (
                      <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`} key={index}>
                        <td className='px-6 py-3'>{new Date(deposit.created_at).toISOString().split('T')[0]}</td><td className='px-6 py-3'>{deposit.transaction_id}</td><td className='px-6 py-3'>{deposit.transaction_meta.account_type}</td><td className='px-6 py-3'>{deposit.amount}</td>

                        <td className={`px-6 py-3`}>
                          <span className={` py-1 px-2 rounded-xl text-white ${deposit.reviewed ? deposit.transaction_meta.review_status === "approved" ? "bg-green-400" : "bg-red-400" : "bg-yellow-400"}`}>
                          {deposit.reviewed ?
                            deposit.application_meta.review_status === "approved" ? "Approved" : "Rejected"
                          : "Pending"}
                          </span>
                        </td>

                        <td className="px-6 py-2">
                            <div className="relative">
                                <button className="block p-2 rounded-md dialog"
                                  onClick={(event) => {
                                    setActiveIndex(index)
                                    setShow(!show)
                                    event.stopPropagation()
                                  }}
                                >
                                    <FaEllipsisV />
                                </button>
                                
                                <ul className={`absolute right-0 w-48 py-2 mt-2 z-50 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 ${index === activeIndex && show ? '' : 'hidden'}`}>
                                    <li 
                                      className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
                                      onClick={() => {
                                        // setLoanModal(true)
                                      }}
                                    ><MdInfo /> Details</li>
                                </ul>

                            </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between px-6 my-5">
                <Pagination
                  pages={Math.ceil(filteredDeposits.length/depositsPerPage)}
                  setCurrentPage={setCurrentPage}
                  indexOfFirstPage={indexOfFirstPage}
                  indexOfLastPage={indexOfLastPage}
                  data={filteredDeposits}
                  depositsPerPage={depositsPerPage}
                  setDepositsPerPage={setDepositsPerPage}
                />
              </div>
            </>  
          )
        }
      </div>
    </div>
  )
}