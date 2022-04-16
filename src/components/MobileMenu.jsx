import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { NavLink, } from 'react-router-dom'
import { menuData } from '../helpers/menuData'
import logo from '../assets/images/tube.png'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'

function MobileMenu({ setShowMenu }) {

    const [ show, setShow ] = useState(false)
    const [ selectedIndex, setSelectedIndex ] = useState(null)

    const lit = menuData.admin.filter(item => item.sublinks).map(item => item.sublinks)

  return ReactDOM.createPortal(
    <div className="bg-black bg-opacity-40 w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex justify-start items-center">
      <div className="bg-white h-screen w-11/12 top-0 left-0 shadow-sm">
        <div 
            className="flex justify-between px-3 items-center"
            onClick={() => setShowMenu(false)}
        >
        <div className='bg-white flex justify-center items-center mb-6'>
            <img src={logo} alt="tube" width={110} />
        </div>
          <IoCloseSharp />
        </div>
        <div className='h-full'>
        {menuData.admin.map((item, index) => (
            <>
            <NavLink
                key={index}
                to={`/${item.link}`}
                className='flex justify-between mx-2 px-3 py-2 rounded-lg hover:bg-accent'
            >
                <div className='flex items-center'>
                    <i className='mx-2'>{item.icon}</i>
                    {item.label}
                </div>
                {index !== 0 && index !== 5 && 
                    (show && index === selectedIndex 
                    ? <MdKeyboardArrowUp onClick={() => setShow(!show)} />
                    : <MdKeyboardArrowDown onClick={() => {setShow(!show);setSelectedIndex(index)}} />)
                }
            </NavLink>
            {show && index === selectedIndex &&
                <div className='bg-accent mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer'>
                    {
                        lit[index-1].map((item, i) => (
                            <div>
                                <NavLink
                                    to={`${item.link}`}
                                    className='flex px-2 py-1 rounded-md'
                                >
                                    {item.label}
                                </NavLink>
                            </div>
                        ))
                    }
                </div>
            }
            </>
        ))}

    </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default MobileMenu