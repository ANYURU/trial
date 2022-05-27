import { useParams } from "react-router-dom"
import { supabase } from "../../helpers/supabase"
import { useState, useEffect } from "react"
import { Loader } from "../../components"
import { downloadFile } from "../../helpers/utilites"

export default function ApplicantApproval() {
  const { id } = useParams()

  useEffect(() => {
    getApplication()
  })

  const [ application, setApplication ] = useState(null)
  const [ imageURL, setImageURL ] = useState('')

  const getApplication = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "membership")
    .eq("application_id", id)
    setApplication(data[0])
  }

  
  

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Approve Member</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      {application  ? <div className='flex flex-grow flex-col min-h-full'>
           <div className='mb-3'>
              {/* <h1 className='font-semibold'>{profile?.fullname}'s withdraw Request Details</h1> */}
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">Application ID: {id}</div>
                <div className="">Applicant's name: {application.application_meta.applicants_name}</div>
                <div className="my-6">Email Address: {application.application_meta.email_address}</div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: </div>
                {/* <img src={imageURL} width={200} className="rounded" alt="receipt" loading="lazy"/> */}
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