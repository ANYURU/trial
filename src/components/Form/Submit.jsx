import React from 'react'

function Submit({ value, disabled }) {
  return (
    <button
        type="submit"
        className='bg-primary inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2 w-full mt-1 cursor-pointer'
        disabled={disabled}
    >{value}
    </button>
  )
}

export default Submit