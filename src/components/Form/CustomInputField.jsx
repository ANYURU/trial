export const InputField = ({ errors, defaultValue="", type="text", touched, reference, id, label, handleChange, handleBlur, ...props }) => (
    <div className='flex flex-col w-56'>
        <label htmlFor={id} className='text-sm'>{label}</label>  
        <input type={type} className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' id={id} onChange={handleChange(reference)} defaultValue={defaultValue} onBlur={handleBlur(reference)} placeholder={reference} {...props}/>
        {touched[reference] && errors[reference] && <div className="error text-xs text-red-500">{errors[reference]}</div>}
    </div>
)
