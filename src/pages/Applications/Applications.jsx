import { memberApplications } from "../../helpers/mockData"
import { MdAdd } from "react-icons/md"
import { filterByStatus } from "../../helpers/utilites"
import { useState, useEffect } from "react"
import { FaEllipsisV } from 'react-icons/fa'
import { searchByName } from "../../helpers/utilites"
import { supabase } from "../../helpers/supabase"

function Applications() {

  useEffect(() => {
    getApplications()
    document.title = "Member's Application - Bweyogere tuberebumu"
  }, [])

  const [ deposits, setDeposits ] = useState([])

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "membership")
    setDeposits(data)
  }

  console.log(deposits)

  const [ status, setStatus ] = useState('')
  const members = filterByStatus(memberApplications, status)
  const approvedMembers = memberApplications.filter(member => member.status === 'Approved')
  const pendingMembers = memberApplications.filter(member => member.status === 'Pending')
  const rejectedMembers = memberApplications.filter(member => member.status === 'Rejected')

  const [ searchText, setSearchText ] = useState('')
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Applications Details</h1>
      <div className="flex justify-between my-3">
          <div className="bg-green-400 w-4/12 flex flex-col justify-center items-center py-2 border-l-8 border-green-800">
              <h1 className="text-lg font-bold">{approvedMembers.length}</h1>
              <p className="uppercase">Approved</p>
          </div>
          <div className="bg-yellow-400 w-4/12 flex flex-col justify-center items-center py-2 border-l-8 border-yellow-600">
              <h1 className="text-lg font-bold">{pendingMembers.length}</h1>
              <p className="uppercase">Pending</p>
          </div>
          <div className="bg-red-400 w-4/12 flex flex-col justify-center items-center py-2 border-l-8 border-red-800">
              <h1 className="text-lg font-bold">{rejectedMembers.length}</h1>
              <p className="uppercase">Rejected</p>
          </div>
      </div>
      <div className="my-2 flex justify-between px-1">
          <input type="text" name="" id="" className="w-8/12 rounded-md px-2 py-2 sm:py-1" placeholder="Search" 
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button className="w-3/12 bg-primary py-2 text-white rounded-md flex justify-center items-center"
            onClick={() => {}}
          >Add Member <MdAdd /></button>
      </div>
      <div className='my-3'>
            <form action="" className='m-1'>
            <div className='flex justify-between gap-5'>
              <div className='flex flex-col w-56'>
                <select name="status" id="" className="py-2 px-2 rounded bg-white"
                  onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="">Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Date</label>
                <input type="date" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
              </div>
            </div>
            </form>
        </div>
      <div className="flex bg-white dark:bg-dark-bg-700 p-6 min-h-full">
        <div className="w-full overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Member's Name</th><th className='px-6 py-4'>ID</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600`} key={index}>
                  {/* <td className='px-6 py-3'>{member.date}</td><td className='px-6 py-3'>{member.name}</td><td className='px-6 py-3'>{member.id}</td><td className='px-6 py-3'>{member.amount}</td><td className='px-6 py-3'>{member.status}</td> */}
                  <td className='px-6 py-3'>{deposit.created_at.substring(0, 10)}</td><td className='px-6 py-3'>{deposit.application_meta.applicants_name}</td><td className='px-6 py-3'>{deposit.application_id}</td><td className='px-6 py-3'></td><td className='px-6 py-3'>{deposit.reviewed ? "Rejected" : "Pending"}</td>
                  <td className="p-2">
                        <i
                          onClick={() => {}}
                        >
                          <FaEllipsisV />
                        </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Applications