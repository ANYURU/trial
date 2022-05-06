import { Outlet, Navigate} from 'react-router-dom'
import { Sidebar, Navbar, MobileNav } from '../components'
import { useMediaQuery } from '../hooks'
import { useAuth } from '../auth/AuthContext'
import { useEffect, useState } from 'react'
import { getProfile } from '../helpers/getProfile'


const PrivateRoute = () => {
    const matches = useMediaQuery('(min-width: 800px)')
    const { user } = useAuth()
    const [ profile, setProfile ] = useState({})

    useEffect(() => {
        getProfile( user )
            .then(data => {
                setProfile(data)
            })
            .catch(error => console.log(error))
    }, [user])

    return user ? (
        
        matches 
        ?
            <div className='flex'>
                <div className=''>
                    <Sidebar user={profile} />
                </div>
                <div className='bg-back w-full h-screen relative flex flex-col '>
                    <Navbar user={profile} />
                    <div className='flex-grow mx-5 mt-5 overflow-y-auto'>
                        <Outlet context={[ profile ]} />
                    </div>
                </div>
            </div>
        :
                <div>
                    <MobileNav user={profile} />
                    <div className='flex flex-col bg-back overflow-x-hidden h-screen px-2 mt-20'>
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