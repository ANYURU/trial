import { useParams } from "react-router-dom"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { Loader } from "../../components"
import { downloadFile } from "../../helpers/utilites"

export default function DepositVerify() {
  const { id } = useParams()

  

  const [ loan, setLoan ] = useState(null)
  const [ imageURL, setImageURL ] = useState('')

  useEffect(() => {
    getApplication()
  }, [ ])

  const getApplication = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "deposit")
    .eq("application_id", id)
    // console.log(data[0])
    setLoan(data[0])
  }

  if (loan){
    try {
      downloadFile(loan.application_meta.files[0].file_url.substring(9), "deposits")
      .then((data) => setImageURL(data.avatar_url))
      .catch(error => console.log("failed"))
    }
    catch (error) {
      console.log("failed")
    }
  }

  // console.log(deposit)

  
  

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Verify Loan</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      {loan  ? <div className='flex flex-grow flex-col min-h-full'>
           <div className='mb-3'>
              <h1 className='font-semibold'>{loan.application_meta.applicants_name}'s withdraw Request Details</h1>
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">Application ID: <span className="font-semibold">{loan.application_id}</span></div>
                <div className="my-6">Applicant ID: <span className="font-semibold">{loan.application_meta.applicants_id}</span></div>
                <div className="my-6">Account: <span className="font-semibold">{loan.application_meta.account_type}</span></div>
                <div className="my-6">Amount: <span className="font-semibold">{loan.application_meta.amount}</span></div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: {loan.application_meta &&  loan?.application_meta.phone_number}</div>
                <img src={imageURL} width={200} className="rounded" alt="receipt" loading="lazy"/>
              </div>
          </div>
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            >Reject
          </button>
          <button
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