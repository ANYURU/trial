import React from 'react'

function ApplicationVerify() {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
        <h1 className='font-bold'>Verify your identity to confirm your submission</h1>
        <p className='text-sm'>An OTP has been sent to your phone number. Please enter a valid OTP to confirm submission.</p>
        <div className='w-56'>
            <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1 mt-2' />
        </div>
        <button className='w-56 bg-primary rounded-lg border-0 px-4 py-1 my-2 text-white'>Verify</button>
        <button className='w-56 outline outline-1 outline-gray-400 rounded-lg px-3 py-1 my-2 text-gray-400'>Verify</button>
    </div>
  )
}

export default ApplicationVerify