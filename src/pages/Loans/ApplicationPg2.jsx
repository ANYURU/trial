import { Formik, Form }  from 'formik'
import { useState, useEffect } from 'react'
import { InputField } from '../../components/Form/CustomInputField'
import { loan2ValidationSchema, loan3ValidationSchema } from '../../helpers/validator'
import { remove_separator, add_separator } from '../../helpers/thousand_separator'
import { AmountInputField } from '../../components/Form/AmountInputField'
import { supabase } from '../../helpers/supabase'

function ApplicationPg2({ initialValues, setInitialValues, setPageNumber }) {
    const [ employed, setEmployed ] = useState(true)
    const [ arrearedLoans, setArrearedLoans ] = useState([])

    useEffect(() => {
        // Get member's arreared loans.
        getLoans()
            .then(data => setArrearedLoans(data))
            .catch(error => console.log(error))
    })

    const getLoans = async () => {
        const { data: {current_loans}, error } = await supabase.rpc("fetch_loans")
        if ( error ) {
            throw error
        } else {
    
            let data = []
            if ( current_loans ) data.push(...current_loans.filter(loan => loan?.loan?.loan_status === 'defaulted').sort((a,b) => new Date(b?.created_at) - new Date(a?.created_at)))
            return data
        } 
    }

    return (
      
        <Formik
          initialValues={initialValues}
          onSubmit={async ( values ) => {
              setInitialValues(values)
              setPageNumber(3)
              console.log(values)
          }}
          validationSchema={employed === true ? loan2ValidationSchema : loan3ValidationSchema}
        >
          {({values, errors, touched, handleChange, handleBlur, setFieldValue}) => {
  return (
    <Form>
        <div className='mb-3'>
            <h1 className='font-semibold'>Employment Details</h1>

            <div className='flex flex-col w-56 m-2'>
                <label className='text-sm font-bold'>Type</label>
                <div className='flex justify-between'>
                    <div className='flex gap-1'>
                        <input type="radio" id='employed' name="employment" value="employed"  onChange={() => {
                            setEmployed(true)
                            handleChange("employment")
                            }} />
                        <label className='text-sm' htmlFor='employed'>Employed</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id='business' name="employment" value="business" defaultChecked={initialValues.business_type} onChange={() =>{
                            setEmployed(false)
                            handleChange("employment")
                        }
                        }  />
                        <label className='text-sm' htmlFor='business'>Self Employed</label>
                    </div>
                </div>
            </div>
            {employed
            &&
                <>
                    <p className='text-inputblue my-2'>*To be filled by employed applicants</p>

            <div className='flex flex-wrap gap-5'>
                
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer"  label="Employer" placeholder="Enter employer" defaultValue={initialValues.employer} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer_postal_address"  label="Employer Postal Address" placeholder="Enter postal address" defaultValue={initialValues.employer_postal_address} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer_no"  label="Telephone Number" placeholder="Enter number" defaultValue={initialValues.employer_no} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employer_designation"  label="Employer designation" placeholder="Enter designation" defaultValue={initialValues.employer_designation} />

                <div className='flex flex-col w-56 '>
                  <label className=' text-sm'>Retirement Date</label>
                  <input type="date" name="retirement_date" onChange={handleChange("retirement_date")} className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' defaultValue={initialValues.retirement_date} />
                </div>
                <div className='flex flex-col w-56 '>

                  <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="employment_type"  label="Employment Type" placeholder="Enter employment type" defaultValue={initialValues.employment_type} />

                </div>
            </div>
                </>
          }
            { !employed && <>
            <p className='text-inputblue my-2'>*To be filled by self-employed applicants</p>
            <div className='flex flex-wrap gap-5'>

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="business_type" defaultValue={initialValues.business_type}  label="Business Type*" placeholder="Enter business type" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="years_of_operation" defaultValue={initialValues.years_of_operation}  label="Years of Operation*" placeholder="Enter years" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="business_income" defaultValue={initialValues.business_income}  label="Business Income(UGX)*" placeholder="Enter income" />

                <div className='flex flex-col w-56 '>
                <label className=' text-sm'>Six months bank settlement</label>
                <input type="file" name="bank_settlement" onChange={event => {
                    setFieldValue(event.target.name, event.target.files[0])
                }} id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>

                <div className='flex flex-col w-56 '>
                  <label className=' text-sm'>One year cash flow forecast*</label>
                  <input type="file" name="a_years_cashflow" className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
                    onChange={event => {
                        setFieldValue(event.target.name, event.target.files[0])
                    }}
                  />
                </div>
            </div>
            </>
            }
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Assets owned</h1>
            <div className='m-2'>
            <div className='flex flex-wrap gap-5'>

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="asset1"  label="First asset*" placeholder="Enter asset 1" defaultValue={initialValues.asset1} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="asset2"  label="Second asset*" placeholder="Enter asset 2" defaultValue={initialValues.asset2} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="asset3"  label="Third asset" placeholder="Enter asset 3" defaultValue={initialValues.asset3} />

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
                            <input type="radio" id="normal" name="loan_type" value="normal"  onChange={handleChange("loan_type")} />
                            <label className='text-sm' htmlFor='normal'>Normal</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type="radio" id="extended" name="loan_type" value="extended" onChange={handleChange("loan_type")} />
                            <label className='text-sm' htmlFor='extended'>Extended</label>
                        </div>
                    </div>
                </div>
                {
                    values.loan_type === 'extended' && 
                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Existing Loan</label>
                        <select name="existing_loan" id="" onChange={(event) => {
                             console.log(event.target.value)
                            }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" required>
                            <option value="">-- Select Loan--</option>
                            {
                                arrearedLoans?.length > 0 && arrearedLoans.map((existingLoan, index) => <option key={index} value={existingLoan.loan.id}>{existingLoan.loan.loan_id}</option>)
                            }
                        </select>
                    </div>
                }

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="loan_purpose"  label="Purpose of loan" placeholder="Enter loan purpose" defaultValue={initialValues.loan_purpose} />

                <div className='flex flex-col w-56 '>
                <label className=' text-sm'>Supporting files</label>
                <input type="file" name="supporting_files" className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600'
                    onChange={event => {
                        setFieldValue(event.target.name, event.target.files[0])
                    }}
                />
                </div>

                <AmountInputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="amount"  label="Amount in figures" placeholder="Enter loan amount" defaultValue={initialValues.amount} setFieldValue={setFieldValue} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="amount_in_words"  label="Amount in words" placeholder="Enter amount" defaultValue={initialValues.amount_in_words} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="months"  label="Months" placeholder="Enter months" defaultValue={initialValues.months} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="repayment_method"  label="Repayment Method" placeholder="Enter method" defaultValue={initialValues.repayment_method} />

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