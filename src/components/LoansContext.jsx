import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaIdCardAlt } from 'react-icons/fa'
import { MdNoAccounts } from "react-icons/md"
import { useNavigate } from 'react-router-dom'

export default function LoansContext({ index, activeIndex, show, id, setMemberModal, deleteModal, setDeleteModal}) {

  const navigate = useNavigate()
  return (
    <>
      <ul className={`absolute right-0 w-48 py-2 mt-2 z-50 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 ${index === activeIndex && show ? '' : 'hidden'}`}>
          <li 
              className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
              onClick={() => {
                navigate(`/loans/members/${id}`)
              }}
          ><FaIdCardAlt /> Payment</li>
          <li 
            className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
            
          ><MdNoAccounts /> Details</li>
      </ul>
    </>
  )
}
