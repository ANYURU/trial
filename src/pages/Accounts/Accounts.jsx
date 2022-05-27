import React from 'react'
import { useEffect } from 'react'
import { FaEllipsisV } from 'react-icons/fa'

function Accounts() {
  useEffect(() => {
    document.title = 'Accounts - Bweyogere tuberebumu'
  }, [])

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Accounts</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      <div className="w-full overflow-x-auto sm:rounded-lg">
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th className='px-6 py-4'>Account Type</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Created At</th><th className='px-6 py-4'>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='hover:bg-gray-100 dark:hover:bg-dark-bg-600'>
                    <td className='px-6 py-4'>Savings</td><td className="px-6 py-4">23,000</td><td className="px-6 py-4">2022-04-12</td><td className="px-6 py-4">Active</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                          <button className="block p-2 rounded-md dialog">
                              <FaEllipsisV />
                          </button>
                      </div>
                    </td>
                  </tr>
                  <tr className='hover:bg-gray-100 dark:hover:bg-dark-bg-600'>
                    <td className='px-6 py-4'>Shares</td><td className="px-6 py-4">23,000</td><td className="px-6 py-4">2022-04-12</td><td className="px-6 py-4">Active</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                          <button className="block p-2 rounded-md dialog">
                              <FaEllipsisV />
                          </button>
                      </div>
                    </td>
                  </tr>
                  <tr className='hover:bg-gray-100 dark:hover:bg-dark-bg-600'>
                    <td className='px-6 py-4'>Mwana</td><td className="px-6 py-4">23,000</td><td className="px-6 py-4">2022-04-12</td><td className="px-6 py-4">Active</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                          <button className="block p-2 rounded-md dialog">
                              <FaEllipsisV />
                          </button>
                      </div>
                    </td>
                  </tr>
                  <tr className='hover:bg-gray-100 dark:hover:bg-dark-bg-600'>
                    <td className='px-6 py-4'>Fixed</td><td className="px-6 py-4">23,000</td><td className="px-6 py-4">2022-04-12</td><td className="px-6 py-4">Active</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                          <button className="block p-2 rounded-md dialog">
                              <FaEllipsisV />
                          </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
      </div>
    </div>
  )
}

export default Accounts