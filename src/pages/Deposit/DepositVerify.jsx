import { Submit } from "../../components"
import { useParams } from "react-router-dom"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { Loader } from "../../components"
import { downloadFile } from "../../helpers/utilites"
import { toast, ToastContainer }  from 'react-toastify'
import { useOutletContext } from "react-router-dom"

export default function DepositVerify() {
  const { id } = useParams()
  const [ profile ] = useOutletContext()

  const [ deposit, setDeposit ] = useState(null)
  const [ imageURL, setImageURL ] = useState('')

  useEffect(() => {
    if( !deposit ) {
      getApplication()
      .then( async ( data ) => {
        if( data ) {
          setDeposit( data )
          // Downloading the image.
          if( !imageURL ) {
            const { data: file, error } = await supabase.storage  
              .from("deposits")
              .download(await data.application_meta.files[0].file_url.substring(9))

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
    const { error, data } = await supabase.rpc("fetch_deposit_applications")
    if(error) throw error
    if(data) {
      const [deposit_application] = data.filter( deposit_application => deposit_application.application_id === id)
      return deposit_application
    } 
  }

  const approveDepositTransaction = async () => {
    const { application_meta : { applicants_id }} = deposit
    
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

  const rejectDepositTransaction = async() => {
    try {
      const { data, error } = await supabase.rpc( 'reject_application', { application: id })
      if( error ) {
        throw error
      } else {
        // handle the alerts and navigation
        toast.success(`Transaction has been rejected.`, { position:"top-center" })
      }
    } catch(error) {
      console.log(error)
    }
  }

  
  

  return (
    <div className='h-full'>
      <ToastContainer />
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Verify Deposit</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      {deposit  ? <div className='flex flex-grow flex-col min-h-full'>
           <div className='mb-3'>
              {/* <h1 className='font-semibold'>{profile?.fullname}'s withdraw Request Details</h1> */}
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">Applicant ID: <span className="font-semibold">{deposit.application_meta.applicants_id}</span></div>
                <div className="my-6">Application ID: <span className="font-semibold">{deposit.application_id}</span></div>
                <div className="my-6">Account: <span className="font-semibold">{deposit.application_meta.account_type}</span></div>
                <div className="my-6">Amount: <span className="font-semibold">{deposit.application_meta.amount}</span></div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: {deposit.application_meta &&  deposit?.application_meta.phone_number}</div>
                <img src={imageURL} width={200} className="rounded" alt="receipt" loading="lazy"/>
                {/* {imageURL && console.log(imageURL)} */}
              </div>
          </div>
          {deposit.application_meta.applicants_id !== profile.id &&
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            type="submit"
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={rejectDepositTransaction}
            >Reject
          </button>
          <button
            type="submit"
            className='bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            onClick={approveDepositTransaction}
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