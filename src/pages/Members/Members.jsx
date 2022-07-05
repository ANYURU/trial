import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { ContextMenu } from "../../components";
import { MemberModal } from "../../components";
import { Pagination } from "../../components";
import { ConfirmModal } from "../../components";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { Spinner, NothingShown } from "../../components";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom"

export default function Members() {
  useEffect(() => {
    // Fetch members on component render
    fetch_members().catch( error => console.log(error))

    // Realtime
    const mySubscription = supabase
      .from('new_members')
      .on('*', async payload => {
        console.log(payload)
        await fetch_members().catch(error => console.log(error))
      })
      .subscribe()

    return () => supabase.removeSubscription(mySubscription)
  }, [])

  const fetch_members = async () => {
    const { data, error } = await supabase.rpc("fetch_members")
    if( error ) throw error
    if( data ) { 
      console.log( data )
      const dataArray = data.filter( member => member.roles && member.roles.includes('member') )
      dataArray.length === 0 ? setMembers( null ) : setMembers( dataArray )
    }
  }

  

  const [ members, setMembers ] = useState([])
  const [ date, setDate ] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()


  const [ status, setStatus ] = useState(null)
  const [ activeIndex, setActiveIndex ] = useState(null)
  const [ show, setShow ] = useState(false)

  const [memberModal, setMemberModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [suspendModal, setSuspendModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  const filteredMembers =
    !members ||
    members
      .filter(
        (member) =>
          !member?.fullname ||
          member?.fullname.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
      .filter((member) => !status || member.member_status === status)
      .filter(
        (member) =>
          !date ||
          !member?.member_meta ||
          member.member_meta.approved_at.substring(0, 10) === date
      );

  const shownMembers =
    members && filteredMembers.slice(indexOfFirstPage, indexOfLastPage);

  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  // console.log(members);

  return (
    <div className="mx-5 my-2 md:h-[calc(100vh-70px)]">
      <Helmet>
        <title>Members - Bweyogere tuberebumu</title>
      </Helmet>
      <div className="flex flex-col justify-between pb-3 md:h-[150px]">
        <h1 className="mb-3 mt-2 font-bold uppercase dark:text-white">
          Members
        </h1>
        <div className=" flex justify-between px-1">
          <input
            type="text"
            className="w-8/12 rounded-md px-2 py-2 sm:py-1 dark:bg-dark-bg-600"
            placeholder="Search"
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button
            className=" px-4 bg-primary py-2 text-white rounded-md flex justify-center items-center"
            onClick={() => {
              navigate('/application', { state: { from: location.pathname }} )
            }}
          >
            {/* <MdAdd />  */}
            Add Member
          </button>
        </div>

        <div className="flex justify-between my-3 m-1">
          <div className="flex flex-col w-56 mr-1">
            <select
              name="status"
              className="py-2 px-2 rounded bg-white dark:bg-dark-bg-700 dark:text-secondary-text"
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="dormant">Dormant</option>
            </select>
          </div>
          <div className="flex flex-col w-56 ml-1 dark:text-secondary-text">
            <input
              type="date"
              onChange={(event) => setDate(event.target.value)}
              className=" rounded px-2 py-2 dark:bg-dark-bg-700"
            />
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden  relative  md:h-[calc(100%-170px)] dark:bg-dark-bg-700">
        {members && members.length > 0 ? (
          <>
            <div className="w-full pb-3 overflow-x-auto h-full  relative overflow-y-auto ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4 whitespace-nowrap">
                      Phone Number
                    </th>
                    <th className="px-6 py-4">Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shownMembers.map((member, index) => (
                    <tr
                      className={`${
                        index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                      } hover:bg-gray-100 dark:hover:bg-dark-bg-600`}
                      key={index}
                    >
                      {memberModal && activeIndex === index && (
                        <MemberModal
                          member={activeIndex === index && member}
                          setMemberModal={setMemberModal}
                          memberModal={memberModal}
                        />
                      )}

                      {deleteModal && activeIndex === index && (
                        <ConfirmModal setPopUp={setDeleteModal}>
                          <h1 className="font-bold">
                            Are you sure you want to delete{" "}
                            {member.fullname.toUpperCase()}?
                          </h1>
                          <p>
                            If you terminate this account, you can't recover it.
                          </p>
                          <div className="flex justify-end gap-3 mt-3">
                            <button
                              className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
                              onClick={() => setDeleteModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-accent-red px-3 py-1 outline outline-1  rounded-md text-white"
                              onClick={() => setDeleteModal(false)}
                            >
                              Delete
                            </button>
                          </div>
                        </ConfirmModal>
                      )}
                      {suspendModal && activeIndex === index && (
                        <ConfirmModal setPopUp={setSuspendModal}>
                          <h1 className="font-bold">
                            Are you sure you want to suspend{" "}
                            {member.fullname.toUpperCase()}?
                          </h1>
                          <p>
                            If you supsend this account, the owner won't be able
                            to use it until you unsuspend.
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
                                  .eq("id", member.id);
                                setSuspendModal(false);
                              }}
                            >
                              Suspend
                            </button>
                          </div>
                        </ConfirmModal>
                      )}
                      <td className="px-6 py-3">{member.fullname}</td>
                      <td className="px-6 py-3">{member.id}</td>
                      <td className="px-6 py-3">{member.phone_number}</td>

                      <td className={`px-6 py-3 font-semibold`}>
                        <span
                          className={` py-1 px-2 rounded-xl text-white ${
                            member.member_status === "active"
                              ? "bg-emerald-600"
                              : "bg-rose-600"
                          }`}
                        >
                          {member.member_status}
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
                          <ContextMenu
                            activeIndex={activeIndex}
                            show={show}
                            index={index}
                            setShow={setShow}
                            setMemberModal={setMemberModal}
                            setDeleteModal={setDeleteModal}
                            setSuspendModal={setSuspendModal}
                            member={activeIndex === index ? member : null}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between md:absolute left-0 right-0 bottom-0 px-5 py-1">
              <Pagination
                pages={Math.ceil(filteredMembers.length / withdrawPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={filteredMembers}
                depositsPerPage={withdrawPerPage}
                setDepositsPerPage={setWithdrawPerPage}
              />
            </div>
          </>
        ) : members === null ? (
          <NothingShown />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
