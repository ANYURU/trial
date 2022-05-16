import { memberApplications } from "../../helpers/mockData"
import { MdAdd } from "react-icons/md"
import { filterByStatus, searchByName } from "../../helpers/utilites"
import { useState } from "react"
import { FaEllipsisV } from 'react-icons/fa'
import { ContextMenu } from "../../components"
import { MemberModal } from "../../components"

function Members() {
  const [ status, setStatus ] = useState('')
  const members = filterByStatus(memberApplications, status)

  const [ activeIndex, setActiveIndex ] = useState(null)
  const [ show, setShow ] = useState(false)

  const [memberModal, setMemberModal] = useState(false)
  const [ searchText, setSearchText ] = useState('')

  return (
    <div className="h-full">
        <h1 className='mb-5 mt-2 font-bold uppercase'>Members</h1>
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
        <div className="flex bg-white p-6 min-h-full">
            <div className="w-full relative overflow-x-auto sm:rounded-lg">
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Member's Name</th><th className='px-6 py-4'>ID</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchByName(members, searchText).map((member, index) => (
                    <tr className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`} key={index}>
                      {memberModal && activeIndex === index && <MemberModal member={activeIndex === index && member} setMemberModal={setMemberModal} />}
                      <td className='px-6 py-3'>{member.date}</td><td className='px-6 py-3'>{member.name}</td><td className='px-6 py-3'>{member.id}</td><td className='px-6 py-3'>{member.amount}</td><td className='px-6 py-3'>{member.status}</td>
                      <td className="p-2">
                        <i
                          onClick={() => {
                            setActiveIndex(index)
                            setShow(!show)
                          }}
                        >
                          
                          <FaEllipsisV />
                        </i>
                          <ContextMenu activeIndex={activeIndex} show={show} index={index} setShow={setShow} setMemberModal={setMemberModal} member={activeIndex === index ? member : null} />
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

export default Members