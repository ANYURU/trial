import { Submit } from "../../components"

function MakeDeposit() {
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Deposit</h1>
      <div className="flex bg-white p-6 min-h-full dark:bg-dark-bg-700 dark:text-secondary-text">
      <div className='flex flex-grow flex-col min-h-full'>
        <div className='mb-3'>
            <form action="" className='m-2'>
              <div className='flex flex-wrap gap-5'>
                  <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Please select an account</label>
                    <select name="" id="" className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-700" required>
                      <option value="">--Select Account--</option>
                      <option value="savings">Savings</option>
                      <option value="shares">Shares</option>
                      <option value="fixed">Fixed</option>
                      <option value="mwana">Mwana</option>
                    </select>
                  </div>
                  <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Enter Amount</label>
                    <input type="text" name="" id="" placeholder='Enter amount' className='ring-1 ring-black rounded px-2 py-1 focus:ring-primary focus:outline-none focus:ring-2 dark:bg-dark-bg-700' required />
                  </div>
              </div>
            </form>
        </div>
        <div className='mb-3'>
            <form action="" className='m-2'>
              <div className='flex flex-wrap gap-5'>
                  <div className='flex flex-col w-56'>
                    <label htmlFor="" className='text-sm'>Enter Phone Number</label>
                    <input type="text" name="" id="" placeholder='Enter phone number' className='ring-1 ring-black rounded px-2 py-1 focus:ring-primary focus:outline-none focus:ring-2 dark:bg-dark-bg-700' />
                  </div>
                  <div className='flex flex-col w-56 '>
                    <label className='text-sm'>Upload Receipt</label>
                    <input type="file" className='block ring-2 ring-primary rounded-lg w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-white
                        hover:file:bg-primary' />
                  </div>
              </div>
            </form>
        </div>
          <div className='mb-3'>
              <h1 className='font-semibold'>Particulars</h1>
              <textarea name="" id="" cols="30" rows="10" className='outline outline-1 rounded-md w-full p-2 dark:bg-dark-bg-700'></textarea>
          </div>
        <div className="w-56">
          <Submit value='Request' />
        </div>
      </div>
      </div>
    </div>
  )
}

export default MakeDeposit