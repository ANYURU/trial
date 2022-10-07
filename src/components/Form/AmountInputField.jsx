import { ErrorMessage } from "formik"
import { add_separator, remove_separator } from "../../helpers/thousand_separator"

export const AmountInputField = ({ errors, defaultValue="", touched, reference, id, label, handleChange, handleBlur, setFieldValue, ...props }) => (
    <div className='flex flex-col w-56'>
        <label htmlFor={id} className='text-sm'>{label}</label>  
        <input 
            className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
            onChange={handleChange(reference)}
            onInput={(event) => {
                let formatted_string = add_separator(remove_separator(event.target.value))
                event.target.value = formatted_string
            }}
            defaultValue={defaultValue} {...props}/>
        <ErrorMessage name={reference}>{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
    </div>
)