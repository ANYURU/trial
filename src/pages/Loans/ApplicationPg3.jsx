import { Formik, Field, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { InputField } from '../../components/Form/CustomInputField'

export default function ApplicationPg3({ profile, initialValues, setInitialValues, setPageNumber }) {

    const [ salary, setSalary ] = useState('false')
    const [ shares, setShares ] = useState('false')
    const [ guarantors, setGuarantors ] = useState('false')

    return (
    <Formik
    initialValues={initialValues}
    onSubmit={async ( values ) => {
        setInitialValues(values)
        setPageNumber(4)
        console.log(values)
    }}
  >
    {({values, errors, touched, handleChange, handleBlur}) => {
  return (
    <Form>
        <div className='mb-3'>
            <h1 className='font-semibold'>Loan in other banks or financial institutions</h1>
            <div className='m-2 flex gap-2'>
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold'>01</h1>
                </div>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                        <label className='text-sm'>Name</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Amount Advanced</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Date Granted</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Repayment Period</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label className=' text-sm'>Balance</label>
                    <input type="text" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                </div>
            </div>
            <hr />
            <div className='m-2 flex gap-2'>
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold'>02</h1>
                </div>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                        <label className='text-sm'>Name</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Amount Advanced</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Date Granted</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Repayment Period</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label className=' text-sm'>Balance</label>
                    <input type="text" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div className='mb-3'>
            <h1 className='font-semibold'>Additional Files</h1>
            <div className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                  <input type="file" name="additional_files" className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </div>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Security Details</h1>
            <p>I offer the following Security</p>

            {/* <div id="checkbox-group">Checked</div> */}
            <div role="group" aria-labelledby="checkbox-group">
                <label>
                <Field type="checkbox" name="securities" value="salary" />
                Salary
                </label>
                <label>
                <Field type="checkbox" name="securities" value="shares" />
                Share
                </label>
                <label>
                <Field type="checkbox" name="securities" value="guarantors" />
                Guarantors
                </label>
            </div>
            
        </div>
        <div className='mb-3'>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="other_security"  label="Others Specify" placeholder="Enter other" />
        </div>

        <div className='flex justify-between w-full'>
            <button
                type="button"
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                onClick={() => setPageNumber(2)}
            >Back</button>
            <input
                type="submit"
                value='Next'
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
            />
        </div>
    </Form>
    )}}
    </Formik>
  )
}