import { useState } from 'react'

function useDialog() {

    const [ show, setShow ] = useState(false)
    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)
    return [ show, handleOpen, handleClose]
}

export default useDialog