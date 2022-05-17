import { Submit } from "../../components"
import { toast, ToastContainer } from 'react-toastify'
import { Formik, Form }  from 'formik'

function WithdrawRequest() {
  const initialValues = {
    account: '',
    amount: '', 
    particulars: ''
  }
  return (
    <div className='h-full'>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
          console.log(values)
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => {
          return (
            <>
              <h1 className='mb-5 mt-2 font-bold uppercase'>Withdraw Request</h1>
        <div className="flex bg-white p-6 min-h-full">
        <div className='flex flex-grow flex-col min-h-full'>
          <div className='mb-3'>
                <Form className='m-2'>
                <div className='flex flex-wrap gap-5 mb-3'>
                    <div className='flex flex-col w-56'>
                      <label htmlFor="" className='text-sm'>Please select an account</label>
                      <select name="account" id="" onChange={handleChange("account")} className="ring-1 ring-black rounded px-2 py-2 bg-white">
                        <option value="">--Select Account--</option>
                        <option value="savings">Savings</option>
                        <option value="shares">Shares</option>
                        <option value="fixed">Fixed</option>
                        <option value="mwana">Mwana</option>
                      </select>
                    </div>
                    <div className='flex flex-col w-56 '>
                      <label htmlFor="" className=' text-sm'>Enter amount to withdraw</label>
                      <input type="text" name="amount" onChange={handleChange("amount")} id="" placeholder='Enter amount' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                </div>
                
            <div className='mb-3'>
                <h1 className='font-semibold'>Particulars</h1>
                <textarea name="particulars" onChange={handleChange("particulars")} id="" cols="30" rows="10" className='outline outline-1 p-2 rounded-md w-full'></textarea>
            </div>
          <div className="w-56">
            <Submit value='Request' />
          </div>
          </Form>
            </div>
        </div>
        </div>
            </>
          )
        }}
        
      </Formik>
    </div>
  )
}

export default WithdrawRequest