import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { searchByName2 } from "../../helpers/utilites";
import { supabase } from "../../helpers/supabase";
import { Pagination } from "../../components";
import { ContextMenu } from "../../components";
import { MemberModal } from "../../components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Spinner, NothingShown } from "../../components";

export default function Applications() {
  useEffect(() => {
    // getApplications()
    supabase.rpc("fetch_membership_applications")
      .then(({data, error}) => {
        if ( error ) throw error
        if ( data ) {
          setApplications(data)
        }
      })
      .catch(error => console.log(error))
    document.title = "Membership Application - Bweyogere tuberebumu"
  }, [])

  const [applications, setApplications] = useState([]);
  const [date, setDate] = useState(null);
  const [searchText, setSearchText] = useState("")
  const {1: profile } = useOutletContext()

  const navigate = useNavigate();

  const [ status, setStatus ] = useState("")
  const approvedMembers = applications.filter(application => application.application_meta.review_status)
  const pendingMembers = applications.filter(application => !application.reviewed)
  const rejectedMembers = applications.length - (approvedMembers.length + pendingMembers.length)

  const getApplications = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "membership")
      .order("created_at", { ascending: false });
    setApplications(data);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage, setApplicationsPerPage] = useState(10);
  const indexOfLastPage = currentPage * applicationsPerPage;
  const indexOfFirstPage = indexOfLastPage - applicationsPerPage;

  const filteredApplications = applications.filter((application) =>
    status === ""
      ? application
      : status === "pending"
      ? !application.reviewed
      : status === "approved"
      ? application.application_meta.review_status === status
      : application.reviewed &&
        application.application_meta.review_status !== "approved"
  ).filter(application => !date || application.created_at.substring(0, 10) === date).filter(member => member.application_meta.applicants_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

  const shownApplications = filteredApplications.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  

  //content
  const [activeIndex, setActiveIndex] = useState(null);
  const [memberModal, setMemberModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [show, setShow] = useState(false);
  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-between pb-3 mb-3 h-[150px]">
        <h1 className="mb-3 mt-2 font-bold uppercase dark:text-white">
          Membership Applications
        </h1>
        <div className="flex justify-between my-1">
          <div className="bg-green-400 w-4/12 flex flex-col justify-center items-center py-1 border-l-8 border-green-800">
            <h1 className="text-lg font-bold">{approvedMembers.length}</h1>
            <p className="uppercase">Approved</p>
          </div>
          <div className="bg-yellow-400 w-4/12 flex flex-col justify-center items-center py-1 border-l-8 border-yellow-600">
            <h1 className="text-lg font-bold">{pendingMembers.length}</h1>
            <p className="uppercase">Pending</p>
          </div>
          <div className="bg-red-400 w-4/12 flex flex-col justify-center items-center py-1 border-l-8 border-red-800">
            <h1 className="text-lg font-bold">{rejectedMembers}</h1>
            <p className="uppercase">Rejected</p>
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="my-2 flex justify-between px-1">
            <input
              type="text"
              name=""
              id=""
              className="w-8/12 rounded-md px-2 py-2 sm:py-1 focus:outline-none focus:ring focus:ring-primary dark:bg-dark-bg-700"
              placeholder="Search"
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
          <div className="flex flex-col w-56">
            <select
              name="status"
              id=""
              className="py-2 px-2 rounded bg-white dark:bg-dark-bg-700 dark:text-secondary-text"
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Status</option>
              <option value={"approved"}>Approved</option>
              <option value={"pending"}>Pending</option>
              <option value={"rejected"}>Rejected</option>
            </select>
          </div>

          <div className="flex flex-col w-56">
            <input
              type="date"
              onChange={(event) => setDate(event.target.value)}
              className=" rounded px-2 py-2 dark:text-secondary-text"
            />
          </div>
        </div>
      </div>
      <div className="bg-white overflow-hidden  relative  h-[calc(100%-170px)] dark:bg-dark-bg-700">
        {shownApplications.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-5">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Member's Name</th>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shownApplications.map(
                    (application, index) => (
                      <tr
                        className={`${
                          index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                        } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                        key={index}
                        onClick={() =>
                          navigate(
                            `/members/applications/${application.application_id}`
                          )
                        }
                      >
                        {memberModal && activeIndex === index && (
                          <MemberModal
                            member={activeIndex === index && application}
                            setMemberModal={setMemberModal}
                          />
                        )}
                        <td className="px-6 py-3">
                          {application.created_at.substring(0, 10)}
                        </td>
                        <td className="px-6 py-3">
                          {application.application_meta.applicants_name}
                        </td>
                        <td className="px-6 py-3">
                          {application.application_id}
                        </td>
                        <td className="px-6 py-3">
                          {
                            application.application_meta
                              .proposed_monthly_contributions
                          }
                        </td>

                        <td className={`px-6 py-3`}>
                          <span
                            className={` py-1 px-2 rounded-xl text-white ${
                              application.reviewed
                                ? application.application_meta.review_status ===
                                  "approved"
                                  ? "bg-green-400"
                                  : "bg-red-400"
                                : "bg-yellow-400"
                            }`}
                          >
                            {application.reviewed
                              ? application.application_meta.review_status ===
                                "approved"
                                ? "Approved"
                                : "Rejected"
                              : "Pending"}
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
                            deleteModal={deleteModal}
                            setDeleteModal={setDeleteModal}
                            member={activeIndex === index ? application : null}
                            profile={profile}
                          />
                        </div>
                      </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between absolute left-0 right-0 bottom-0 px-5 py-1">
              <Pagination
                pages={Math.ceil(
                  filteredApplications.length / applicationsPerPage
                )}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={filteredApplications}
                depositsPerPage={applicationsPerPage}
                setDepositsPerPage={setApplicationsPerPage}
              />
            </div>
          </>
        ) : applications && applications.length > 0 ? (
          <NothingShown />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
