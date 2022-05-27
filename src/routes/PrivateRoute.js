import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Sidebar, Navbar, MobileNav } from '../components'
import { useMediaQuery } from '../hooks'
import { useAuth } from '../auth/AuthContext'
import { useEffect, useState } from 'react'
import { getProfile } from '../helpers/getProfile'
import Loader from '../components/Loader'


const PrivateRoute = ({ allowedRoles }) => {
    const matches = useMediaQuery('(min-width: 800px)')
    const { user } = useAuth()
    const [ profile, setProfile ] = useState({})
    const [ roles, setRoles ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const location = useLocation()

    useEffect(() => {
        // Getting information that is required in all components.
        getProfile( user )
            .then( data => {
                if( data ) {
                    console.log(data)
                    const { roles } = data
                    setRoles( roles )
                    setProfile(data)
                }   
            })
            .then(() => setLoading( false ))
            .catch(error => console.log(error))
    }, [ user ])

    return user?.role === "authenticated" ? (
        
        matches 
        ?
            <div className='flex'>
                <div className=''>
                    <Sidebar user={ profile } />
                </div>
                <div className='bg-back w-full h-screen relative flex flex-col '>
                    <Navbar user={ profile } />
                        {
                            profile && (
                                allowedRoles !== undefined ? (
                                    roles !== null ? (
                                        roles.find( role => allowedRoles.includes(role)) 
                                        ? 
                                        <div className='flex-grow mx-5 mt-5 overflow-y-auto'>
                                            {loading ? <Loader /> :<Outlet context={[ profile, setProfile ]}/>}
                                        </div>
                                        :
                                        <div className='flex-grow mx-5 mt-5 overflow-y-auto'>
                                            <Navigate to="unauthorized" state={{ from: location }} replace/>
                                        </div>    
                                    ) 
                                    :
                                    <div className='flex-grow mx-5 mt-5 overflow-y-auto'>
                                        {loading ? <Loader /> : <Outlet context={[ profile, setProfile ]}/>}    
                                    </div>
                                )
                                :
                                <div className='flex-grow mx-5 mt-5 overflow-y-auto'>
                                    {loading ? <Loader /> : <Outlet context={[ profile, setProfile ]}/>}    
                                </div>
                                
                            ) 
                        }
                </div>
            </div>
        :
                <div>
                    <MobileNav user={profile} />
                    <div className='flex flex-col bg-back overflow-x-hidden h-screen px-2 mt-20'>
                        <Outlet context={[ profile ]} />
                    </div>
                </div>
    ) : 
    <>
        <Navigate to='/' state={{ from: location }} replace/>
    </>
}

export default PrivateRoute