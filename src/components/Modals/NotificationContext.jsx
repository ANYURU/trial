import React from 'react'

function NotificationContext({ show }) {
  return (
    <div className={`absolute right-0 w-[40vw] py-2 px-5 mt-2 z-60 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 dark:text-secondary-text ${show ? "" : "hidden"}`}>
      <h3 className='py-3'>Notifications</h3>
      <hr />
      <ul>
        <li className='py-2 px-2 hover:bg-accent dark:hover:bg-dark-bg-600'>You deposit has been approved</li>
        <li className='py-2 px-2 hover:bg-accent dark:hover:bg-dark-bg-600'>You withdraw was rejected</li>
      </ul>
    </div>
  )
}

export default NotificationContext
