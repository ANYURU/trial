import { useParams } from "react-router-dom"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { Loader } from "../../components"
import { downloadFile } from "../../helpers/utilites"
import { toast, ToastContainer } from "react-toastify"
import AmortizationSchedule from "../../components/AmortizationSchedule"

export default function DepositVerify() {
  const { id } = useParams()

  const [ loan, setLoan ] = useState(null)
  const [ imageURL, setImageURL ] = useState('')

  useEffect(() => {
    getApplication()
      .then(data => setLoan(data)) 
      .catch(error => console.log(error))
  }, [ ])

  const getApplication = async () => {
    const { error, data } = await supabase.rpc("fetch_loan_applications")
    if(error) throw error
    if(data) {
      const [loan_application] = data.filter( loan => loan.application_id === id)
      return loan_application
    }
  }

  if (loan){
    try {
      downloadFile(loan.application_meta.files[0].file_url.substring(9), "loans")
      .then((data) => setImageURL(data.avatar_url))
      .catch(error => console.log("failed"))
    } catch ( error ){
      // console.log(error)
    }
  }


  const approveLoanRequest = async () => {
    const { application_meta : { applicants_id }} = loan
    
    try {
      const { data, error } = await supabase.rpc('approve_loan', { members_id: applicants_id, application: id })
      if ( error ) {
        throw error
      } else {
        // handle the alerts and navigation
        console.log(data)
        toast.success(`Transaction has been approved.`, { position:"top-center" })
      }
    } catch (error) {
      toast.error(`${error?.message}`, { position:"top-center"})
      console.log(error)
    }

  }


  const rejectLoanRequest = async() => {
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
              <h1 className='font-semibold'>{loan.application_meta.applicants_name}'s Loan Request Details</h1>
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">Application ID: <span className="font-semibold">{loan.application_id}</span></div>
                <div className="my-6">Applicant ID: <span className="font-semibold">{loan.application_meta.applicants_id}</span></div>
                <div className="my-6">Principal: <span className="font-semibold">{loan.application_meta.amount}</span></div>
                <div className="my-6">Total repayment: <span className="font-semibold">{loan.application_meta.total}</span></div>
                <div className="my-6">Interest: <span className="font-semibold">{loan.application_meta.total - loan.application_meta.amount}</span></div>
              </div>
          </div>

          <AmortizationSchedule amortization_schedule={loan.application_meta.amortization_schedule} start_date={loan.application_meta.start_date}/>
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={rejectLoanRequest}
           >Reject
          </button>
          <button
            className='bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={approveLoanRequest}
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