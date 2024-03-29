import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../auth/AuthContext";
import { IconContext } from "react-icons/lib";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";

export default function MemberModal({
  passed,
  setMemberModal,
  member,
  memberModal,
}) {
  useEffect(() => {
    suspend();
  });
  const [suspended, setSuspended] = useState(false);
  const [show, setShow] = useState(false)
  const suspend = async () => {
    const { error, data } = await supabase
      .from("users")
      .select()
      .eq("id", member.id);
    if (data) {
      setSuspended(data[0].suspended);
    }
  };

  const { darkMode } = useAuth();

  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".portal")) {
        setMemberModal(false);
      }
    };
  }

  return ReactDOM.createPortal(
    <div
      className={`bg-black bg-opacity-40 z-20 w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ${
        darkMode ? "dark" : ""
      } `}
    >
      <div
        className="bg-white portal dark:bg-dark-bg dark:text-secondary-text p-10 rounded-md shadow-md flex flex-col items-center"
        ref={passed}
      >
        {/* {children} */}
        <div className="flex justify-between items-center w-full mb-2">
          <div className="flex gap-2 items-center">
            {member?.avatar ? (
              <div
                className="w-16 h-16 bg-accent mx-2 mb-1 overflow-hidden bg-cover rounded-full"
                style={{ backgroundImage: `url(${member?.avatar})` }}
              ></div>
            ) : (
              <span className="h-16 w-16 bg-accent dark:bg-dark-bg-600 flex justify-center font-bold items-center overflow-hidden mb-2 rounded-full">
                {member?.fullname !== undefined &&
                  member.fullname !== null &&
                  ` ${member?.fullname.split("")[0]}`}
              </span>
            )}
            <h1 className="text-2xl font-bold m-2 ml-0 dark:text-white">
              {member.fullname}
            </h1>
          </div>
          <div className="dark:hover:bg-dark-bg-600 hover:bg-accent p-2 rounded-full">
            <IconContext.Provider value={{ className: "cursor-pointer " }}>
              <IoCloseSharp onClick={() => setMemberModal(false)} />
            </IconContext.Provider>
          </div>
        </div>

        {suspended && (
          <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
            <p className="font-bold col-span-3">Suspended</p>
          </div>
        )}

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Member ID</p>
          <p className="font-bold col-span-3">: {member.member_id}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Email</p>
          <p className="font-bold col-span-3">: {member.email_address}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
          <p className="col-span-2">Phone Number</p>
          <p className="font-bold col-span-3">: {member.phone_number}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
          <p className="col-span-2">Member Status</p>
          <p className="font-bold col-span-3">
            <span
              className={` py-1 px-2 rounded-xl text-white ${
                member.member_status === "active"
                  ? "bg-green-400"
                  : "bg-red-400"
              }`}
            >
              {member.member_status}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
          <p className="col-span-2">Marital Status</p>
          <p className="font-bold col-span-3">: {member.marital_status}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
          <p className="col-span-2">Gender</p>
          <p className="font-bold col-span-3">: {member.gender}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-2 w-full">
          <p className="col-span-2">NIN/passport</p>
          <p className="font-bold col-span-3">: {member.id_passport_number}</p>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
