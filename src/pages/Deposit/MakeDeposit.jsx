import { Submit } from "../../components"
import { Formik,  Form } from 'formik'
import { useState } from 'react'
import { uploadFile } from '../../helpers/uploadFile'
import { supabase } from '../../helpers/supabase'
import { useAuth } from "../../auth/AuthContext"
import { toast, ToastContainer } from 'react-toastify'

function MakeDeposit() {
  const [ evidence, setEvidence ] = useState({})
  const { user:{ id } } = useAuth()
   
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase'>Deposit</h1>
      <div className="flex bg-white p-6 min-h-full">
      <Formik
        initialValues={{
          account_type: '',
          amount: '',
          phone_number: '',
          details: ''
        }}
        onSubmit={async ( values ) => {
          const { account_type, amount, phone_number, details } = values
          console.log(account_type)
          try {
            const { Key: url } = await uploadFile(evidence, 'deposits')
            const { error, data } = await supabase
              .from('applications')
              .insert([
                { 
                  applicants_id: id,
                  type: "deposit",
                  created_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                  updated_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                  reviewed: false,
                  application_meta: {
                    account_type,
                    amount,
                    phone_number,
                    files: [
                      {
                        file_url: url
                      }
                    ],
                    details
                  }
                }
              ]
            )

            if( error ) {
              console.log(error)
              throw error
              
            } else {
              console.log(data)
              toast(`Your request has been submitted. And is awaiting verification.`, {position: 'top-center'})
            }
          } catch ( error ) {
            toast(`${error?.message}`, {position:'top-center'})
            // give an informative message indicating the error
          }

        }}
        // validationSchema={{}}
      >
        {({ values, errors, touched, handleChange, handleBlur}) => {
          return (
            <Form>
              <div className='flex flex-grow flex-col min-h-full'>
                <ToastContainer />
                <div className='mb-3'>
                    <div action="" className='m-2'>
                      <div className='flex flex-wrap gap-5'>
                          <div className='flex flex-col w-56'>
                            <label htmlFor="" className='text-sm'>Please select an account</label>
                            <select name="account_type" id="account_type" className="ring-1 ring-black rounded px-2 py-2 bg-white" onChange={handleChange} onBlur={handleBlur} value={values.account_type}>
                              <option value="">--Select Account--</option>
                              <option value="savings">Savings</option>
                              <option value="shares">Shares</option>
                              <option value="fixed">Fixed</option>
                              <option value="mwana">Mwana</option>
                            </select>
                          </div>
                          <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Enter Amount</label>
                            <input type="text" name="amount" id="amount" placeholder='Enter amount' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values.amount}/>
                          </div>
                      </div>
                    </div>
                </div>
                <div className='mb-3'>
                    <div action="" className='m-2'>
                      <div className='flex flex-wrap gap-5'>
                          <div className='flex flex-col w-56'>
                            <label htmlFor="" className='text-sm'>Enter Phone Number</label>
                            <input type="text" name="phone_number" id="phone_number" placeholder='Enter phone number' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values.phone_number}/>
                          </div>
                          <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Upload Receipt</label>
                            <input type="file" name="evidence" id="evidence" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1'  
                              onChange={(event) => {   
                                setEvidence(event.currentTarget.files[0])
                              }}
                            />
                          </div>
                      </div>
                    </div>
                </div>
                  <div className='mb-3'>
                      <h1 className='font-semibold'>Practiculars</h1>
                      <textarea name="details" id="details" cols="30" rows="10" className='outline outline-1 rounded-md w-full p-2' onChange={handleChange} onBlur={handleBlur} value={values.details}></textarea>
                  </div>
                <div className="w-56">
                  <Submit value='Request' />
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