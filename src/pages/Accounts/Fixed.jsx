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
      toast.error(`${error?.code === "23505" ? 'You already have an account.' : 'Please try again later.'}`, { position:'top-center'}) 
      
    } 
  }

  return (
    <div className='flex-grow mx-5 my-2 h-[calc(100vh-70px)]'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Fixed Account</h1>
      <div className="bg-white p-2 overflow-hidden  relative  h-[calc(100%-80px)] dark:bg-dark-bg-700">
        <div className="flex h-full flex-col justify-center items-center w-full">
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