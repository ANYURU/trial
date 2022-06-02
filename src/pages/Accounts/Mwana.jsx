import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../helpers/supabase'
import { useNavigate, useOutletContext } from 'react-router-dom'


function Mwana() {
//   const [ profile ] = useOutletContext()
//   console.log(profile)
 

  // const navigate = useNavigate()
  const create_account = async () => {
    try {
      const { data, error } = await supabase.rpc('create_mwana_account', {})
      if(error) throw error
      toast.success(`Account successfully opened`, { position: "top-center" })
      console.log(data)
    } catch (error) {
      if(error?.code === "23505") {
        toast.error(`You already have an account.`, { position:'top-center'})
      } else {
        toast.error(`${error?.message}`, { position: "top-center" })
      }
      
      // navigate(-1)
    } 
  }
  

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Mwana Account</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <p className='text-md'>You don't have a Mwana account</p>
          <button 
            className='bg-primary rounded-md text-white px-3 py-1 w-56 mt-3'
            onClick={create_account}
          >
            Open Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Mwana