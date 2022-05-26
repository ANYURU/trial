import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoCloseSharp } from 'react-icons/io5'
import MobileMenu from './MobileMenu'
import ProfileModal from './Modals/ProfileModal'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useAuth } from '../auth/AuthContext'
import { IconContext } from 'react-icons/lib'

function MobileNav({ user }) {
    
  const navigate = useNavigate()

  const [ showMenu, setShowMenu ] = useState(false)
  const { darkMode, toggleDarkMode } = useAuth()

  const [show, setShow] = useState(false)
  if(show === true){
    window.onclick = function(event) {
        if (!event.target.matches('.dialog')) {
            setShow(false)
        }
    }
  }
  return (
    <div className='fixed flex justify-between z-20 top-0 right-0 left-0 items-center mobile-navbar p-2 bg-white dark:bg-dark-bg-700 dark:text-white'>
            <div
                onClick={() => {
                    setShowMenu(!showMenu)
                }} className='mx-3 font-bold cursor-pointer hover:bg-accent dark:hover:bg-dark-bg-600 p-2 rounded-full'
            >
              <IconContext.Provider value={{ className: `font-bold text-2xl` }}>
                { !showMenu ? <GiHamburgerMenu /> : <IoCloseSharp /> }
              </IconContext.Provider>
            </div>

            <div className='mx-3'>
              <DarkModeSwitch
                style={{ marginBottom: '0' }}
                checked={darkMode}
                onChange={() => toggleDarkMode()}
                size={30}
              />
            </div>
            
           <div className='flex items-end relative mr-8 dialog'
                onClick={(event) => {setShow(!show); event.stopPropagation()}}
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
                <div className='w-10 h-10 bg-accent rounded-full mx-2 flex justify-center font-bold items-center overflow-hidden dark:bg-dark-bg-600 dark:text-secondary-text'>
                  {(user?.fullname !== undefined && user.fullname !== null) && ` ${user?.fullname.split('')[0]}`}
                </div>
              }
                <p className={`${user.memberStatus === 'active' ? 'text-green-600' : 'text-accent-red'}`}>{user.memberStatus}</p>
              </div>
              <MdKeyboardArrowDown />
                <ProfileModal show={show} setShow={setShow} />
            </div>
            
          </div>

          {/* {showMenu && */}
            {/* <div className='{bg-black bg-opacity-40 top-10 right-0 bottom-0 w-screen h-screen z-10 fixed'> */}
              <div className={` w-screen h-screen z-20 fixed top-[60px] right-0 bottom-0 flex justify-start items-center overflow-y-hidden ease-in-out duration-300 opacity-100
               ${showMenu ? "left-0 " : "-left-full"}`}>
                  <MobileMenu setShowMenu={setShowMenu}/>
              </div>
              {showMenu && <div className="w-screen h-screen bg-black opacity-20 fixed top-[60px] left-0 z-10"></div>}
            {/* </div> */}
          {/* } */}
      </div>
  )
}

export default MobileNav