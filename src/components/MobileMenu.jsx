import { NavLink, } from 'react-router-dom'
import { menuData } from '../helpers/menuData'
import logo from '../assets/images/tube-no-bg.png'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'

function MobileMenu({ setShowMenu }) {

    const [ show, setShow ] = useState(false)
    const [ selectedIndex, setSelectedIndex ] = useState(null)

    const lit = menuData.admin.filter(item => item.sublinks).map(item => item.sublinks)

  return (
      <div className="bg-white dark:bg-dark-bg-700 h-screen w-11/12 top-0 left-0 bottom-0 shadow-sm z-20">
        <div className='bg-white dark:bg-dark-bg-700 flex justify-center items-center mb-6'>
            <img src={logo} alt="tube" width={110} />
        </div>
        {menuData.admin.map((item, index) => (
            <NavLink
                key={index}
                to={`/${item.link}`}
                className='flex justify-between mx-2 px-3 py-2 rounded-lg hover:bg-accent dark:hover:bg-dark-bg-600'
            >
                <div className='flex items-center'>
                    <i className='mx-2'>{item.icon}</i>
                    {item.label}
                </div>
                {index !== 0 && index < 5 && 
                    (show && index === selectedIndex 
                    ? <MdKeyboardArrowUp onClick={() => setShow(!show)} />
                    : <MdKeyboardArrowDown onClick={() => {setShow(!show);setSelectedIndex(index)}} />)
                }
                {show && index === selectedIndex &&
                    <div className='bg-accent dark:bg-dark-bg-600 mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer'>
                        {
                            lit[index-1].map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={`${item.link}`}
                                        className='flex px-2 py-1 rounded-md'
                                    >
                                        {item.label}
                                    </NavLink>
                            ))
                        }
                    </div>
                }
            </NavLink>
        ))}
      </div>
  )
}

export default MobileMenu