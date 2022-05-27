import { Formik, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"
import { useState } from 'react'

function ApplicationPg2({ profile, initialValues, setInitialValues, setPageNumber }) {
    const [ employed, setEmployed ] = useState(true)

    return (
      
        <Formik
          initialValues={initialValues}
          onSubmit={async ( values ) => {
              setInitialValues(values)
              setPageNumber(1)
          //   console.log(values)
          }}
        >
          {({values, errors, touched, handleChange, handleBlur}) => {
  return (
    <Form>
        <div className='mb-3'>
            <h1 className='font-semibold'>Employment Details</h1>

            <div className='flex flex-col w-56 m-2'>
                <label htmlFor="" className='text-sm font-bold'>Type</label>
                <div className='flex justify-between'>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="employment" value="Owned" onChange={() => {
                            setEmployed(true)
                            handleChange("employment")
                            }} />
                        <label htmlFor="" className='text-sm'>Employed</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="employment" value="Rented" onChange={() =>{
                            setEmployed(false)
                            handleChange("employment")
                        }
                        }  />
                        <label htmlFor="" className='text-sm'>Self Employed</label>
                    </div>
                </div>
            </div>
            {employed
            ?
                <>
                    <p className='text-inputblue my-2'>*To be filled by employed applicants</p>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Employer*</label>
                <input type="text" name="employer" onChange={handleChange("employer")} id="" placeholder='Enter employer' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Postal Address</label>
                <input type="text" name="employer_postal_address" onChange={handleChange("employer_postal_address")} id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Telephone Number</label>
                <input type="text" name="employer_no" onChange={handleChange("employer_no")} id="" placeholder='Enter number' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Designation</label>
                <input type="text" name="employer_designation" onChange={handleChange("employer_designation")} id="" placeholder='Enter designation' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>Retirement Date</label>
                  <input type="text" name="retirement_date" onChange={handleChange("retirement_date")} id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>Employment Type</label>
                  <input type="text" name="employment_type" onChange={handleChange("employment_type")} id="" placeholder='Employment type' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
                </>
            :
            <>
            <p className='text-inputblue my-2'>*To be filled by self-employed applicants</p>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Business Type*</label>
                <input type="text" name="business_type" onChange={handleChange("business_type")} id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Years of operation</label>
                <input type="text" name="years_of_operation" onChange={handleChange("years_of_operation")} id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Business Income(UGX)</label>
                <input type="text" name="business_income" onChange={handleChange("business_income")} id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Six months bank settlement</label>
                <input type="file" name="bank_settlement" onChange={handleChange("bank_settlement")} id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>One year cash flow forecast*</label>
                  <input type="file" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </>
            }
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Assets owned</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                  <label htmlFor="" className='text-sm'>First asset*</label>
                  <input type="text" name="asset1" onChange={handleChange("asset1")} id="" placeholder='Enter asset' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className='text-sm'>Second asset*</label>
                  <input type="text" name="asset2" onChange={handleChange("asset2")} id="" placeholder='Enter asset' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className='text-sm'>Third asset*</label>
                  <input type="text" name="asset3" onChange={handleChange("asset3")} id="" placeholder='Enter asset' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Loan Particulars</h1>
              
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5 m-2'>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className='text-sm font-bold'>Type</label>
                    <div className='flex justify-between'>
                        <div className='flex gap-1'>
                            <input type="radio" id="" name="ownership" value="Owned" />
                            <label htmlFor="" className='text-sm'>Normal</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type="radio" id="" name="ownership" value="Rented" />
                            <label htmlFor="" className='text-sm'>Extended</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Purpose of loan</label>
                <input type="text" name="" id="" placeholder='Enter loan purpose' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Supporting files</label>
                <input type="file" name="" id="" className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Amount in figures</label>
                    <input type="text" name="" id="" placeholder='Enter amount in figures' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Amount in words</label>
                    <input type="text" name="" id="" placeholder='Enter amount in words' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Months</label>
                    <input type="text" name="" id="" placeholder='Enter months' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Repayment Method</label>
                    <input type="text" name="" id="" placeholder='Enter repayment method' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </form>
        </div>
        <div className='flex justify-between w-full'>
            <input
                type="submit"
                value='Back'
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
            />
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

export default ApplicationPg2