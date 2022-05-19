import { Submit } from "../../components"
import { useParams } from "react-router-dom"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { Loader } from "../../components"

export default function DepositVerify() {
  const { id } = useParams()

  useEffect(() => {
    getApplication()
  })

  const [ deposit, setDeposit ] = useState(null)

  const getApplication = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("type", "deposit")
    .eq("application_id", id)
    setDeposit(data[0])
  }
  

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Verify Deposit</h1>
      <div className="flex bg-white p-6 min-h-full">
      {deposit  ? <div className='flex flex-grow flex-col min-h-full'>
           <div className='mb-3'>
              {/* <h1 className='font-semibold'>{profile?.fullname}'s withdraw Request Details</h1> */}
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">MemberID: {deposit.applicants_id}</div>
                <div className="">Application ID: {id}</div>
                <div className="my-6">Amount: {deposit.application_meta && deposit?.application_meta.amount}</div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: {deposit.application_meta &&  deposit?.application_meta.phone_number}</div>
              </div>
          </div>
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            type="submit"
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            >Reject
          </button>
          <button
            type="submit"
            className='bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            >Approve
          </button>
          </div>
      </div>
      :
      <Loader />
      }
      </div>
    </div>
  )
}