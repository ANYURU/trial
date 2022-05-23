import { Submit } from "../../components"
import { Formik,  Form } from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from "../../auth/AuthContext"
import { toast, ToastContainer } from 'react-toastify'
import { withdrawRequestValidationSchema } from '../../helpers/validator'


function WithdrawRequest() {
  const { user:{ id: applicants_id, fullname: applicants_name } } = useAuth()
  const initialValues = {
    account_type: '',
    amount:'',
    particulars:''
  }

  
  return ( 
    <div className='h-full'>
      <ToastContainer />
      <h1 className='mb-5 mt-2 font-bold uppercase'>Withdraw Request</h1>
      <div className="flex bg-white p-6 min-h-full">
        <Formik
          initialValues={initialValues}
          validationSchema={withdrawRequestValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            console.log(values)
            const { account_type, amount, particulars } = values
            try {
              const { error } = await supabase
                .from('applications')
                .insert(
                  [
                    {
                      type: "withdraw",
                      created_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                      updated_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                      reviewed: false,
                      application_meta: {
                        applicants_id,
                        applicants_name,
                        account_type,
                        amount,
                        particulars
                      }
                    }
                  ]
                )
              
              if( error ) throw error
              toast.success(`Request submitted for review.`, {position: 'top-center'})
              resetForm({ values: initialValues })
            } catch (error) {
              toast.error(`${error?.message}`, {position: 'top-center'})
            }

          }}
        >
          {({values, errors, touched, handleChange, handleBlur, dirty, isValid}) => {
            return (
              <Form className='flex flex-grow flex-col min-h-full'>
                <div className='mb-3'>
                      <div className='m-2'>
                      <div className='flex flex-wrap gap-5'>
                          <div className='flex flex-col w-56'>
                            <label htmlFor="" className='text-sm'>Please select an account</label>
                            <select name="account_type" id="account_type" className="ring-1 ring-black rounded px-2 py-2 bg-white" value={values?.account_type} onChange={handleChange} onBlur={handleBlur}>
                              <option value="">--Select Account--</option>
                              <option value="savings">Savings</option>
                              <option value="shares">Shares</option>
                              <option value="fixed">Fixed</option>
                              <option value="mwana">Mwana</option>
                            </select>
                            {touched?.account_type && errors?.account_type && <div className='error text-red-600 text-xs'>{errors?.account_type}</div>}
                          </div>
                          <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Enter amount to withdraw</label>
                            <input type="text" name="amount" id="amount" placeholder='Enter amount' className='ring-1 ring-black rounded px-2 py-1' value={values?.amount} onChange={handleChange} onBlur={handleBlur}/>
                            {touched?.amount && errors?.amount && <div className='error text-red-600 text-xs'>{errors?.amount}</div>}
                          </div>
                      </div>
                      </div>
                  </div>
                  <div className='mb-3'>
                      <h1 className='font-semibold'>Practiculars</h1>
                      <textarea name="particulars" id="particulars" cols="30" rows="10" className='outline outline-1 p-2 rounded-md w-full' value={values?.particulars} onChange={handleChange} onBlur={handleBlur}></textarea>
                      {touched?.particulars && errors?.particulars && <div className='error text-red-600 text-xs'>{errors?.particulars}</div>}
                  </div>
                <div className="w-56">
                  <Submit value='Request' disabled={!(dirty && isValid)}/>
                </div>
              </Form>  
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default WithdrawRequest