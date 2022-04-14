import { useState } from 'react'

export const useForm = (initialValues, onSubmit) => {
    const [ formData, setFormData ] = useState(initialValues)

    const handleFormChange = (e) => {
        setFormData(
            { ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onSubmit?.(formData)
    }

    return [ formData, handleFormChange, handleFormSubmit];
}

