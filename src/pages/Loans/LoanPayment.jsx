import { Submit } from "../../components"
import { Formik, Form }  from 'formik'

function LoanPayment() {
  const initialValues = {
    account: '',
    amount: '',
    phone_number: '',
    receipt: '',
    particulars: ''
  }
  return (
    
      <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
          console.log(values)
        }}
      >
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <Form>
            <div className='h-full'>
            <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Loan Payment</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      <div className='flex flex-grow flex-col min-h-full'>
        <div className='mb-3'>
            <div className='m-2'>
              <div className='flex flex-wrap gap-5'>
                  <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Please select an account</label>
                    <select name="account" id="" className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600"
                      onChange={handleChange("account")} required
                    >
                      <option value="">--Select Account--</option>
                      <option value="savings">Savings</option>
                      <option value="shares">Shares</option>
                      <option value="fixed">Fixed</option>
                      <option value="mwana">Mwana</option>
                    </select>
                  </div>
                  <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Enter Amount</label>
                    <input type="text" name="amount" id="" placeholder='Enter Amount' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
                    onChange={handleChange("amount")} required
                    />
                  </div>
              </div>
            </div>
        </div>
        <div className='mb-3'>
            <div className='m-2'>
              <div className='flex flex-wrap gap-5'>
                  <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Enter Phone Number</label>
                    <input type="text" name="phone_number" id="" placeholder='Enter phone number' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
                      onChange={handleChange("phone_number")} required
                    />
                  </div>
                  <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Upload Receipt</label>
                    <input type="file" name="receipt" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600'
                      onChange={handleChange("receipt")} required 
                    />
                  </div>
              </div>
            </div>
        </div>
          <div className='mb-3'>
              <h1 className='font-semibold'>Particulars</h1>
              <textarea name="particulars" id="" cols="30" rows="10" className='outline outline-1 p-2 rounded-md w-full dark:bg-dark-bg-700'
                onChange={handleChange("particulars")} required
              ></textarea>
          </div>
        <div className="w-56">
          <input
            type="submit"
            value="Make Payment"
            className='bg-primary inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2 w-full mt-1'
          />
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