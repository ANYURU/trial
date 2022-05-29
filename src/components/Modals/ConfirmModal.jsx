import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { useAuth } from "../../auth/AuthContext"

function ConfirmModal({ passed, setPopUp, children }) {

  const { darkMode } = useAuth()

  return ReactDOM.createPortal(
    <div className={`bg-black z-20 bg-opacity-40 w-screen min-h-screen absolute ${darkMode ? "dark" : ""} top-0 left-0 right-0 flex justify-center items-center`}>
      <div className="bg-white dark:bg-dark-bg dark:text-secondary-text p-10  rounded-md m-2 sm:mb-5 shadow-md   scroll-auto top-50" ref={passed}>
        <div className="flex justify-end">
          <p><IoCloseSharp 
            className="cursor-pointer text-lg font-bold dark:text-white"
            onClick={() => setPopUp(false)}
          /></p>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default ConfirmModal