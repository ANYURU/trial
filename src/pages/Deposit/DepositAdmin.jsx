import { supabase } from "../../helpers/supabase"
import { useEffect, useState, useParams } from "react"
import { Loader } from "../../components"
import { useNavigate } from "react-router-dom"

export default function DepositAdmin() {
  useEffect(() => {
    getApplications()
  })

  const [ deposits, setDeposits ] = useState([])

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("type", "deposit")
    setDeposits(data)
  }

  const navigate = useNavigate()

  const handleDeposit = depositID => {
    navigate(`/deposit/members/${depositID}`)
  }

  
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Member Deposits</h1>
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