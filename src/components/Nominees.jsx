import { FieldArray } from "formik";
import { InputField } from "./Form/CustomInputField";

export default function Nominee({ values, errors, touched, handleChange, handleBlur }) {
    let { nominees } = values
    return (
        <div className='mb-3'>
            <h1 className='font-semibold'>Nominee Information</h1>
                <FieldArray
                    name="nominees"
                    render={(arrayHelpers) =>( 
                        <>
                            { values.nominees && values.nominees.length > 0 && (
                                values.nominees.map(({name, id, contact, dob, percentage}, index) => (
                                    <div key={index} className='flex flex-wrap gap-5 mb-3 outline outline-1 rounded p-2'>
                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`nominees[${index}][name]`}  label="Name" placeholder="Enter Full name" defaultValue={name}/>
                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`nominees[${index}][id]`}  label="Nominee's ID" placeholder="Enter Nominee's ID" defaultValue={id}/>
                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`nominees[${index}][contact]`}  label="Contact" placeholder="address / mobile " defaultValue={contact}/>
                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`nominees[${index}][dob]`} label="Date of Birth" placeholder="dd/mm/yyyy" defaultValue={dob} type="date"/>
                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`nominees[${index}][percentage]`}  label="Percentage" placeholder="Enter percentage" defaultValue={percentage}/>
                                    </div>
                                ))
                            )}
                            <button
                                className='bg-primary text-white px-3 py-2 rounded m-2'
                                onClick={(event) => {
                                    event.preventDefault()
                                    arrayHelpers.push(
                                    { 
                                        name:'', 
                                        id:'', 
                                        contact:'', 
                                        dob:'', 
                                        percentage:''
                                    }
                                )}}
                            >
                                +
                            </button>
                            <button
                                className='bg-accent-red text-white px-3 py-2 rounded m-2'
                                onClick={(event) => {
                                    event.preventDefault()
                                    nominees.length > 1 && arrayHelpers.pop()
                                }}
                            >
                                -   
                            </button>
                        </>
                    )}
                />
        </div>
    )
}