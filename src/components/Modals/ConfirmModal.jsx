import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'

function ConfirmModal({ passed, setPopUp, children }) {

  return ReactDOM.createPortal(
    <div className="bg-black bg-opacity-40 w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-10 rounded-md m-2 shadow-md" ref={passed}>
        <div className="flex justify-end">
          <p><IoCloseSharp 
            className="cursor-pointer text-lg font-bold"
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