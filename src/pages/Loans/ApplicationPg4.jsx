import { Formik, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"
import { useState } from 'react'

export default function ApplicationPg4({ profile, initialValues, setInitialValues, setPageNumber }) {

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
            setInitialValues(values)
            setPageNumber(5)
        }}
      >
        {({values, errors, touched, handleChange, handleBlur}) => {
  return (
    <Form>
        <div className='mb-3'>
            <h1 className='font-semibold'>Guarantor's Details</h1>
            <div className='flex flex-wrap gap-5 mb-5'>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Guarantor</label>
                    <select name="" id="" className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 bg-white">
                        <option value="">--Guarantor--</option>
                        <option value="savings">Single</option>
                        <option value="shares">Married</option>
                        <option value="shares">Widowed</option>
                        <option value="shares">Divorced</option>
                    </select>
                </div>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className=' text-sm'>Financial Statement</label>
                    <input type="file" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            <div className='flex flex-wrap gap-5 mb-5'>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Guarantor</label>
                    <select name="" id="" className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 bg-white">
                        <option value="">--Guarantor--</option>
                        <option value="savings">Single</option>
                        <option value="shares">Married</option>
                        <option value="shares">Widowed</option>
                        <option value="shares">Divorced</option>
                    </select>
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Financial Statement</label>
                    <input type="file" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            <div className='flex flex-wrap gap-5 mb-5'>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Guarantor</label>
                    <select name="" id="" className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 bg-white">
                        <option value="">--Guarantor--</option>
                        <option value="savings">Single</option>
                        <option value="shares">Married</option>
                        <option value="shares">Widowed</option>
                        <option value="shares">Divorced</option>
                    </select>
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Financial Statement</label>
                    <input type="file" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            <div className='flex flex-wrap gap-5 mb-5'>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Guarantor</label>
                    <select name="" id="" className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 bg-white">
                        <option value="">--Guarantor--</option>
                        <option value="savings">Single</option>
                        <option value="shares">Married</option>
                        <option value="shares">Widowed</option>
                        <option value="shares">Divorced</option>
                    </select>
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Financial Statement</label>
                    <input type="file" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            <div className='flex flex-wrap gap-5 mb-5'>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Guarantor</label>
                    <select name="" id="" className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 bg-white">
                        <option value="">--Guarantor--</option>
                        <option value="savings">Single</option>
                        <option value="shares">Married</option>
                        <option value="shares">Widowed</option>
                        <option value="shares">Divorced</option>
                    </select>
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Financial Statement</label>
                    <input type="file" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            <div className='flex flex-wrap gap-5 mb-5'>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Guarantor</label>
                    <select name="" id="" className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 bg-white">
                        <option value="">--Guarantor--</option>
                        <option value="savings">Single</option>
                        <option value="shares">Married</option>
                        <option value="shares">Widowed</option>
                        <option value="shares">Divorced</option>
                    </select>
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Financial Statement</label>
                    <input type="file" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
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