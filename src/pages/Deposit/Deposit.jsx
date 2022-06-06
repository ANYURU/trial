import { depositHistory } from "../../helpers/mockData"
import { Pagination, Loader } from "../../components"
import { useState, useEffect } from "react"
import { supabase } from "../../helpers/supabase"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FaEllipsisV } from 'react-icons/fa'

export default function Deposit() {
  useEffect(() => {
    document.title = 'Deposit - Bweyogere tuberebumu'
    getApplications()
  }, [])

  const navigate = useNavigate()

  const [ profile ] = useOutletContext()

  const [ deposits, setDeposits ] = useState([])
  const [ status, setStatus ] = useState('')
  const [ date, setDate ] = useState(null)

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "deposit")
    .order("created_at",  { ascending: false })
    .range(indexOfFirstPage, indexOfLastPage)

    setDeposits(data.filter(deposit => deposit.application_meta.applicants_id === profile.id))
  }

  // pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ depositsPerPage, setDepositsPerPage ] = useState(10)
  const indexOfLastPage = currentPage * depositsPerPage
  const indexOfFirstPage = indexOfLastPage - depositsPerPage

  const shownDeposits = depositHistory.slice(indexOfFirstPage, indexOfLastPage)

  const [ show, setShow ] = useState(false)
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>My Deposits</h1>

      <div className='flex my-3 justify-between gap-5'>
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
            <input type="date" name="" onChange={(event) => setDate(event.target.value)} id="" placeholder='Old Password' className='py-2 px-2 rounded dark:bg-dark-bg-600 dark:text-secondary-text' />
          </div>
      </div>

      <div className="bg-white p-6 min-h-full dark:bg-dark-bg-700">
      {deposits !== null && deposits.length > 0 ?
        <>
        <div className="w-full overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Transaction ID</th><th className='px-6 py-4'>Account</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Status</th><th className='px-6 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`} key={index}>
                  <td className='px-6 py-3'>{new Date(deposit.created_at).toISOString().split('T')[0]}</td><td className='px-6 py-3'>{deposit.application_id}</td><td className='px-6 py-3'>{deposit.application_meta.account_type}</td><td className='px-6 py-3'>{deposit.application_meta.amount}</td>

                  <td className={`px-6 py-3`}>
                    <span className={` py-1 px-2 rounded-xl text-white ${deposit.reviewed ? deposit.application_meta.review_status === "approved" ? "bg-green-400" : "bg-red-400" : "bg-yellow-400"}`}>
                    {deposit.reviewed ?
                      deposit.application_meta.review_status === "approved" ? "Approved" : "Rejected"
                    : "Pending"}
                    </span>
                  </td>

                  <td className="px-6 py-2">
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
            pages={Math.ceil(depositHistory.length/depositsPerPage)}
            setCurrentPage={setCurrentPage}
            indexOfFirstPage={indexOfFirstPage}
            indexOfLastPage={indexOfLastPage}
            data={depositHistory}
            depositsPerPage={depositsPerPage}
            setDepositsPerPage={setDepositsPerPage}
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