import { useState, useRef } from 'react'
import { IoMdPower } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import MobileMenu from './MobileMenu'

function MobileNav() {
    const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const navRef = useRef()

  const [ showMenu, setShowMenu ] = useState(false)
  return (
    <div className='flex justify-between fixed inset-x-0 top-0 items-center px-4 py-2 bg-white'>
            <div
                onClick={() => {
                    setShowMenu(true)
                }}
                className='mx-3'
            >
                <GiHamburgerMenu className='font-bold'/>
            </div>
            
           <div className='flex items-end relative mr-8'
                onClick={() => setShow(!show)}
                ref={navRef}
            >
            
            <div className='flex items-center cursor-pointer'>
              <p className='mb-0 cursor-pointer'>Hello Abudi</p>
              <div>
                <div className='w-10 h-10 bg-accent rounded-full mx-2'></div>
                <p className='text-accent-red'>inactive</p>
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