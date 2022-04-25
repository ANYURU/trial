
export default function ApplicationPg1() {
  return (
    <>
        <div className='mb-3'>
            <h1 className='font-semibold'>Applicant's Details</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Name</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Date of Birth</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Gender</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Present Address</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Email Address</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Phone Number</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>ID/Passport No.</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Marital Status</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Father's name</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Father's address</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Source Of Income</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56 '>
                    <div className='flex justify-between'>
                        <div className='flex gap-1'>
                            <input type="radio" id="" name="ownership" value="Owned" />
                            <label htmlFor="" className='text-sm'>Employed</label>
                        </div>
                        <div className='flex gap-1'>
                            <input type="radio" id="" name="ownership" value="Rented" />
                            <label htmlFor="" className='text-sm'>Business</label>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
        <p className="text-inputblue">*To be filled by employed applicants</p>
        <div className='mb-3'>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Employer</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                <label htmlFor="" className=' text-sm'>Employer's address</label>
                <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Position</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Work station</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Gross Monthly Income</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Appointment Date</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Payroll Number</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Source of Income</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
            </form>
        </div>
    </>
  )
}