import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Sidebar, Navbar, MobileNav } from '../components'
import { useMediaQuery } from '../hooks'
import { useAuth } from '../auth/AuthContext'
import { useEffect, useState } from 'react'
import { getProfile } from '../helpers/getProfile'
import { Loader } from '../components'


const PrivateRoute = ({ allowedRoles }) => {
    const matches = useMediaQuery('(min-width: 800px)')
    const { user, darkMode } = useAuth()
    const [ profile, setProfile ] = useState({})
    const [ roles, setRoles ] = useState(null)
    const location = useLocation()

    useEffect(() => {
        // Getting information that is required in all components.
        getProfile( user )
            .then( data => {
                if( data ) {
                    const { user_role: { roles  }} = data
                    setRoles( roles )
                    setProfile(data)
                }
                
            })
            .catch(error => console.log(error))

    }, [ user ])

    return user?.role === "authenticated" ? (
        
        matches 
        ?
            <div className={`${darkMode ? "dark" : ""}`}>
                <div className={`flex min-h-screen overflow-y-auto bg-back dark:bg-dark-bg  `}>
                    <div className=''>
                        <Sidebar user={ profile } />
                    </div>
                    <div className='min-h-screen content'>
                        <Navbar user={ profile } />
                        <div></div>
                        <div className='mx-4'>
                            {
                                profile && (
                                    allowedRoles !== undefined ? (
                                        roles !== null ? (
                                            roles.find( role => allowedRoles.includes(role)) 
                                            ? 
                                            <div className='h-full mx-5 mt-5'>
                                                <Outlet context={[ profile, setProfile ]}/>
                                            </div>
                                            :
                                            <div className='h-full mx-5 mt-5'>
                                                <Navigate to="unauthorized" state={{ from: location }} replace/>
                                            </div>    
                                        ) 
                                        :
                                        <div className='h-full mx-5 mt-5'>
                                            <Loader />
                                        </div>
                                    )
                                    :
                                    <div className='h-full mx-5 mt-5'>
                                        <Outlet context={[ profile, setProfile ]}/>
                                    </div>
                                ) 
                            }
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
        <Navigate to='/' state={{ from: location }} replace />
    </>
}

export default PrivateRoute