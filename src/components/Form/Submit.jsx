import React from 'react'

function Submit({ value }) {
  return (
    <button
        type="submit"
        className='bg-primary inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2 w-full mt-1'
    >{value}
    </button>
  )
}

export default Submit