import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Unauthorized() {
    const navigate = useNavigate()
    const [ navigateBack, setNavigateBack ] = useState( false )

    useEffect(() => {
        if( navigateBack ) { 
            navigate(-1)
        }
    })

    return (
        <div className='w-full h-full flex justify-center items-center bg-white'>
            <p>You do not have access to this to the requested page. Click <button onClick={() => setNavigateBack(true)} className="text-primary font-semibold">Go back</button> to go back.</p>
        </div> 
    )
}

export default Unauthorized