import { useState, useRef } from 'react'
import { IoMdPower } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'

function Navbar({ user }) {
  const [ show, setShow ] = useState(false)
  const navigate = useNavigate()
  const navRef = useRef()

  return (
    <div className={`bg-white top-0 flex ${user?.fullname === undefined || user?.fullname === null ? 'justify-between' : 'justify-end'} items-center p-2 py-4`}>
          {(user?.fullname === undefined || user.fullname === null) && <div className='bg-accent-red p-2 flex justify-center items-center text-white rounded-md cursor-pointer'
          onClick={() => {
            navigate('/application')
          }}>
            <p>Complete the application</p>
          </div>}
           <div className='flex items-end relative mr-8'
            onClick={() => setShow(!show)}
            ref={navRef}
          >
            <div className='flex items-center cursor-pointer'>
              <p className='mb-0 cursor-pointer'>Hello  
              {(user?.fullname !== undefined && user.fullname !== null)
              ? ` ${user?.fullname.split(' ')[1]}`
              : ' Newbie !!'}
              </p>
              <div>
                <div className='w-10 h-10 bg-accent rounded-full mx-2'>
                  { user?.avatar && <img src={`${user?.avatar}`} alt=""/>}
                </div>
                <p className={`${user?.member_status === 'active' ? 'text-green-600' : 'text-accent-red'}`}>{user.member_status}</p>
              </div>
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
                onClick={() => navigate('/login')}
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



