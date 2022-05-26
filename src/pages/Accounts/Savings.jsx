function Savings() {
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Savings Account</h1>
      <div className="flex flex-col bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
        <div className="flex gap-10">
          <p>Account Number</p>
          <div className="flex font-bold">
            <p>0000033300030303</p>
          </div>
        </div>
        <div className="flex gap-10">
          <p>Account Balance</p>
          <div className="flex font-bold">
            <p>0</p>
            <span>ugx</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Savings