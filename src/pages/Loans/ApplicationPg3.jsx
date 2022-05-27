import React from 'react'

function ApplicationPg3() {
  return (
    <>
        <div className='mb-3'>
            <h1 className='font-semibold'>Loan in other banks or financial institutions</h1>
            <form action="" className='m-2 flex gap-2'>
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold'>01</h1>
                </div>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                        <label htmlFor="" className='text-sm'>Name</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className=' text-sm'>Amount Advanced</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className=' text-sm'>Date Granted</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className=' text-sm'>Repayment Period</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Balance</label>
                    <input type="text" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                </div>
            </form>
            <form action="" className='m-2 flex gap-2'>
                <div className='flex justify-center items-center'>
                    <h1 className='font-bold'>02</h1>
                </div>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                        <label htmlFor="" className='text-sm'>Name</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className=' text-sm'>Amount Advanced</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className=' text-sm'>Date Granted</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className=' text-sm'>Repayment Period</label>
                        <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Balance</label>
                    <input type="text" name="" id="" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                    </div>
                </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Additional Files</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                  <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Security Details</h1>
            <p>I offer the following Security</p>
            <div className='flex gap-1'>
                <input type="checkbox" id="" name="ownership" value="Owned" />
                <label htmlFor="" className='text-sm'>Salary</label>
            </div>
            <div className='flex gap-1'>
                <input type="checkbox" id="" name="ownership" value="Owned" />
                <label htmlFor="" className='text-sm'>Shares</label>
            </div>
            <div className='flex gap-1'>
                <input type="checkbox" id="" name="ownership" value="Owned" />
                <label htmlFor="" className='text-sm'>Guarantors</label>
            </div>
            
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Others Specify</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' />
                </div>
            </div>
            </form>
        </div>
    </>
  )
}

export default ApplicationPg3