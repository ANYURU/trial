import { Nominee } from "../../components"

function ApplicationPg2({getValues}) {
  return (
      <>
        <div className='mb-3'>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Proposed Monthly Contributions</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Amount in words</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Proposed Mode of Remittances-check off</h1>
            <form action="" className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex justify-center items-center gap-2'>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Check-off</label>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Standing Order</label>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Direct Debit</label>
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Specify Others</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Effective Date (dd/mm/yyyy)</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
            </form>
        </div>
        <Nominee />
      </>
  )
}

export default ApplicationPg2