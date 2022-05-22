import React from 'react'

function Mwana() {
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Mwana Account</h1>
      <div className="flex bg-white p-6 min-h-full">
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

export default Mwana