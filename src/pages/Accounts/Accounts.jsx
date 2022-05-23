import React from 'react'
import { useEffect } from 'react'

function Accounts() {
  useEffect(() => {
    document.title = 'Accounts - Bweyogere tuberebumu'
  }, [])

  return (
    <div className=''>
      <h1 className='dark:text-white'>Accounts</h1>
      <div className="bg-white dark:bg-dark-bg-700 h-full m-10">
          <button className="bg-blue-600 text-white rounded-md shadow-md p-2 m-2"
          >show</button>
      </div>
    </div>
  )
}

export default Accounts