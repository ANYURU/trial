import { useState } from 'react'

function ApplicationPg2() {
    const [ employed, setEmployed ] = useState(true)
  return (
    <>
        <div className='mb-3'>
            <h1 className='font-semibold'>Employment Details</h1>
            <form action="" className='m-2'>
            <div className='flex flex-col w-56 '>
                <label htmlFor="" className='text-sm font-bold'>Type</label>
                <div className='flex justify-between'>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="ownership" value="Owned" onChange={() => setEmployed(true)} />
                        <label htmlFor="" className='text-sm'>Employed</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="ownership" value="Rented" onChange={() => setEmployed(false)} />
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
                <input type="text" name="" id="" placeholder='Enter employer' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Postal Address</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Telephone Number</label>
                <input type="text" name="" id="" placeholder='Enter number' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Designation</label>
                <input type="text" name="" id="" placeholder='Enter designation' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>Retirement Date</label>
                  <input type="text" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>Employment Type</label>
                  <input type="text" name="" id="" placeholder='-- Terms --' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
                </>
            :
            <>
            <p className='text-inputblue my-2'>*To be filled by self-employed applicants</p>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Business Type*</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Years of operation</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Business Income(UGX)</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Six months bank settlement</label>
                <input type="file" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>One year cash flow forecast*</label>
                  <input type="file" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </>
            }
            
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Assets owned</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                  <label htmlFor="" className='text-sm'>First asset*</label>
                  <input type="text" name="" id="" placeholder='Enter asset' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className='text-sm'>Second asset*</label>
                  <input type="text" name="" id="" placeholder='Enter asset' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className='text-sm'>Third asset*</label>
                  <input type="text" name="" id="" placeholder='Enter asset' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Loan Particulars</h1>
              
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
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
    </>
  )
}

export default ApplicationPg2