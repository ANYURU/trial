import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { Spinner, NothingShown } from "../../components";
import { date } from "yup";

export default function Members() {
  useEffect(() => {
    getMembers();
    document.title = "Admins - Bweyogere tuberebumu";
  }, []);

  const [admins, setAdmins] = useState([]);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  const getMembers = async () => {
    const { error, data } = await supabase.from("_member_profiles").select();
    console.log(data)

    const dataArray = data.filter((member) => member.roles && member?.roles.includes("admin"));
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

  return (
    <div className="mx-2 md:mx-5 md:mt-2 h-[calc(100vh-70px)] flex flex-col">
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
                      <td className="px-6 py-3">{admin.fullname}</td>
                      <td className="px-6 py-3">{admin.id}</td>
                      <td className="px-6 py-3">{admin.phone_number}</td>

                      <td className={`px-6 py-3`}>
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
                          {/* <ContextMenu
                            activeIndex={activeIndex}
                            show={show}
                            index={index}
                            setShow={setShow}
                            setMemberModal={setMemberModal}
                            deleteModal={deleteModal}
                            setDeleteModal={setDeleteModal}
                            member={activeIndex === index ? member : null}
                          /> */}
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
