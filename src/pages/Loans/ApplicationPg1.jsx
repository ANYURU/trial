
export default function ApplicationPg1() {
  return (
    <>
        <div className='mb-3'>
            <h1 className='font-semibold'>Applicant's Personal Information</h1>
            <form action="" className='m-2'>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                        <label htmlFor="" className='text-sm'>Position in SACCO</label>
                        <select name="" id="" className="ring-1 ring-black rounded px-2 py-2 bg-white">
                        <option value="">--Position--</option>
                        <option value="member">Member</option>
                        <option value="treasure">Treasure</option>
                        <option value="secretary">Secretary</option>
                        <option value="chairperson">Chairperson</option>
                        <option value="chairperson-credits">Chairperson Credits</option>
                        <option value="vice-chairperson">Vice Chairperson</option>
                        <option value="vice-chairperson-credits">Vice Chairperson Credits</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Postal Address</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Land line number</label>
                    <input type="text" name="" id="" placeholder='(222) 222 - 2222' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className=' text-sm'>Marital Status</label>
                        <select name="" id="" className="ring-1 ring-black rounded px-2 py-2 bg-white">
                            <option value="">--Marital Status--</option>
                            <option value="single">Single</option>
                            <option value="Married">Married</option>
                            <option value="widowed">Widowed</option>
                            <option value="divorced">Divorced</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Number of dependents</label>
                    <input type="text" name="" id="" placeholder='No. of dependants' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                </div>
                </form>
        </div>
        <div className='mb-3'>
                <h1 className='font-semibold'>Physical Address</h1>
                <form action="" className='m-2'>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Town</label>
                    <input type="text" name="" id="" placeholder='Enter your town' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className='text-sm'>Estate</label>
                    <input type="text" name="" id="" placeholder='Enter estate name' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className='text-sm'>Street</label>
                    <input type="text" name="" id="" placeholder='Enter street name' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className='text-sm'>House Number</label>
                    <input type="text" name="" id="" placeholder='Enter house no.' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label htmlFor="" className='text-sm'>Ownership</label>
                        <div className='flex justify-between'>
                            <div className='flex gap-1'>
                                <input type="radio" id="owned" name="ownership" value="Owned" className='w-4 h-4'/>
                                <label htmlFor="owned" className='text-sm'>Owned</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" id="rented" name="ownership" value="Rented" className='w-4 h-4'/>
                                <label htmlFor="rented" className='text-sm'>Rented</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className='text-sm'>Years Spent</label>
                    <input type="text" name="" id="" placeholder='Years Spent' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                </div>
                </form>
            </div>
            <div className='mb-3'>
                <h1 className='font-semibold'>Next of Kin</h1>
                <form action="" className='m-2'>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Name</label>
                    <input type="text" name="" id="" placeholder='Enter name' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Profession</label>
                    <input type="text" name="" id="" placeholder='Enter profession' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Contact</label>
                    <input type="text" name="" id="" placeholder='Enter contact' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                </div>
                </form>
            </div>
            <div className='mb-3'>
                <h1 className='font-semibold'>Spouse</h1>
                <form action="" className='m-2'>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Name</label>
                    <input type="text" name="" id="" placeholder='Enter name' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Profession</label>
                    <input type="text" name="" id="" placeholder='Enter profession' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Contact</label>
                    <input type="text" name="" id="" placeholder='Enter contact' className='ring-1 ring-black rounded px-2 py-1' />
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}