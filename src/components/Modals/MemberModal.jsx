import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";

export default function MemberModal({ passed, setMemberModal, member }) {

  const navigate = useNavigate()
  return ReactDOM.createPortal(
    <div className="bg-black bg-opacity-40 w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-10 rounded-md shadow-md flex flex-col items-center" ref={passed}>
        {/* {children} */}
        <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold m-2 ml-0">{member.name}</h1>
            <IoCloseSharp
                onClick={() => setMemberModal(false)}
            />
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-2">Member ID:</p>
            <p className="font-bold col-span-3">{member.id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Member Status:</p>
            <p className="font-bold col-span-3">{member.status}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Amount:</p>
            <p className="font-bold col-span-3">{member.amount}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Date Joined:</p>
            <p className="font-bold col-span-3">{member.date}</p>
        </div>

        <button className="bg-primary rounded-md text-white px-2 py-1 font-bold text-lg m-2"
            onClick={() => {
                // navigate('/application')
            }}
        >
            Continue</button>
      </div>
    </div>,
    document.getElementById('portal')
  )
}