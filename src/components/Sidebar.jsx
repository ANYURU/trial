import { NavLink, } from 'react-router-dom'
import { menuData } from '../helpers/menuData'
import logo from '../assets/images/tube-no-bg.png'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import React, { useState } from 'react'
import { IconContext } from 'react-icons/lib'

export default function Sidebar({ user }) {
    const role = !user ? "member" : (user?.roles && user?.roles.includes("admin") ? "admin" : "member" )
    console.log(user)

    const [ show, setShow ] = useState(true)
    const [ selectedIndex, setSelectedIndex ] = useState( null )
    const [ disabled ] = useState( user && user?.roles === null ? true : false )
    console.log(disabled)
    const lit = menuData[`${role}`].filter(item => item.sublinks).map(item => item.sublinks)


    return (
        <div className='h-full fixed  bg-white sidebar dark:bg-dark-bg-700'>
            <div className='bg-white h-[110px] dark:bg-dark-bg-700 flex justify-center items-center mb-6'>
                <img src={logo} alt="tube" width={110} loading="lazy"/>
            </div>
            {menuData[`${role}`].map((item, index) => (
                <React.Fragment key={index}>
                    <NavLink
                        key={item.link}
                        to={`/${item.link}`}
                        className={ `flex justify-between mx-2 my-1 px-3 py-1 rounded-lg hover:bg-accent dark:hover:bg-dark-bg-600 ${( disabled && (item?.link !== 'dashboard' && item?.link !== 'profile') ) && `disabled-link`}` }

                    >
                        <div className='flex items-center dark:text-secondary-text'>
                        <IconContext.Provider value={{ className: `font-bold text-lg` }}>
                            <i className='mx-2'>{item.icon}</i>
                        </IconContext.Provider>
                            <span className='font-semibold'>{item.label}</span>
                        </div>
                        <IconContext.Provider value={{ className: `font-bold text-lg dark:text-secondary-text` }}>
                        {
                        index !== 0 && index < menuData[`${role}`].length - 1 && 
                            (show && index === selectedIndex 
                            ? <MdKeyboardArrowUp onClick={() => setShow(!show)} />
                            : <MdKeyboardArrowDown onClick={() => {setShow(!show);setSelectedIndex(index)}} />)
                        }
                        </IconContext.Provider>
                    </NavLink>
                    {show && index === selectedIndex &&
                        <div className='bg-accent dark:bg-dark-bg-600 mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer dark:text-secondary-text '>
                            {
                                lit[index-1].map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={`${item.link}`}
                                        className='flex px-2 py-1 rounded-md hover:bg-gray-200 hover:dark:bg-dark-bg-700'
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