import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaIdCardAlt } from 'react-icons/fa'
import { MdNoAccounts } from "react-icons/md"

export default function ContextMenu({ index, activeIndex, show, setShow, setMemberModal, member}) {
  return (
    <>
      <ul className={`absolute right-0 w-48 py-2 mt-2 z-50 bg-white shadow-lg transition ${index === activeIndex && show ? '' : 'hidden'}`}>
          <li 
              className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent"
              onClick={() => {
                setShow(false)
                setMemberModal(true)
              }}
          ><FaIdCardAlt /> Details</li>
          <li 
            className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent"
            onClick={() => setShow(false)}
          ><MdNoAccounts /> Suspend</li>
          <li 
            className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent"
            onClick={() => setShow(false)}
          ><RiDeleteBin6Line /> Delete</li>
      </ul>
    </>
  )
}
