import { Submit } from "../../components"
import { Formik, Form }  from 'formik'
import { uploadFile } from "../../helpers/uploadFile"
import { toast, ToastContainer } from "react-toastify"
import { supabase } from "../../helpers/supabase"
import { useOutletContext, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { evidencedRequestValidationSchema as loanPaymentRequestValidationSchema} from '../../helpers/validator'

function LoanPayment() {
  // Will be used later
  const { id: loan_id } = useParams()
  console.log(loan_id)
  const { user: { id: applicants_id }} = useAuth()
  const [{ fullname: applicants_name }] = useOutletContext()

  const initialValues = {
    account_type: '',
    amount: '',
    phone_number: '',
    evidence: '',
    particulars: ''
  }

  return (
      <Formik
        initialValues={initialValues}
        validationSchema={loanPaymentRequestValidationSchema}
        onSubmit={ async ( values, { resetForm } ) => {
          const { account_type, amount, phone_number, particulars, evidence } =  values
          
          try {
            const { Key: url} = await uploadFile(evidence, 'loans') 
            console.log(url) 
            const {error, data } = await supabase
              .from('applications')
              .insert([
                {
                  _type: "payment",
                  created_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                  updated_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                  reviewed: false,
                  application_meta: {
                    applicants_id,
                    applicants_name,
                    account_type,
                    loan_id,            
                    amount,
                    phone_number,
                    files: [
                      {
                        file_url: url
                      }
                    ], 
                    particulars
                  }
                }
  
              ])

              if( error ) throw error

              console.log(data)
              resetForm({ values: initialValues})
              toast.success(`Request submitted for review.`, {position:'top-center'})
          } catch ( error ) {
            console.log(error)
          }
          
          
        }}
      >
        {({values, errors, touched, handleChange, handleBlur, isValid, dirty}) => {
          return (
            <Form>
              <div className='h-full'>
                <ToastContainer />
                <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Loan Payment</h1>
                <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
                  <div className='flex flex-grow flex-col min-h-full'>
                    <div className='mb-3'>
                        <div className='m-2'>
                          <div className='flex flex-wrap gap-5 h-16'>
                              <div className='flex flex-col w-56'>
                                <label htmlFor="" className='text-sm'>Please select an account</label>
                                <select name="account_type" id="account" className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600" onChange={handleChange} onBlur={handleBlur}
                                >
                                  {
                                    /* 
                                      I was thinking that loans payments are either made to the bank account or the sacco accounts. Therefore I suggest we revise the account options to either bank or sacco. 
                                      And, we should create a loans account for every user so that they are able to track their loans from their respective accounts.
                                    */
                                  }
                                  <option value="">--Select Account--</option>
                                  <option value="savings">Bank</option>
                                  <option value="shares">Sacco</option>
                                  {/* <option value="fixed">Fixed</option>
                                  <option value="mwana">Mwana</option> */}
                                </select>
                                {touched?.account_type && errors?.account_type && <div className="error text-red-600 text-xs">{errors?.account_type}</div>}
                              </div>
                              <div className='flex flex-col w-56 '>
                                <label htmlFor="" className=' text-sm'>Enter Amount</label>
                                <input type="text" name="amount" id="amount" placeholder='Enter Amount' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values.amount}/>
                                {touched?.amount && errors?.amount && <div className="error text-red-600 text-xs">{errors?.amount}</div>}
                              </div>
                          </div>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <div action="" className='m-2'>
                          <div className='flex flex-wrap gap-5 h-20'>
                              <div className='flex flex-col w-56'>
                                <label htmlFor="" className='text-sm'>Enter Phone Number</label>
                                <input type="text" name="phone_number" id="phone_number" placeholder='Enter phone number' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
                                  onChange={handleChange} onBlur={handleBlur} value={values?.phone_number}
                                />
                                {touched?.phone_number && errors?.phone_number && <div className ="error"></div>}
                              </div>
                              <div className='flex flex-col w-56 '>
                                <label htmlFor="" className=' text-sm'>Upload Receipt</label>
                                <input type="file" name="evidence" id="evidence" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600'
                                  onChange={(event) => {
                                    values.evidence = event.currentTarget.files[0]
                                  }} onBlur={handleBlur}
                                  />
                                  {touched?.evidence && errors?.evidence && <div className="error text-red-600 text-xs">{errors?.evidence}</div>}
                              </div>
                          </div>
                        </div>
                    </div>
                      <div className='mb-3'>
                          <h1 className='font-semibold'>Particulars</h1>
                          <textarea name="particulars" id="particulars" cols="30" rows="10" className='outline outline-1 p-2 rounded-md w-full dark:bg-dark-bg-700' onChange={handleChange("particulars")} value={values?.particulars}
                          ></textarea>
                      </div>
                    <div className="w-56">
                      <Submit value='Request' disabled={!(isValid && dirty)}/>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    
  )
}

export default LoanPayment