import React from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IoMdPower } from 'react-icons/io'
import { MdOutlinePersonOutline } from 'react-icons/md'

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
            console.log(user.id)
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