import { useEffect } from 'react'

function Fixed() {

  useEffect(() => {
    document.title = 'Fixed Accounts - Bweyogere tuberebumu'
  }, [])

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Fixed Account</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <p className='text-md'>You don't have a Fixed account</p>
          <button className='bg-primary rounded-md text-white px-3 py-1 w-56 mt-3'>Open Account</button>
        </div>
      </div>
    </div>
  )
}

export default Fixed