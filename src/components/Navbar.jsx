import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useAuth } from '../auth/AuthContext'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import ProfileModal from './Modals/ProfileModal'

function Navbar({ user }) {
  const [ show, setShow ] = useState(false)
  const { darkMode, toggleDarkMode } = useAuth()
  const navigate = useNavigate()

  if(show){
    window.onclick = event => {
        if (!event.target.matches('.dialog')) {
            setShow(false)
        }
    }
  }

  return (
    <div className={` dark:bg-dark-bg-700 fixed bg-white right-0 top-0 flex navbar ${!user?.fullname ? 'justify-between' : 'justify-end'} items-center p-2`}>
          {(!user?.fullname) && <div className='bg-accent-red p-2 flex justify-center items-center text-white rounded-md cursor-pointer'
          onClick={() => {
            navigate('/application')
          }}>
            <p>Complete the application</p>
          </div>}
          <div className='flex items-center'>
            <div className='mx-3'>
              <DarkModeSwitch
                style={{ marginBottom: '0' }}
                checked={darkMode}
                onChange={() => toggleDarkMode()}
                size={30}
              />
            </div>
            <div className='flex items-end relative mr-5'
              onClick={(event) => {setShow(!show);event.stopPropagation()}}
            >
              <div className='flex items-center cursor-pointer dialog'>
                <div className='text-center'>
                  <p className='mb-0 cursor-pointer dark:text-white'>Hello
                  {(user?.fullname !== undefined && user.fullname !== null)
                  ? ` ${user?.fullname.split(' ')[0]}`
                  : ' Newbie !!'}
                  </p>
                    <p className={`text-sm ${user?.member_status === 'active' ? 'text-green-600' : 'text-accent-red'}`}>{user?.member_status ? user.member_status : 'status'}
                  </p>
                </div>
                { user?.avatar ? <div className='w-10 h-10 bg-accent rounded-full mx-2 overflow-hidden bg-cover' style={{backgroundImage: `url(${user?.avatar})`}}>
                </div> 
                : 
                  <div className='w-10 h-10 bg-accent dark:bg-dark-bg-600 dark:text-secondary-text rounded-full mx-2 flex justify-center font-bold items-center overflow-hidden'>
                   {(user?.fullname !== undefined && user.fullname !== null) && ` ${user?.fullname.split('')[0]}`}
                  </div>
                }
                <i className='dark:text-white'>
                  <MdKeyboardArrowDown />
                </i>
              </div>
              <ProfileModal show={show} setShow={setShow} />
            </div>
          </div>
      </div>
  )
}

export default Navbar



