import React from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoMdPower } from 'react-icons/io'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { supabase } from '../../helpers/supabase'

function ProfileModal({ show, setShow }) {
  const { signOut, socket, user } = useAuth()
  const navigate = useNavigate()

    
  return (
    <div className={show ? 'absolute px-3 py-3 shadow-md w-full bg-white dark:bg-dark-bg-700 dark:text-secondary-text top-12 z-10' : 'hidden'}>
        <p style={{marginBottom: '0'}}
          onClick={() => navigate('/profile')}
          className='flex cursor-pointer justify-start items-center hover:bg-gray-100 dark:hover:bg-dark-bg-600 p-2'
        >
          <span className='mr-2'>
            <MdOutlinePersonOutline />
          </span>
          Profile
        </p>
        <p style={{marginBottom: '0'}}
          className='flex cursor-pointer justify-start items-center hover:bg-gray-100 dark:hover:bg-dark-bg-600 p-2'
          onClick={async () => {
            const { data, error } = await supabase  
              .from('profiles')
              .update({
                last_seen: new Date()
                        .toISOString()
                        .toLocaleString("en-GB", { timeZone: "UTC" })
              })
              .match({ 'id': user.id})
              .single()

            if(error) throw error
            await socket.emit("logout", user.id)
            await signOut()
            navigate('/login')
          }} 
        >
          <span className='mr-2'>
            <IoMdPower />
          </span>
          Logout
        </p>
    </div>
  )
}

export default ProfileModal