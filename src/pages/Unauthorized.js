import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Unauthorized() {
    const navigate = useNavigate()
    const [ navigateBack, setNavigateBack ] = useState( false )

    useEffect(() => {
        if( navigateBack ) { 
            navigate(-1)
        }
    }, [ navigateBack, navigate])

    return (
        <p>
            You do not have access to this to the requested page. Click <span><button onClick={() => setNavigateBack(true)}>Go back</button></span>.
        </p>
      
    )
}

export default Unauthorized