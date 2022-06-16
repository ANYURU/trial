import { useEffect, useState } from "react"
import { supabase } from "../../helpers/supabase"
import { useAuth } from "../../auth/AuthContext"
import { Spinner } from "../../components"

function Savings() {

  const { user:{ id }} = useAuth()
  const [ savings, setSavings ] = useState({})
  const [ loading, setLoading ] = useState(true)
  
  const getSavings = async () => {
    const { data, error } = await supabase
      .from('savings_accounts')
      .select()
      .eq('member_id', id)
      .single()

    if( error ) throw error
    return data
  }

  useEffect(() => {
    getSavings()
    .then((data) => {
      if ( data ) {
        console.log(data)
        setSavings(data)
        setLoading(false)
      }
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <div className='flex-grow mx-5 my-2 h-[calc(100vh-70px)]'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Savings Account</h1>
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
                <p>{savings?.account_id}</p>
              </div>
            </div>
            <div className="flex gap-10">
              <p>Status</p>
              <div className="flex font-bold">
                <p>{savings?.account_status}</p>
              </div>
            </div>
            <div className="flex gap-10">
              <p>Account Balance</p>
              <div className="flex font-bold">
                <p>{savings?.balance}</p>
                <span>ugx</span>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default Savings