import ReactDOM from "react-dom"
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { IconContext } from "react-icons/lib";

export default function MemberModal({ passed, setMemberModal, member }) {

    const { darkMode } = useAuth()

    console.log(member)

  const navigate = useNavigate()
  return ReactDOM.createPortal(
    <div className={`bg-black bg-opacity-40 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${darkMode ? "dark" : ""} `}>
      <div className="bg-white dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center" ref={passed}>
        {/* {children} */}
        <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold m-2 ml-0 dark:text-white">{member.fullname}</h1>
            <div className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full">
                <IconContext.Provider value={{ className: 'cursor-pointer ' }}>
                    <IoCloseSharp
                        onClick={() => setMemberModal(false)}
                    />
                </IconContext.Provider>
            </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-2">Member ID:</p>
            <p className="font-bold col-span-3">{member.id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-2">Email:</p>
            <p className="font-bold col-span-3">{member.email_address}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="col-span-2">Phone Number:</p>
            <p className="font-bold col-span-3">{member.phone_number}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Member Status:</p>
            <p className="font-bold col-span-3">{member.member_status}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Marital Status:</p>
            <p className="font-bold col-span-3">{member.marital_status}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
            <p className="col-span-2">Gender:</p>
            <p className="font-bold col-span-3">{member.gender}</p>
        </div>

        {/* <button className="bg-primary rounded-md text-white px-2 py-1 font-bold text-lg m-2"
            onClick={() => {
                // navigate('/application')
            }}
        >
            Continue</button> */}
      </div>
    </div>,
    document.getElementById('portal')
  )
}