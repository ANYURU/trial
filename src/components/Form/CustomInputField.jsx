export const InputField = ({ errors, touched, reference, id, label, handleChange, handleBlur, ...props }) => (
    <div className='flex flex-col w-56'>
        <label htmlFor={id} className='text-sm'>{label}</label>  
        <input type="text" className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange(reference)} onBlur={handleBlur(reference)} {...props}/>
        {touched[reference] && errors[reference] && <div className="error">{errors[reference]}</div>}
    </div>
)
