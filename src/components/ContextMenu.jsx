import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaIdCardAlt } from 'react-icons/fa'
import { MdNoAccounts, MdOutlineAdminPanelSettings } from "react-icons/md"

export default function ContextMenu({ index, activeIndex, show, setMemberModal, setDeleteModal, setSuspendModal, profile, setPromoteModal}) {
  return (
    <>
      <ul className={`absolute right-0 w-48 py-2 mt-2 z-50 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 ${index === activeIndex && show ? '' : 'hidden'}`}>
          <li 
              className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
              onClick={() => {
                setMemberModal(true)
              }}
          ><FaIdCardAlt /> Details</li>
          {profile.roles.includes("super_admin") &&
            <li 
              className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
              onClick={() => setPromoteModal(true)}
            ><MdOutlineAdminPanelSettings /> Promote</li>
          }
          <li 
            className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
            onClick={() => setSuspendModal(true)}
          ><MdNoAccounts /> Suspend</li>
          <li 
            className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
            onClick={() => setDeleteModal(true)}
          ><RiDeleteBin6Line /> Delete</li>
      </ul>
    </>
  )
}
