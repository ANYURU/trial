import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { Spinner, NothingShown, ConfirmModal } from "../../components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaIdCardAlt } from "react-icons/fa";
import { MdNoAccounts } from "react-icons/md";
import { MemberModal } from "../../components";
import { toast, ToastContainer } from "react-toastify";

export default function Members() {
  const [admins, setAdmins] = useState([]);
  const [date, setDate] = useState(null);
  
  useEffect(() => {
    getMembers();
    document.title = "Admins - Bweyogere tuberebumu";
  }, [admins]);

  const [adminModal, setAdminModal] = useState(false);
  const [demoteModal, setDemoteModal] = useState(false);
  const [suspendModal, setSuspendModal] = useState(false);

  const getMembers = async () => {
    const { error, data } = await supabase.from("_member_profiles").select();

    const dataArray = data.filter(
      (member) => member.roles && member?.roles.includes("admin")
    );
    dataArray.length === 0 ? setAdmins(null) : setAdmins(dataArray);
  };

  const [status, setStatus] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [show, setShow] = useState(false);

  const [searchText, setSearchText] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  const filteredMembers =
    !admins ||
    admins
      .filter(
        (admin) =>
          !admin?.fullname ||
          admin?.fullname.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
      .filter((admin) => !status || admin.admin_status === status)
      .filter(
        (admin) =>
          !date ||
          !admin?.member_meta ||
          admin.member_meta.approved_at.substring(0, 10) === date
      );

  const ShownAdmins =
    admins && filteredMembers.slice(indexOfFirstPage, indexOfLastPage);

  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  const demoteMember = async (admin) => {
    const { error, data } = await supabase
      .from("new_members")
      .update({ roles: ["member"], position_in_sacco: "member"})
      .eq("id", admin.id);

    if (error) {
      toast.error(`Failed to demote ${admin.fullname}.`, {
        position: "top-center",
      });
    } else {
      toast.success(`Demoted ${admin.fullname}.`, { position: "top-center" });
    }

    setDemoteModal(false);
  };

  return (
    <div className="mx-2 md:mx-5 md:mt-2 h-[calc(100vh-70px)] flex flex-col">
      <ToastContainer />
      <div className="flex flex-col justify-between  md:h-[50px]">
        <h1 className="mt-2 font-bold uppercase dark:text-white">
          Administrators
        </h1>
      </div>

      <div className="bg-white md:shadow-md overflow-hidden flex-grow  relative md:h-[calc(100%-50px)] sm:min-h-[calc(100%-50px)] dark:bg-dark-bg-700">
        {admins && admins.length > 0 ? (
          <>
            <div className="w-full  overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th></th>
                    <th className="px-6 py-4">Admin</th>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Phone Number</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ShownAdmins.map((admin, index) => (
                    <tr
                      className={`${
                        index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                      } hover:bg-gray-100 dark:hover:bg-dark-bg-600`}
                      key={index}
                    >
                      <td
                        onClick={() => {
                          setActiveIndex(index)
                          setAdminModal(true)
                        }}
                      ><span className="ml-2 px-4 py-3 text-sm">&gt;</span></td>
                      {adminModal && activeIndex === index && (
                        <MemberModal
                          member={activeIndex === index && admin}
                          setMemberModal={setAdminModal}
                          memberModal={adminModal}
                        />
                      )}
                      {demoteModal && activeIndex === index && (
                        <ConfirmModal setPopUp={setDemoteModal}>
                          <h1 className="font-bold">Are you sure?</h1>
                          <p>
                            You are demoting {admin.fullname.toUpperCase()}.
                          </p>
                          <div className="flex justify-end gap-3 mt-3">
                            <button
                              className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
                              onClick={() => setDemoteModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-accent-red px-3 py-1 outline outline-1  rounded-md text-white"
                              onClick={() => demoteMember(admin)}
                            >
                              Demote
                            </button>
                          </div>
                        </ConfirmModal>
                      )}
                      {suspendModal && activeIndex === index && (
                        <ConfirmModal setPopUp={setSuspendModal}>
                          <h1 className="font-bold">Are you sure?</h1>
                          <p>
                            {admin.fullname.toUpperCase()} won't be able to use
                            it until you unsuspend.
                          </p>
                          <div className="flex justify-end gap-3 mt-3">
                            <button
                              className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
                              onClick={() => {
                                setSuspendModal(false);
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-accent-red px-3 py-1 outline outline-1  rounded-md text-white"
                              onClick={async () => {
                                await supabase
                                  .from("users")
                                  .update({ suspended: true })
                                  .eq("id", admin.id);
                                setSuspendModal(false);
                              }}
                            >
                              Suspend
                            </button>
                          </div>
                        </ConfirmModal>
                      )}
                      <td className="px-6 py-3" onClick={() => {
                          setActiveIndex(index)
                          setAdminModal(true)
                        }}>{admin.fullname}</td>
                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setAdminModal(true)
                        }}
                      
                      >{admin?.member_id || admin?.id}</td>
                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setAdminModal(true)
                        }}
                      
                      >{admin.phone_number}</td>

                      <td className={`px-6 py-3`}
                        onClick={() => {
                          setActiveIndex(index)
                          setAdminModal(true)
                        }}
                      >
                        <span
                          className={` py-1 px-2 rounded-xl text-white font-bold text-sm ${
                            admin.member_status === "active"
                              ? "bg-emerald-600"
                              : "bg-red-400"
                          }`}
                        >
                          {admin.member_status}
                        </span>
                      </td>

                      <td className="p-2">
                        <div className="relative">
                          <button
                            className="block p-2 rounded-md dialog"
                            onClick={(event) => {
                              setActiveIndex(index);
                              setShow(!show);
                              event.stopPropagation();
                            }}
                          >
                            <FaEllipsisV />
                          </button>
                          <ul
                            className={`absolute right-0 w-48 py-2 mt-2 z-50 bg-white shadow-lg ease-in-out duration-300 dark:bg-dark-bg-700 ${
                              index === activeIndex && show ? "" : "hidden"
                            }`}
                          >
                            <li
                              className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
                              onClick={() => setSuspendModal(true)}
                            >
                              <MdNoAccounts /> Suspend
                            </li>
                            <li
                              className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
                              onClick={() => setDemoteModal(true)}
                            >
                              <RiDeleteBin6Line /> Demote
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : admins === null ? (
          <NothingShown />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
