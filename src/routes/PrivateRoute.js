import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Sidebar, Loader, Navbar, MobileNav } from '../components'
import { useMediaQuery } from '../hooks'

const PrivateRoute = () => {

    const matches = useMediaQuery('(min-width: 800px)')

    return true ? (

        matches 
        ?
            <div className='flex'>
                <div className=''>
                    <Sidebar />
                </div>
                <div className='bg-back w-full h-screen relative flex flex-col '>
                    <Navbar />
                    <div className='flex-grow mx-5 mt-5 overflow-y-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        :
            <>
                <div>
                    <MobileNav />
                    <div className='flex flex-col bg-back overflow-x-hidden h-screen px-2 mt-20'>
                        <Outlet  />
                    </div>
                </div>
            </>


    ) : 
    <Loader />
}

export default PrivateRoute