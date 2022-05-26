import { memberApplications } from "../../helpers/mockData"
import { MdAdd } from "react-icons/md"
import { filterByStatus, searchByName } from "../../helpers/utilites"
import { useState, useEffect } from "react"
import { FaEllipsisV } from 'react-icons/fa'
import { ContextMenu } from "../../components"
import { MemberModal } from "../../components"
import { Pagination } from "../../components"
import { ConfirmModal } from "../../components"
import { useNavigate } from "react-router-dom"

function Members() {
  useEffect(() => {
    document.title = 'Members - Bweyogere tuberebumu'
  }, [])

  const navigate = useNavigate()

  const [ status, setStatus ] = useState('')
  const members = filterByStatus(memberApplications, status)

  const [ activeIndex, setActiveIndex ] = useState(null)
  const [ show, setShow ] = useState(false)

  const [memberModal, setMemberModal] = useState(false)
  const [ deleteModal, setDeleteModal ] = useState(false)
  const [ searchText, setSearchText ] = useState('')

  //pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ withdrawPerPage, setWithdrawPerPage ] = useState(10)
  const indexOfLastPage = currentPage * withdrawPerPage
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage

  const shownMembers = members.slice(indexOfFirstPage, indexOfLastPage)

  if(show === true){
    window.onclick = function(event) {
        if (!event.target.matches('.dialog')) {
            setShow(false)
        }
    }
  }

  return (
    <div className="h-full overflow-hidden">
        <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Members</h1>
        <div className="my-2 flex justify-between px-1">
          <input type="text" name="" id="" className="w-8/12 rounded-md px-2 py-2 sm:py-1 dark:bg-dark-bg-600" placeholder="Search"
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button className="w-3/12 bg-primary py-2 text-white rounded-md flex justify-center items-center"
            onClick={() => {
              navigate('/application')
            }}
          >Add Member <MdAdd /></button>
        </div>
        <div className='my-3'>
            <form action="" className='m-1'>
              <div className='flex justify-between gap-5'>
                <div className='flex flex-col w-56'>
                  <select name="status" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-700 dark:text-secondary-text"
                    onChange={(event) => setStatus(event.target.value)}
                  >
                      <option value="">Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className='flex flex-col w-56 dark:text-secondary-text'>
                  <label htmlFor="" className='text-sm '>Date</label>
                  <input type="date" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-700' />
                </div>
              </div>
            </form>
        </div>
        <div className="bg-white flex-grow overflow-scroll p-6 dark:bg-dark-bg-700">
            <div className="w-full overflow-x-auto sm:rounded-lg">
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Member's Name</th><th className='px-6 py-4'>ID</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchByName(shownMembers, searchText).map((member, index) => (
                    <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600`} key={index}>
                      {memberModal && activeIndex === index && <MemberModal member={activeIndex === index && member} setMemberModal={setMemberModal} />}
                      {deleteModal && activeIndex === index && 
                      <ConfirmModal setPopUp={setDeleteModal}>
                          <h1 className="font-bold">Are you sure you want to delete {member.name.toUpperCase()}?</h1>
                          <p>If you terminate this account, you can't recover it.</p>
                          <div className="flex justify-end gap-3 mt-3">
                            <button className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500" onClick={() => setDeleteModal(false)}
                            >Cancel</button>
                            <button className="bg-accent-red px-3 py-1 outline outline-1  rounded-md text-white" onClick={() => setDeleteModal(false)}>Delete</button>
                          </div>
                      </ConfirmModal>
                      }
                      <td className='px-6 py-3'>{member.date}</td><td className='px-6 py-3'>{member.name}</td><td className='px-6 py-3'>{member.id}</td><td className='px-6 py-3'>{member.amount}</td><td className='px-6 py-3'>{member.status}</td>
                      <td className="p-2">
                        <div className="relative">
                            <button className="block p-2 rounded-md dialog"
                              onClick={(event) => {
                                setActiveIndex(index)
                                setShow(!show)
                                event.stopPropagation()
                              }}
                            >
                                <FaEllipsisV />
                            </button>
                            <ContextMenu activeIndex={activeIndex} show={show} index={index} setShow={setShow} setMemberModal={setMemberModal} deleteModal={deleteModal} setDeleteModal={setDeleteModal} member={activeIndex === index ? member : null} />
                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between px-6 my-5">
              <Pagination
                pages={Math.ceil(members.length/withdrawPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={members}
                depositsPerPage={withdrawPerPage}
                setDepositsPerPage={setWithdrawPerPage}
              />
            </div>
          </div>
    </div>
  )
}

export default Members