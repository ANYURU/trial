import { useState } from "react"
import ApplicationPg1 from "./ApplicationPg1"
import ApplicationPg2 from "./ApplicationPg2"

function MemberApplication() {
  const [ pageNumber, setPageNumber ] = useState(1)
  return (
    <div className='h-full'>
      <h1 className="mb-5 mt-2 font-bold uppercase">MemberShip Application</h1>
      <div className="flex bg-white p-6 min-h-full">
          <div className='flex flex-grow flex-col min-h-full'>
            {pageNumber === 1 &&
              <ApplicationPg1 />
            }
            {pageNumber === 2 &&
              <ApplicationPg2 />
            }
            <div className="flex-grow flex justify-between items-end">
            {pageNumber === 1 && 
                <div className='flex justify-end w-full'>
                  <input
                    type="submit"
                    value='Next'
                    className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                    onClick={() => {
                      setPageNumber(pageNumber + 1)
                    }}
                  />
                </div>
              }

              {pageNumber === 2 &&
              <div className=''>
                <input
                  type="submit"
                  value='Previous'
                  className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                  onClick={() => {
                    setPageNumber(pageNumber - 1)
                  }}
                />
              </div>
              }

              {pageNumber === 2 &&
                <div className='flex justify-end w-full'>
                  <input
                    type="submit"
                    value='Submit'
                    className='outline outline-primary outline-2 text-white bg-primary px-4 py-1 rounded-lg cursor-pointer'
                    onClick={() => {
                      setPageNumber(pageNumber + 1)
                    }}
                  />
                </div>
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default MemberApplication