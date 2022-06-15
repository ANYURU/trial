import { useParams } from "react-router-dom"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { Loader } from "../../components"
import { toast, ToastContainer }  from 'react-toastify'
import { useOutletContext } from "react-router-dom"

export default function LoanPaymentVerify() {
  const { id } = useParams()
  const [ profile ] = useOutletContext() 
  const [ loanPaymentApplication, setLoanPaymentApplication ] = useState(null)
  const [ imageURL, setImageURL ] = useState('')

  useEffect(() => {
    if(!loanPaymentApplication) {
        // Fetching the application.
        getApplication()
        .then( async ( data ) => {
            if( data ) {
                setLoanPaymentApplication(data)
                // Downloading the image.
                if(!imageURL) {
                    const { data: file, error } = await supabase.storage
                        .from("loans")
                        .download(await data.application_meta.files[0].file_url.substring(6))
            
                    if( error ) throw error
                    const url = URL.createObjectURL(file)
                    setImageURL(url)    
                }
            }
        })
        .catch(error => console.log(error))
    }
  }, [])
  

  const getApplication = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "payment")
    .eq("application_id", id)
    .single() 

    console.log(data)
    
    if( error ) throw error
    return data
  }

  const approveLoanPaymentApplicationTransaction = async () => {
    const { application_meta : { loan_id }} = loanPaymentApplication
    
    try {
      const { data, error } = await supabase.rpc( 'approve_loan_payment', { loan:loan_id, application:id  })
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


  const rejectLoanPaymentApplicationTransaction = async() => {
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

  
  

  return (
    <div className='h-full'>
      <ToastContainer />
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'> Verify loan Payment </h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      {loanPaymentApplication  ? <div className='flex flex-grow flex-col min-h-full'>
           <div className='mb-3'>
              {/* <h1 className='font-semibold'>{profile?.fullname}'s withdraw Request Details</h1> */}
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">Applicant ID: <span className="font-semibold">{loanPaymentApplication.application_meta.applicants_id}</span></div>
                <div className="my-6">Application ID: <span className="font-semibold">{loanPaymentApplication.application_id}</span></div>
                <div className="my-6">Account: <span className="font-semibold">{loanPaymentApplication.application_meta.account_type}</span></div>
                <div className="my-6">Amount: <span className="font-semibold">{loanPaymentApplication.application_meta.amount}</span></div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: {loanPaymentApplication.application_meta &&  loanPaymentApplication?.application_meta.phone_number}</div>
                <img src={imageURL} width={200} className="rounded" alt="receipt" loading="lazy"/>
                {/* {imageURL && console.log(imageURL)} */}
              </div>
          </div>
          {loanPaymentApplication.application_meta.applicants_id !== profile.id &&
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            type="submit"
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={rejectLoanPaymentApplicationTransaction}
            >Reject
          </button>
          <button
            type="submit"
            className='bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={approveLoanPaymentApplicationTransaction}
            >Approve
          </button>
          </div>
          }
      </div>
      :
      <Loader />
      }
      </div>
    </div>
  )
}