import { Formik, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { InputField } from '../../components/Form/CustomInputField'
import { loan2ValidationSchema } from '../../helpers/validator'

function ApplicationPg2({ profile, initialValues, setInitialValues, setPageNumber }) {
    const [ employed, setEmployed ] = useState(true)

    return (
      
        <Formik
          initialValues={initialValues}
          onSubmit={async ( values ) => {
              setInitialValues(values)
              setPageNumber(3)
              console.log(values)
          }}
          validationSchema={loan2ValidationSchema}
        >
          {({values, errors, touched, handleChange, handleBlur}) => {
  return (
    <Form>
        <div className='mb-3'>
            <h1 className='font-semibold'>Employment Details</h1>

            <div className='flex flex-col w-56 m-2'>
                <label className='text-sm font-bold'>Type</label>
                <div className='flex justify-between'>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="employment" value="Owned" onChange={() => {
                            setEmployed(true)
                            handleChange("employment")
                            }} />
                        <label className='text-sm'>Employed</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="employment" value="Rented" onChange={() =>{
                            setEmployed(false)
                            handleChange("employment")
                        }
                        }  />
                        <label className='text-sm'>Self Employed</label>
                    </div>
                </div>
            </div>
            {employed
            ?
                <>
                    <p className='text-inputblue my-2'>*To be filled by employed applicants</p>

            <div className='flex flex-wrap gap-5'>
                
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer"  label="Employer" placeholder="Enter employer" />


                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer_postal_address"  label="Employer Postal Address" placeholder="Enter postal address" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer_no"  label="Telephone Number" placeholder="Enter number" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer_designation"  label="Employer designation" placeholder="Enter designation" />

                <div className='flex flex-col w-56 '>
                  <label className=' text-sm'>Retirement Date</label>
                  <input type="date" name="retirement_date" onChange={handleChange("retirement_date")} className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label className=' text-sm'>Employment Type</label>
                  <input type="text" name="employment_type" onChange={handleChange("employment_type")} id="" placeholder='Employment type' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
                </>
            :
            <>
            <p className='text-inputblue my-2'>*To be filled by self-employed applicants</p>
            <div className='flex flex-wrap gap-5'>

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="business_type"  label="Business Type*" placeholder="Enter business type" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="years_of_operation"  label="Years of Operation*" placeholder="Enter years" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="business_income"  label="Business Income(UGX)*" placeholder="Enter income" />

                <div className='flex flex-col w-56 '>
                <label className=' text-sm'>Six months bank settlement</label>
                <input type="file" name="bank_settlement" onChange={handleChange("bank_settlement")} id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>

                <div className='flex flex-col w-56 '>
                  <label className=' text-sm'>One year cash flow forecast*</label>
                  <input type="file" name="" className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </>
            }
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Assets owned</h1>
            <div className='m-2'>
            <div className='flex flex-wrap gap-5'>

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="asset1"  label="First asset*" placeholder="Enter asset 1" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="asset2"  label="Second asset*" placeholder="Enter asset 2" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="asset3"  label="Third asset" placeholder="Enter asset 3" />

            </div>
            </div>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Loan Particulars</h1>
              
            <div className='m-2'>
            <div className='flex flex-wrap gap-5 m-2'>
                <div className='flex flex-col w-56 '>
                    <label className='text-sm font-bold'>Type</label>
                    <div className='flex justify-between'>
                        <div className='flex gap-1'>
                            <input type="radio" id="" name="ownership" value="Owned" />
                            <label className='text-sm'>Normal</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type="radio" id="" name="ownership" value="Rented" />
                            <label className='text-sm'>Extended</label>
                        </div>
                    </div>
                </div>

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="loan_purpose"  label="Purpose of loan" placeholder="Enter loan purpose" />

                <div className='flex flex-col w-56 '>
                <label className=' text-sm'>Supporting files</label>
                <input type="file" name="supporting_files" className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="amount"  label="Amount in figures" placeholder="Enter loan amount" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="amount_in_words"  label="Amount in words" placeholder="Enter amount" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="months"  label="Months" placeholder="Enter months" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="repayment_method"  label="Repayment Method" placeholder="Enter method" />

            </div>
            </div>
        </div>
        <div className='flex justify-between w-full'>
            <button
                type="button"
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                onClick={() => setPageNumber(1)}
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

export default ApplicationPg2