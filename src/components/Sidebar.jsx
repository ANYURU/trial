import { NavLink, } from 'react-router-dom'
import { menuData } from '../helpers/menuData'
import logo from '../assets/images/tube.png'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import React, { useState } from 'react'

export default function Sidebar({ user }) {
    const role = user?.user_role?.roles.includes("admin") ? "admin" : "member"
    const [ show, setShow ] = useState(false)
    const [ selectedIndex, setSelectedIndex ] = useState(null)
    const lit = menuData[`${role}`].filter(item => item.sublinks).map(item => item.sublinks)

    return (
        <div className='h-full fixed  bg-white sidebar dark:bg-dark-bg-700'>
            <div className='bg-white dark:bg-dark-bg-700 flex justify-center items-center mb-6'>
                <img src={logo} alt="tube" width={110} />
            </div>
            {menuData[`${role}`].map((item, index) => (
                <React.Fragment key={index}>
                    <NavLink
                        key={item.link}
                        to={`/${item.link}`}
                        className='flex justify-between mx-2 px-3 py-1 rounded-lg hover:bg-dark-bg-600'
                    >
                        <div className='flex items-center dark:text-secondary-text'>
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
                        <div className='bg-accent mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer dark:text-white dark:bg-dark-bg-700'>
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
                </React.Fragment>
            ))}
        </div>
    )
}