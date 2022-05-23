import { Outlet, Navigate} from 'react-router-dom'
import { Sidebar, Navbar, MobileNav } from '../components'
import { useMediaQuery } from '../hooks'
import { useAuth } from '../auth/AuthContext'
import { useEffect, useState } from 'react'
import { getProfile } from '../helpers/getProfile'


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

    return user ? (
        
        matches 
        ?
            <div className={`top-container bg-back ${darkMode ? "dark" : ""} `}>
                <div className=''>
                    <Sidebar user={ profile } />
                </div>
                <div className='h-screen relative flex flex-col content dark:bg-dark-bg'>
                    <Navbar user={ profile } />
                    <div className='flex-grow mt-20 mx-4'>
                        <Outlet context={[ profile, setProfile ]} />
                    </div>
                </div>
            </div>
        :
                <div className={`bg-back ${darkMode ? "dark" : ""}`}>
                    <div className="">
                        <MobileNav user={profile} />
                    </div>
                    <div className='flex flex-col h-screen px-2 mt-20 dark:bg-dark-bg'>
                        <Outlet context={[profile]} />
                    </div>
                </div>
    ) : 
    <>
        {/* <Loader />  */}
        <Navigate to='/' />
    </>
}

export default PrivateRoute