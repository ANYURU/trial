import { useState } from "react";

export default function Nominee() {
    const [ nomineeNumber, setNomineeNumber ] = useState([
        {
            name: '',
            mark: '20'
        },
    ])
    return (
        <div className='mb-3'>
            <h1 className='font-semibold'>Nominee Information</h1>
                {nomineeNumber.map((nominee, index) => (
                    <div className='flex flex-wrap gap-5 mb-3 outline outline-1 rounded p-2'>
                        <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Name</label>
                            <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                        </div>
                        <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Nominee's ID</label>
                            <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                        </div>
                        <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Contact</label>
                            <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                        </div>
                        <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Date of Birth</label>
                            <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                        </div>
                        <div className='flex flex-col w-56 '>
                            <label htmlFor="" className=' text-sm'>Percentage</label>
                            <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                        </div>
                    </div>
                ))}
                <button 
                    onClick={() => {
                        setNomineeNumber([ ...nomineeNumber, { name: '', mark: '20'},])
                    }}
                    className='bg-primary text-white px-3 py-2 rounded m-2'
                >+</button>
                <button 
                    onClick={() => {
                        setNomineeNumber([ ...nomineeNumber, { name: '', mark: '20'},])
                    }}
                    className='bg-accent-red text-white px-3 py-2 rounded m-2'
                >-</button>
        </div>
    )
}