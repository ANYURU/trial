import { MdAdd } from "react-icons/md"
import { filterByStatus } from "../../helpers/utilites"
import { useState, useEffect } from "react"
import { FaEllipsisV } from 'react-icons/fa'
import { searchByName2 } from "../../helpers/utilites"
import { supabase } from "../../helpers/supabase"
import { Pagination } from "../../components"
import { ContextMenu } from "../../components"
import { MemberModal } from "../../components"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../components"

export default function Applications() {

  useEffect(() => {
    getApplications()
    document.title = "Membership Application - Bweyogere tuberebumu"
  }, [])

 

  const [ applications, setApplications ] = useState([])

  const navigate = useNavigate()

  const getApplications = async () => {
    const { error, data } = await supabase
    .from("applications")
    .select()
    .eq("_type", "membership")
    .order("created_at",  { ascending: false })
    setApplications(data)
  }

  const [ status, setStatus ] = useState("")
  const approvedMembers = applications.filter(application => application.application_meta.review_status)
  const pendingMembers = applications.filter(application => !application.reviewed)
  const rejectedMembers = applications.length - (approvedMembers.length + pendingMembers.length)


  //pagination
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ applicationsPerPage, setApplicationsPerPage ] = useState(10)
  const indexOfLastPage = currentPage * applicationsPerPage
  const indexOfFirstPage = indexOfLastPage - applicationsPerPage

  const filteredApplications = applications.filter(application => status === "" ? application : status === 'pending' ? !application.reviewed : status === "approved" ? application.application_meta.review_status === status : application.reviewed && application.application_meta.review_status !== "approved" )

  const shownApplications = filteredApplications.slice(indexOfFirstPage, indexOfLastPage)
                            

  const [ searchText, setSearchText ] = useState('')

  //content
  const [ activeIndex, setActiveIndex ] = useState(null)
  const [memberModal, setMemberModal] = useState(false)
  const [ deleteModal, setDeleteModal ] = useState(false)

  const [ show, setShow ] = useState(false)
  if(show === true){
    window.onclick = function(event) {
        if (!event.target.matches('.dialog')) {
            setShow(false)
        }
    }
  }

  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Membership Applications</h1>
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
              <h1 className="text-lg font-bold">{rejectedMembers}</h1>
              <p className="uppercase">Rejected</p>
          </div>
      </div>
      <div className="my-2 flex justify-between px-1">
          <input type="text" name="" id="" className="w-8/12 rounded-md px-2 py-2 sm:py-1 focus:outline-none focus:ring focus:ring-primary dark:bg-dark-bg-700" placeholder="Search" 
            onChange={(event) => setSearchText(event.target.value)}
          />
      </div>
      <div className='my-3'>
            <div className='m-1'>
            <div className='flex justify-between gap-5'>

              <div className='flex flex-col w-56'>
                <select name="status" id="" className="py-2 px-2 rounded bg-white dark:bg-dark-bg-700 dark:text-secondary-text"
                  onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="">Status</option>
                    <option value={"approved"}>Approved</option>
                    <option value={"pending"}>Pending</option>
                    <option value={"rejected"}>Rejected</option>
                </select>
              </div>
              
              <div className='flex flex-col w-56'>
                <input type="date" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-700 dark:text-secondary-text' />
              </div>
            </div>
            </div>
        </div>
      <div className="bg-white dark:text-secondary-text dark:bg-dark-bg-700 m-1 overflow-scroll p-6 h-full">
        {applications.length > 0 ? 
        <>
        <div className="w-full overflow-x-auto sm:rounded-lg">
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-4'>Date</th><th className='px-6 py-4'>Member's Name</th><th className='px-6 py-4'>ID</th><th className='px-6 py-4'>Amount</th><th className='px-6 py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {searchByName2(shownApplications, searchText).map((application, index) => (
                <tr className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`} key={index}
                  onClick={() => navigate(`/members/applications/${application.application_id}`)}
                >
                  {memberModal && activeIndex === index && <MemberModal member={activeIndex === index && application} setMemberModal={setMemberModal} />}
                  <td className='px-6 py-3'>{application.created_at.substring(0, 10)}</td><td className='px-6 py-3'>{application.application_meta.applicants_name}</td><td className='px-6 py-3'>{application.application_id}</td>
                  <td className='px-6 py-3'>{application.application_meta.proposed_monthly_contributions}</td>

                  <td className={`px-6 py-3`}>
                      <span className={` py-1 px-2 rounded-xl text-white ${application.reviewed ? application.application_meta.review_status === "approved" ? "bg-green-400" : "bg-red-400" : "bg-yellow-400"}`}>
                      {application.reviewed ?
                        application.application_meta.review_status === "approved" ? "Approved" : "Rejected"
                      : "Pending"}
                      </span>
                    </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div> 
        <div className="flex justify-between px-6 my-5">
              <Pagination
                pages={Math.ceil(filteredApplications.length/applicationsPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={filteredApplications}
                depositsPerPage={applicationsPerPage}
                setDepositsPerPage={setApplicationsPerPage}
              />
        </div>
        </>
        :
                <Loader />
        }
      </div>
    </div>
  )
}