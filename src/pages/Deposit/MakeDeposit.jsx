import { Submit } from "../../components"
import { Formik,  Form } from 'formik'
import { uploadFile } from '../../helpers/uploadFile'
import { supabase } from '../../helpers/supabase'
import { useAuth } from "../../auth/AuthContext"
import { toast, ToastContainer } from 'react-toastify'
import { depositRequestValidationSchema } from '../../helpers/validator'

function MakeDeposit() {
  const { user: { id: applicants_id, fullname:applicants_name } } = useAuth()

  const initialValues = {
    account_type: '',
    amount: '',
    phone_number: '',
    particulars: '',
    evidence: ''
  }
   
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Deposit</h1>
      <div className="flex bg-white p-6 min-h-full">
      <Formik
        initialValues={initialValues}
        onSubmit={async ( values, { resetForm } ) => {
          const { account_type, amount, phone_number, particulars, evidence } = values
          console.log(evidence)
          try {
            const { Key: url } = await uploadFile(evidence, 'deposits')
            const { error, data } = await supabase
              .from('applications')
              .insert([
                { 
                  _type: "deposit",
                  created_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                  updated_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                  reviewed: false,
                  application_meta: {
                    applicants_id,
                    applicants_name,
                    account_type,
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
              ]
            )

            if( error ) throw error
            
            console.log(data)
            resetForm({ values: initialValues })
            toast.success(`Request submitted for review.`, { position: 'top-center' })
            
          } catch ( error ) {
            toast.error(`${error?.message}`, {position:'top-center'})
          }
        }}

        validationSchema={ depositRequestValidationSchema }
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, dirty}) => {
          return (
            <Form>
              <div className='flex flex-grow flex-col min-h-full'>
                <ToastContainer />
                <div className='mb-3'>
                    <div className='m-2'>
                      <div className='flex flex-wrap gap-5 h-16'>
                          <div className='flex flex-col w-56'>
                            <label htmlFor="" className='text-sm'>Please select an account</label>
                            <select name="account_type" id="account_type" className="ring-1 ring-black rounded px-2 py-2 bg-white" onChange={handleChange} onBlur={handleBlur} value={values.account_type}>
                              <option value="">--Select Account--</option>
                              <option value="savings">Savings</option>
                              <option value="shares">Shares</option>
                              <option value="fixed">Fixed</option>
                              <option value="mwana">Mwana</option>
                            </select>
                            {touched?.account_type && errors?.account_type && <div className="error text-red-600 text-xs">{errors?.account_type}</div>}
                          </div>
                          <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Enter Amount</label>
                            <input type="number" name="amount" id="amount" placeholder='Enter amount' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values.amount}/>
                            {touched?.amount && errors?.amount && <div className="error text-red-600 text-xs">{errors?.amount}</div>}
                          </div>
                      </div>
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='m-2'>
                      <div className='flex flex-wrap gap-5 h-20'>
                          <div className='flex flex-col w-56'>
                            <label htmlFor="" className='text-sm'>Enter Phone Number</label>
                            <input type="text" name="phone_number" id="phone_number" placeholder='Enter phone number' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values.phone_number}/>
                            {touched?.phone_number && errors?.phone_number && <div className="error text-red-600 text-xs">{errors?.phone_number}</div>}
                          </div>
                          <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Upload Receipt</label>
                            <input type="file" name="evidence" id="evidence" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' onChange={(event) => {
                              values.evidence = event.currentTarget.files[0]
                            }} onBlur={handleBlur}/>
                            {touched?.evidence && errors?.evidence && <div className="error text-red-600 text-xs">{errors?.evidence}</div>} 
                          </div>
                      </div>
                    </div>
                </div>
                  <div className='mb-3'>
                      <h1 className='font-semibold'>Particulars</h1>
                      <textarea name="particulars" id="particulars" cols="30" rows="10" className='outline outline-1 rounded-md w-full p-2' onChange={handleChange} onBlur={handleBlur} value={values.particulars}></textarea>
                  </div>
                <div className="w-56">
                  <Submit value='Request' disabled={!(isValid && dirty)}/>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
      </div>
    </div>
  )
}

export default MakeDeposit