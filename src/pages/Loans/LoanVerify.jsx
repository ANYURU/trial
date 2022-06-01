import { useParams } from "react-router-dom"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { Loader } from "../../components"
import { downloadFile } from "../../helpers/utilites"
import { toast, ToastContainer } from "react-toastify"

export default function DepositVerify() {
  const { id } = useParams()

  useEffect(() => {
    getApplication()
  })

  const [ loan, setLoan ] = useState(null)
  const [ imageURL, setImageURL ] = useState('')

  const getApplication = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "loan")
    .eq("application_id", id)
    setLoan(data[0])
  }

  if (loan){
    try {
      downloadFile(loan.application_meta.files[0].file_url.substring(9), "loans")
      .then((data) => setImageURL(data.avatar_url))
      // .catch(error => error.status)
    }
    catch (error) {
      console.log("failed")
    }
  }


  const approveLoanPaymentTransaction = async () => {
    const { application_meta : { applicants_id }} = loan
    
    try {
      const { data, error } = await supabase.rpc( 'approve_transaction', { members_id: applicants_id, application: id })
      if ( error ) {
        throw error
      } else {
        // handle the alerts and navigation
        toast.success(`Transaction has been approved.`, { position:"top-center" })
      }

    } catch (error) {
      toast.error(`${error?.message}`, { position:"top-center"})
      console.log(error)
     

    }

  }


  const rejectLoanPaymentTransaction = async() => {
    try {
      const { data, error } = await supabase.rpc( 'reject_application', { application: id })
      if( error ) {
        throw error
      } else {
        toast.success(`Transaction has been rejected.`, { position:"top-center" })
        // handle the alerts and navigation
      }
    } catch(error) {
      console.log(error)
    }
  }


  // console.log(imageURL)

  
  

  return (
    <div className='h-full'>
      <ToastContainer /> 
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Verify Loan</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      {loan  ? <div className='flex flex-grow flex-col min-h-full'>
           <div className='mb-3'>
              {/* <h1 className='font-semibold'>{profile?.fullname}'s withdraw Request Details</h1> */}
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">MemberID: {loan.applicants_id}</div>
                <div className="">Application ID: {id}</div>
                <div className="my-6">Amount: {loan.application_meta && loan?.application_meta.amount}</div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: {loan.application_meta &&  loan?.application_meta.phone_number}</div>
                <img src={imageURL} width={200} className="rounded" alt="receipt" loading="lazy"/>
              </div>
          </div>
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={rejectLoanPaymentTransaction}
           >Reject
          </button>
          <button
            className='bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={approveLoanPaymentTransaction}
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