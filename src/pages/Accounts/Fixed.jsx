import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { Loader } from "../../components"

function Fixed() {

  const { user:{ id }} = useAuth()
  const [ fixed, setFixed ] = useState({})
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    document.title = 'Fixed Accounts - Bweyogere tuberebumu'
    getFixed()
      .then(data => {
        if (data) {
          console.log(data)
          setFixed(data)
          setLoading(false)
        }
        else {
          setLoading(false)
          setFixed(null)
        }
      })
      .catch(error => console.log(error))

    return () => {}
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

  const getFixed = async () => {
    const { data, error } = await supabase
      .from('fixed_deposit_accounts')
      .select()
      .eq('member_id', id)
      .single()

    if( error ) throw error
    return data
  }

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>fixed Account</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
        {
          loading 
          ? 
          <Loader /> 
          :
          (
            fixed === null 
            ? 
            (
              <div className="flex flex-col justify-center items-center w-full">
                <p className='text-md'>You don't have a Fixed account</p>
                <button 
                  className='bg-primary rounded-md text-white px-3 py-1 w-56 mt-3'
                  onClick={create_account}
                  >
                  Open Account
                </button>
              </div>
            )
            :
            (
              <div className="flex flex-col">
                <div className="flex gap-10">
                  <p>Account Number</p>
                  <div className="flex font-bold">
                    <p>{fixed?.account_id}</p>
                  </div>
                </div>
                <div className="flex gap-10">
                  <p>Status</p>
                  <div className="flex font-bold">
                    <p>{fixed?.account_status}</p>
                  </div>
                </div>
                <div className="flex gap-10">
                  <p>Account Balance</p>
                  <div className="flex font-bold">
                    <p>{fixed?.balance}</p>
                    <span>ugx</span>
                  </div>
                </div>
              </div>
            )     
          )
        }
      </div>
    </div>
  )
}


export default Fixed