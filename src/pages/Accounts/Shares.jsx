import {useState, useEffect }from 'react'
import { supabase } from "../../helpers/supabase"
import { useAuth } from "../../auth/AuthContext"
import { Spinner } from "../../components"


function Shares() {
  const { user:{ id }} = useAuth()
  const [ shares, setShares ] = useState({})
  const [ loading, setLoading ] = useState(true)

  const getShares = async () => {
    const { data, error } = await supabase
      .from('shares_accounts')
      .select()
      .eq('member_id', id)
      .single()

    if( error ) throw error
    return data
  }

  useEffect(() => {
    getShares()
    .then(data => {
      if ( data ) {
        console.log(data)
        setShares(data)
        setLoading(false)
      }
    })
    .catch(error => console.log(error))
  }, [])


  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Shares Account</h1>
      <div className="flex flex-col bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
        {
          loading
          ? 
          <Spinner />
          :
          <>
            <div className="flex gap-10">
              <p>Account Number</p>
              <div className="flex font-bold">
                <p>{shares?.account_id}</p>
              </div>
            </div>
            <div className="flex gap-10">
              <p>Status</p>
              <div className="flex font-bold">
                <p>{shares?.account_status}</p>
              </div>
            </div>
            <div className="flex gap-10">
              <p>Account Balance</p>
              <div className="flex font-bold">
                <p>{shares?.balance}</p>
                <span>ugx</span>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Shares