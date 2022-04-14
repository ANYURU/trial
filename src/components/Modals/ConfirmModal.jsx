import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'

function ConfirmModal({ passed, children }) {

  return ReactDOM.createPortal(
    <div className="bg-black bg-opacity-40 w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-20 rounded-md shadow-md" ref={passed}>
        <div className="flex justify-end">
          <p><IoCloseSharp /></p>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default ConfirmModal