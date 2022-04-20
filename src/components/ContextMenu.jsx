import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaEllipsisV, FaIdCardAlt } from 'react-icons/fa'
import { MdAdd, MdNoAccounts } from "react-icons/md"

export default function ContextMenu({ index, activeIndex, show, setShow}) {
  return (
    <ul className={`p-2 bg-white shadow-lg absolute ${index === activeIndex && show ? '' : 'hidden'}`}>
        <li 
            className="flex gap-1 justify-start items-center p-1 cursor-pointer mb-2 hover:bg-accent"
            onClick={() => setShow(false)}
        ><FaIdCardAlt /> Details</li>
        <li className="flex gap-1 justify-start items-center p-1 cursor-pointer mb-2 hover:bg-accent"><MdNoAccounts /> Suspend</li>
        <li className="flex gap-1 justify-start items-center p-1 cursor-pointer mb-2 hover:bg-accent"><RiDeleteBin6Line /> Delete</li>
    </ul>
  )
}
