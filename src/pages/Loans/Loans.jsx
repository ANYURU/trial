import { loanHistory } from "../../helpers/mockData"
import { Pagination } from "../../components"
import { useEffect, useState } from "react"
import { supabase } from "../../helpers/supabase"
import { FaEllipsisV } from 'react-icons/fa'
import { LoansContext } from "../../components"
import { LoanModal } from "../../components"
import { useOutletContext } from "react-router-dom"
import Loader from "../../components/Loader"
import moment from "moment"

export default function Loan() {
  const [{ id }] = useOutletContext()

  useEffect(() => {
    document.title = 'Loans - Bweyogere tuberebumu'
    getApplications()
    .catch(error => {
      setLoading(false)
    })
  }, [])

  const [ loans, setLoans] = useState([])
  const [ loanModal, setLoanModal ] = useState(false)
  const [ status, setStatus ] = useState('')
  const [ date, setDate ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("loans")
    .select()
    .eq("member_id", id)

    if(error)  throw error

    if(data) {
      setLoans(data)
      setLoading(false)
      console.log(data)
    } else {
      setLoading(false)
    }
  }

  //pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ loansPerPage, setLoansPerPage ] = useState(10)
  const indexOfLastPage = currentPage * loansPerPage
  const indexOfFirstPage = indexOfLastPage - loansPerPage

  const loan = loanHistory.slice(indexOfFirstPage, indexOfLastPage)

  const [ activeIndex, setActiveIndex ] = useState(null)
  const [ show, setShow ] = useState(false)
  if(show === true){
    window.onclick = function(event) {
        if (!event.target.matches('.dialog')) {
            setShow(false)
        }
    }
  }

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>My Loans</h1>


      <div className='flex my-1 justify-between gap-5'>
          <div className='flex flex-col w-56'>
            <select name="status" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => setStatus(event.target.value)}
            >
                <option value="">Select Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="due">Due</option>
            </select>
          </div>
          <div className='flex flex-col w-56'>
            <input type="date" name="inputDate" onChange={(event) => setDate(event.target.value)} id="" placeholder='Old Password' className='rounded inputDate dark:bg-dark-bg-600 dark:text-secondary-text' />
          </div>
        </div>

      <div className="bg-white dark:bg-dark-bg-700 p-6 min-h-full">
        <div className="w-full overflow-x-auto sm:rounded-lg">
          {
            loading ? 
              <Loader />
            : 
            <div>
              {
                loans?.length > 0 
                ? 
                (
                  <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Amount to Pay</th><th className='px-6 py-4'>Amount Paid</th><th className='px-6 py-4'>Principal</th><th className='px-6 py-4'>Interest (%)</th><th className='px-6 py-4'>Status</th><th className='px-6 py-4'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan, index) => (
                        <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600`} key={index}>
                          {loanModal && activeIndex === index && <LoanModal setLoanModal={setLoanModal} loan={loan} id={loan.id} />}
                          <td className='px-6 py-3'>{moment(loan.created_at).format('DD-MM-YYYY')}</td><td className='px-6 py-3'>{loan.outstanding_balance}</td><td className='px-6 py-3'>{loan.amount_paid}</td><td className='px-6 py-3'>{loan.amount_issued}</td><td className='px-6 py-3'>{loan.interest_rate || '18%'}</td>
                          <td className={`px-6 py-3`}>
                            <span className={` py-1 px-2 rounded-xl text-white ${loan.loan_status === "pending" ? "bg-yellow-400" : loan.loan_status === 'paid' ? "bg-green-400" : "bg-red-400"}`}>
                            {loan.loan_status}
                            </span>
                          </td>

                          <td className="px-6 py-3">
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
                                <LoansContext activeIndex={activeIndex} show={show} index={index} setShow={setShow} member={activeIndex === index ? loan : null} id={loan.ID} setLoanModal={setLoanModal} />
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
                :
                (
                  <div>
                    You do not have any loans
                  </div>
                )
              }
            </div>
          }
        </div>
        {loans?.length > 0 && (
            <div className="flex justify-between px-6 my-5">
              <Pagination
                pages={Math.ceil(loanHistory.length/loansPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={loanHistory}
                loansPerPage={loansPerPage}
                setLoansPerPage={setLoansPerPage}
              />
            </div>
          )
        }
      </div>
    </div>
  )
}