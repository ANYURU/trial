import { useState } from "react"

function ApplicationVerify({ initialValues, setPageNumber }) {

  const [ otp, setOtp ] = useState('')
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
        <h1 className='font-bold'>Verify your identity to confirm your submission</h1>
        <p className='text-sm'>An OTP has been sent to your phone number. Please enter a valid OTP to confirm submission.</p>
        <div className="flex flex-col justify-center items-center mt-5 p-5">
          <input type="text" name="" placeholder='Enter OTP' className='ring-1 ring-black rounded px-2 py-1 mt-2 dark:bg-dark-bg-600 w-full'
          onChange={(event) => setOtp(event.target.value)}
           />
          <button type="button" className=' bg-primary rounded-sm border-0 px-4 py-1 mt-2 text-white w-full'
            onClick={() => {
              if(otp){
                console.log(initialValues)
                alert("Your loan application has been sent.")
                setPageNumber(1)
              }
            }}
          >Verify</button>
          <button type="button" className='w-full outline outline-1 outline-gray-400 rounded-sm px-3 py-1 mt-2 text-gray-400'>Resend OTP</button>
        </div>
    </div>
  )
}

export default ApplicationVerify