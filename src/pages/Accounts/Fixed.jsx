import { supabase } from '../../helpers/supabase'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function Fixed() {

  useEffect(() => {
    document.title = 'Fixed Accounts - Bweyogere tuberebumu'
  }, [])

  const create_account = async () => {
    try {
      const { error } = await supabase.rpc('create_fixed_deposit_account', {})
      if(error) throw error
      toast.success(`Account successfully opened`, { position: "top-center" })

    } catch (error) {
      toast.error(`${error?.code === "" ? 'You already have an account.' : 'Please try again later.'}`, { position:'top-center'}) 
      
    } 
  }

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Fixed Account</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <p className='text-md'>You don't have a Fixed account</p>
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

export default Fixed