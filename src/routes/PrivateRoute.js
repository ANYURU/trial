import { Outlet, Navigate} from 'react-router-dom'
import { Sidebar, Navbar, MobileNav } from '../components'
import { useMediaQuery } from '../hooks'
import { useAuth } from '../auth/AuthContext'
import { useEffect, useState } from 'react'
import { getProfile } from '../helpers/getProfile'
import { Loader } from '../components'


const PrivateRoute = () => {
    const matches = useMediaQuery('(min-width: 800px)')
    const { user, darkMode } = useAuth()
    const [ profile, setProfile ] = useState({})

    useEffect(() => {
        // Getting information that is required in all components.
        getProfile( user )
            .then( data => {
                setProfile(data)
            })
            .catch(error => console.log(error))

    }, [ user ])


    return user?.role === "authenticated" ? (
        
        matches 
        ?
            <div className={`${darkMode ? "dark" : ""}`}>
                <div className={`top-container bg-back dark:bg-dark-bg  `}>
                    <div className=''>
                        <Sidebar user={ profile } />
                    </div>
                    <div className='h-screen relative content'>
                        <Navbar user={ profile } />
                        <div></div>
                        <div className='mx-4'>
                            <Outlet context={[ profile, setProfile ]} />
                        </div>
                    </div>
                </div>
            </div>
        :
                <div className={`${darkMode ? "dark" : ""}`}>
                    <div className={`sm-container bg-back dark:bg-dark-bg`}>
                        <div className="">
                            <MobileNav user={profile} />
                        </div>
                        <div className='flex flex-col h-screen px-2 mt-20'>
                            <Outlet context={[profile]} />
                        </div>
                    </div>
                </div>
    ) : 
    <>
        {/* <Loader />  */}
        <Navigate to='/' />
    </>
}

export default PrivateRoute