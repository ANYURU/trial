import { MdOutlineSettings } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from 'react-icons/io5'

function NotificationContext({ show }) {
  return (
    <div
      className={`absolute right-0 w-[40vw] py-2 px-5 mt-2 z-60 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 dark:text-secondary-text ${
        show ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="py-3 font-bold">Notifications</h1>
        <MdOutlineSettings size={20} />
      </div>

      <hr />
      <ul>
        <li className="py-2 px-2 h-16 flex items-center hover:bg-accent dark:hover:bg-dark-bg-600">
          <div className="rounded-full bg-green-100 w-10 h-10 mr-2 flex justify-center items-center text-green-700 ">
            <BsCheckLg />
          </div>
          You deposit has been approved
        </li>
        <li className="py-2 px-2 h-16 flex items-center hover:bg-accent dark:hover:bg-dark-bg-600">
          <div className="rounded-full bg-red-100 w-10 h-10 mr-2 flex justify-center items-center text-red-700 ">
            <IoClose size={20} />
          </div>
          You withdraw was rejected
        </li>
        <li className="py-2 px-2 h-16 flex items-center hover:bg-accent dark:hover:bg-dark-bg-600">
          <div className="rounded-full bg-green-100 w-10 h-10 mr-2 flex justify-center items-center text-green-700 ">
            <BsCheckLg />
          </div>
          You deposit has been approved
        </li>
        <li className="py-2 px-2 h-16 flex items-center hover:bg-accent dark:hover:bg-dark-bg-600">
          <div className="rounded-full bg-red-100 w-10 h-10 mr-2 flex justify-center items-center text-red-700 ">
            <IoClose size={20} />
          </div>
          You withdraw was rejected
        </li>
      </ul>
    </div>
  );
}

export default NotificationContext;
