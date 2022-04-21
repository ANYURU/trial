import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";

export default function MemberModal({ passed, setMemberModal, children, member }) {

    const navigate = useNavigate()
    console.log(member)
  return ReactDOM.createPortal(
    <div className="bg-black bg-opacity-40 w-screen h-screen absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-10 rounded-md shadow-md flex flex-col justify-center items-center" ref={passed}>
        {/* {children} */}
        <div className="flex">
            <h1 className="text-2xl font-bold m-2">{member.name}</h1>
            <IoCloseSharp
                onClick={() => setMemberModal(false)}
            />
        </div>
        <div className="flex gap-10 m-3">
            <p>Member ID</p>
            <p>{member.id}</p>
        </div>
        <div className="flex gap-10 m-3">
            <p>Member Status</p>
            <p>{member.status}</p>
        </div>
        <div className="flex gap-10 m-3">
            <p>Amount</p>
            <p>{member.amount}</p>
        </div>
        <div className="flex gap-10 m-3">
            <p>Date Joined</p>
            <p>{member.date}</p>
        </div>
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