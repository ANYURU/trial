import { NavLink, } from 'react-router-dom'
import { menuData } from '../helpers/menuData'
import logo from '../assets/images/tube.png'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'

export default function Sidebar({ user }) {
    const role = user?.profile?.user_role?.roles.includes("member") ? "member" : "admin"
    const [ show, setShow ] = useState(false)
    const [ selectedIndex, setSelectedIndex ] = useState(null)
    const lit = menuData[`${role}`].filter(item => item.sublinks).map(item => item.sublinks)

    return (
        <div className='h-full w-64'>
            <div className='bg-white flex justify-center items-center mb-6'>
                <img src={logo} alt="tube" width={110} />
            </div>
            {menuData[`${role}`].map((item, index) => (
                <>
                <NavLink
                    key={item.link}
                    to={`/${item.link}`}
                    className='flex justify-between mx-2 px-3 py-1 rounded-lg hover:bg-accent'
                >
                    <div className='flex items-center'>
                        <i className='mx-2'>{item.icon}</i>
                        {item.label}
                    </div>
                    {index !== 0 && index < menuData[`${role}`].length - 1 && 
                        (show && index === selectedIndex 
                        ? <MdKeyboardArrowUp onClick={() => setShow(!show)} />
                        : <MdKeyboardArrowDown onClick={() => {setShow(!show);setSelectedIndex(index)}} />)
                    }
                </NavLink>
                {show && index === selectedIndex &&
                    <div className='bg-accent mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer'>
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
                </>
            ))}
        </div>
    )
}