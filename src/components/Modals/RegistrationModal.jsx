import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";

export default function RegistrationModal({ passed, setPopUp, children }) {

    const navigate = useNavigate()

  return ReactDOM.createPortal(
    <div className="bg-black bg-opacity-40 w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-10 rounded-md shadow-md flex flex-col justify-center items-center" ref={passed}>
        {/* {children} */}
        <h1 className="text-2xl font-bold m-2">WELCOME</h1>
        <p className="m-2 text-lg">You must first register to get full access to the system</p>
        <button className="bg-primary rounded-md text-white px-2 py-1 font-bold text-lg m-2"
            onClick={() => {
                navigate('/application')
            }}
        >
            Continue</button>
      </div>
    </div>,
    document.getElementById('portal')
  )
}