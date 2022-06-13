import { Formik, Form, FieldArray }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { InputField } from '../../components/Form/CustomInputField'

export default function ApplicationPg4({ initialValues, setInitialValues, setPageNumber }) {

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
            setInitialValues(values)
            setPageNumber(5)
        }}
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
                        <div className='flex flex-wrap gap-5 mb-5 outline p-2 outline-1 rounded-md outline-gray-300'>

                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`guarantors[${index}].name`} label="Name" placeholder="Enter name" />

                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`guarantors[${index}].contact`} label="Contact" placeholder="Enter number" />

                            <div className='flex flex-col w-56'>
                                <label className=' text-sm'>Financial Statement</label>
                                <input type="file" name={`guarantors[${index}].financial_statement`} placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
                                    onChange={event => {
                                        setFieldValue(event.target.name, event.target.files[0])
                                    }}
                                    // value={initialValues.guarantors[index].financial_statement}
                                />
                            </div>
                        </div>
                            ))}
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
         </>
                    )}        
                ></FieldArray>
        </div>
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