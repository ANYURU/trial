import React from 'react'

function ApplicationPg2() {
  return (
    <>
        <div className='mb-3'>
            <h1 className='font-semibold'>Employment Details</h1>
            <form action="" className='m-2'>
            <div className='flex flex-col w-56 '>
                <label htmlFor="" className='text-sm font-bold'>Type</label>
                <div className='flex justify-between'>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="ownership" value="Owned" />
                        <label htmlFor="" className='text-sm'>Employed</label>
                    </div>
                    <div className='flex gap-1'>
                        <input type="radio" id="" name="ownership" value="Rented" />
                        <label htmlFor="" className='text-sm'>Self Employed</label>
                    </div>
                </div>
            </div>
            <p className='text-inputblue my-2'>*To be filled by employed applicants</p>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Employer*</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Postal Address</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Telephone Number</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Designation</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>Retirement Date</label>
                  <input type="text" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className=' text-sm'>Employment Type</label>
                  <input type="text" name="" id="" placeholder='-- Terms --' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Assets owned</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                  <label htmlFor="" className='text-sm'>First asset*</label>
                  <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className='text-sm'>Second asset*</label>
                  <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                  <label htmlFor="" className='text-sm'>Third asset*</label>
                  <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
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
                            <label htmlFor="" className='text-sm'>Employed</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type="radio" id="" name="ownership" value="Rented" />
                            <label htmlFor="" className='text-sm'>Self Employed</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Purpose of loan</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Supporting files</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Amount in figures</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Amount in words</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Months</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Repayment Method</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Spouses</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Name</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Profession</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Contact</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
            </form>
        </div>
    </>
  )
}

export default ApplicationPg2