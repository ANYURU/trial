import React, { useState } from 'react'
import { useEffect } from 'react'
import { supabase } from '../../helpers/supabase'

function Chat2() {
    const sender_id='e240dc04-0dc5-435c-8c96-0d0469733429'
    const receiver_id='8c40596a-9d02-4729-b47c-306fc0ea0398'
    const [message, setMessage] = useState()

    useEffect(() => {
        const mySubscription = supabase
            .from('messenger')
            .on('INSERT', payload => {
                console.log(payload)
            })
            .subscribe()
           

            

        // return () => supabase.removeSubscription(mySubscription)
    }, [])


  return (
    <div className='flex justify-end'>
        <form className='w-22'>
            <input 
                type="text" 
                className="border px-2 w-full focus:outline-none border-r-0 border-l-0 border-t-0 border-b-1 focus:border-primary placeholder:text-xs text-sm placeholder:py-2" 
                placeholder="bingo"
                onChange={(event)=> setMessage(event.target.value)}
            />
            <button 
                type="submit"
                onClick={async (e) => {
                    e.preventDefault()
                    const { data, error } = await supabase
                        .from('messenger')
                        .insert({
                            sender_id,
                            receiver_id,
                            message,
                            created_at: new Date()
                                    .toISOString()
                                    .toLocaleString("en-GB", { timeZone: "UTC" }),
                            updated_at: new Date()
                                    .toISOString()
                                    .toLocaleString("en-GB", { timeZone: "UTC" })
                        })
                        .single()

                    if(error) console.log(error)
                    console.log(data)
                }}
            >
                try me
            </button>
        </form>
    </div>
  )
}

export default Chat2