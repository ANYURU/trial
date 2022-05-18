import { useState, useRef } from 'react'
import { IoMdPower } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import MobileMenu from './MobileMenu'

function MobileNav({ user }) {
    const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const navRef = useRef()

  console.log(user)

  const [ showMenu, setShowMenu ] = useState(false)
  return (
    <div className='fixed flex justify-between top-0 right-0 left-0 items-center mobile-navbar p-2 bg-white overflow-hidden'>
            <div
                onClick={() => {
                    setShowMenu(true)
                }} className='mx-3'
            >
                <GiHamburgerMenu className='font-bold'/>
            </div>
            
           <div className='flex items-end relative mr-8'
                onClick={() => setShow(!show)}
                ref={navRef}
            >
            
            <div className='flex items-center cursor-pointer'>
                <div className="text-center">
                    <p className='mb-0 cursor-pointer'>Hello
                        {user?.fullname !== undefined
                        ? ` ${user?.fullname.split(' ')[0]}`
                        : ''}
                    </p>
                    <p className={`text-sm ${user?.member_status === 'active' ? 'text-green-600' : 'text-accent-red'}`}>{user?.member_status ? user.member_status : 'status'}
                    </p>
                </div>
              <div>
              { user?.avatar ? <img src={`${user?.avatar}`} alt="profile"/> :
                <div className='w-10 h-10 bg-accent rounded-full mx-2 flex justify-center font-bold items-center overflow-hidden'>
                  {(user?.fullname !== undefined && user.fullname !== null) && ` ${user?.fullname.split('')[0]}`}
                </div>
              }
                <p className={`${user.memberStatus === 'active' ? 'text-green-600' : 'text-accent-red'}`}>{user.memberStatus}</p>
              </div>
              <MdKeyboardArrowDown />
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

          {showMenu &&
            <MobileMenu setShowMenu={setShowMenu}/>
          }
      </div>
  )
}

export default MobileNav