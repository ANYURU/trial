import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { IconContext } from "react-icons/lib";

export default function LoanModal({ passed, setLoanModal, loan }) {

    const { darkMode } = useAuth()

    // console.log(member)

  const navigate = useNavigate()
  return ReactDOM.createPortal(
    <div className={`bg-black bg-opacity-30 z-20 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${darkMode ? "dark" : ""} `}>
      <div className="bg-white dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center" ref={passed}>
        {/* {children} */}
        <div className="flex justify-between items-center w-full mb-2">
            <h1>{loan.principal}</h1>
            <div className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full">
                <IconContext.Provider value={{ className: 'cursor-pointer ' }}>
                    <IoCloseSharp
                        onClick={() => setLoanModal(false)}
                    />
                </IconContext.Provider>
            </div>
        </div>

      </div>
    </div>,
    document.getElementById('portal')
  )
}