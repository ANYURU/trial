import { useOutletContext, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../../helpers/supabase"
import { toast, ToastContainer } from "react-toastify"

export default function WithdrawVerify() {
  const { id } = useParams()
  const [ profile ] = useOutletContext()
  const [ withdraw, setWithdraw ] = useState(null)

  useEffect(() => {
    getApplication()
  }, [])

  const getApplication = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "withdraw")
    .eq("application_id", id)
    setWithdraw(data[0])
  }

  const approveTransaction = async () => {
    const { application_meta : { applicants_id }} = withdraw
    
    try {
      const { data, error } = await supabase.rpc( 'approve_transaction', { members_id: applicants_id, application: id })
      if ( error ) {
        throw error
      } else {
        console.log(data)
        toast.success(`Transaction has been approved.`, { position:"top-center" })
      }

    } catch (error) {
      toast.error(`${error?.message}`, { position:"top-center"})
      console.log(error)

    }

  }


  const rejectTransaction = async() => {
    try {
      const { data, error } = await supabase.rpc( 'reject_transaction', { application: id })
      if( error ) {
        throw error
      } else {
        console.log(data)
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='h-full'>
      <ToastContainer />
      {console.log(withdraw)}
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Verify Withdraw</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      <div className='flex flex-grow flex-col min-h-full'>
          <div className='mb-3'>
              <h1 className='font-semibold'>{profile?.fullname}'s withdraw Request Details</h1>
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">MemberID: {profile?.id}</div>
                <div className="my-6">Amount: {withdraw && withdraw.application_meta.amount}</div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: 0770566711</div>
                <div className="my-6">Particulars: </div>
                <div>{withdraw && withdraw.application_meta.particulars}</div>
              </div>
          </div>
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            type="submit"
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={rejectTransaction}
            >Reject
          </button>
          <button
            type="submit"
            className='bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={approveTransaction}
            >Approve
          </button>
          </div>
      </div>
      </div>
    </div>
  )
}