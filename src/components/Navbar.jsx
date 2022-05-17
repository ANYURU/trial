import { useState, useRef } from 'react'
import { IoMdPower } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useAuth } from '../auth/AuthContext'

function Navbar({ user }) {
  const [ show, setShow ] = useState(false)
  const navigate = useNavigate()
  const navRef = useRef()
  const { signOut } = useAuth()

  return (
    <div className={`fixed bg-white right-0 top-0 flex navbar ${user?.fullname === undefined || user?.fullname === null ? 'justify-between' : 'justify-end'} items-center p-2`}>
          {(user?.fullname === undefined || user.fullname === null) && <div className='bg-accent-red p-2 flex justify-center items-center text-white rounded-md cursor-pointer'
          onClick={() => {
            navigate('/application')
          }}>
            <p>Complete the application</p>
          </div>}
           <div className='flex items-end relative mr-5'
            onClick={() => setShow(!show)}
            ref={navRef}
          >
            <div className='flex items-center cursor-pointer'>
              <div className='text-center'>
                <p className='mb-0 cursor-pointer'>Hello  
                {(user?.fullname !== undefined && user.fullname !== null)
                ? ` ${user?.fullname.split(' ')[1]}`
                : ' Newbie !!'}
                </p>
                  <p className={`text-sm ${user?.member_status === 'active' ? 'text-green-600' : 'text-accent-red'}`}>{user?.member_status ? user.member_status : 'status'}
                </p>
              </div>
              { user?.avatar ? <img src={`${user?.avatar}`} alt="profile"/> :
                <div className='w-10 h-10 bg-accent rounded-full mx-2 flex justify-center font-bold items-center overflow-hidden'>
                  {(user?.fullname !== undefined && user.fullname !== null) && ` ${user?.fullname.split('')[0]}`}
                </div>
              }
              <MdKeyboardArrowDown />
            </div>
            <div className={show ? 'absolute px-3 py-3 shadow-sm w-full bg-white top-12 z-10' : 'hidden'}>
              <p style={{marginBottom: '0'}}
                onClick={() => navigate('/profile')}
                className='flex cursor-pointer justify-center items-center hover:bg-gray-100 p-2'
              >
                <span className='mr-1 '>
                  <MdSettings />
                </span>
                Profile
              </p>
              <p style={{marginBottom: '0'}}
                className='flex cursor-pointer justify-center items-center hover:bg-gray-100 p-2'
                onClick={async () => {
                  await signOut()
                  navigate('/login')
                }} 
              >
                <span className='mr-1 '>
                  <IoMdPower />
                </span>
                Logout
              </p>
          </div>
          </div>
      </div>
  )
}

export default Navbar



