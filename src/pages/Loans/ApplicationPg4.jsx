import { Formik, Form, FieldArray, ErrorMessage }  from 'formik'
import { InputField } from '../../components/Form/CustomInputField'
import { loan5ValidationSchema } from '../../helpers/validator'
import { useEffect, useState } from 'react'
import { supabase } from '../../helpers/supabase'

export default function ApplicationPg4({ initialValues, setInitialValues, setPageNumber }) {
    const [ profiles, setProfiles ] = useState([])

    useEffect(() => {
        getProfiles()
            .then(data => {
                setProfiles(data)
            })
            .catch(error => console.log(error))

    })

    const getProfiles = async() => {
        const {data, error } = await supabase.rpc('get_member_profiles') 
    
        if(error) throw error
        return data
    }
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
            setInitialValues(values)
            setPageNumber(5)
        }}
        validationSchema={loan5ValidationSchema}
      >
        {({values, errors, touched, handleChange, handleBlur, setFieldValue}) => {
            return (
                <Form>
                    <div className='mb-3'>
                        <h1 className='font-semibold'>Guarantor's Details</h1>
                        <FieldArray name='guarantors'
                            render={(fieldArrayProp) => (
                                <>
                                    {values.guarantors.map((guarantor, index) => (
                                        <div className='flex flex-wrap gap-5 mb-2 outline p-2 outline-1 rounded-md outline-gray-300'>
                                            {/* <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`guarantors[${index}].name`} label="Name" placeholder="Enter name" /> */}
                                            <div className="flex flex-col w-56">
                                                <label className="text-sm">
                                                    Select Member
                                                </label>
                                                <select
                                                    name={`guarantors[${index}][name]`}
                                                    className="ring-1 ring-black rounded px-2 py-1 bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                                                    onChange={(event) => {
                                                        values.guarantors[index]["name"] = event.target.value
                                                        
                                                    }}
                                                    onBlur={handleBlur(`guarantors[${index}]["name"]`)}
                                                >
                                                    <option value="">--Select Member--</option>
                                                {
                                                    profiles && profiles.map(({ fullname }, index) => {
                                                    return  <option key={index} value={ fullname } className="capitalize">{ fullname }</option>
                                                    })
                                                }
                                                </select>
                                                <ErrorMessage name={`guarantors.[${index}].name`}>{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                            </div>
                                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`guarantors[${index}].contact`} label="Contact" placeholder="Enter number" />
                                        </div>
                                    ))}
                                    {
                                        // errors?.guarantors && errors.gurantors.length === 1 && <div className="error text-xs text-red-500">{errors.guarantors}</div>
                                        errors.guarantors && typeof(errors.guarantors) === "string" && <div className="error text-xs text-red-500">{errors.guarantors}</div>
                                    }
                                    <button
                                        type="button"
                                        className='bg-primary text-white px-3 py-2 rounded m-2'
                                        onClick={() => values.guarantors.length < 6 ? fieldArrayProp.push({ name: '', contact: '', financial_statement: '' }) : null}
                                    >+</button>
                                    <button
                                        type="button"
                                        className='bg-accent-red text-white px-3 py-2 rounded m-2'
                                        onClick={() => values.guarantors.length > 1 ? fieldArrayProp.pop() : null}
                                    >-</button>
                                    <button
                                        onClick={(event ) => {
                                            event.preventDefault()
                                            console.log("Errors: ", errors)
                                            console.log("Values: ", values)
                                        }}
                                    >
                                        tryme
                                    </button>
                                </>
                            )}        
                        ></FieldArray>
                    </div>
                    {/* {
                        errors?.guarantors && <div>{errors.guarantors}</div>
                    } */}
                    <div className='flex justify-between w-full'>
                        <button
                            type="button"
                            className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                            onClick={() => setPageNumber(3)}
                        >Back</button>
                        <input
                            type="submit"
                            value='Next'
                            className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                        />
                    </div>
                </Form>
            )
        }}
        </Formik>
        
)
}