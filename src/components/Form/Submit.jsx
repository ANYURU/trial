import React from 'react'

function Submit({ value, disabled }) {
  return (
    <input
        type="submit"
        value={value}
        className='bg-lightblue inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2 w-full mt-1'
        disabled={disabled}
    />
  )
}

export default Submit