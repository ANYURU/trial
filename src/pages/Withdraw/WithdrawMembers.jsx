import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Pagination from "../../components/Pagination";
import { Spinner } from "../../components";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import { NothingShown } from "../../components";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import WithdrawModal from "../../components/Modals/WithdrawModal2";
import { MdInfo } from "react-icons/md";

export default function WithdrawMembers() {
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(null);
  const [withdrawModal, setWithdrawModal] = useState(false);

  const navigate = useNavigate();

  const [withdraws, setWithraw] = useState([]);

  const handleWithdraw = (withdrawID) => {
    navigate(`/withdraw/members/${withdrawID}`);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const [show, setShow] = useState(false);

  const getApplications = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "withdraw")
      .order("created_at", { ascending: false });

    setWithraw(data);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  let filteredWithdraws = withdraws.filter((application) =>
    status === ""
      ? application
      : status === "pending"
      ? !application.reviewed
      : status === "approved"
      ? application.application_meta.review_status === status
      : application.reviewed &&
        application.application_meta.review_status !== "approved"
  );

  filteredWithdraws = filteredWithdraws.filter(
    (withdraw) =>
      withdraw.application_meta.applicants_name
        .toLowerCase()
        .indexOf(searchText.toLowerCase()) > -1
  );

  const approvedwithdraws = filteredWithdraws.filter(
    (deposit) => deposit.application_meta.review_status === "approved"
  );
  const pendingwithdraws = filteredWithdraws.filter(
    (deposit) => !deposit.reviewed
  );
  const rejectedwithdraws = filteredWithdraws.filter(
    (deposit) =>
      deposit.reviewed && deposit.application_meta.review_status !== "approved"
  );

  const approved =
    filteredWithdraws.length > 0
      ? Math.round((approvedwithdraws.length / filteredWithdraws.length) * 100)
      : 0;
  const pending =
    filteredWithdraws.length > 0
      ? Math.round((pendingwithdraws.length / filteredWithdraws.length) * 100)
      : 0;
  const rejected =
    filteredWithdraws.length > 0
      ? Math.round((rejectedwithdraws.length / filteredWithdraws.length) * 100)
      : 0;

  const shownWithdraw = filteredWithdraws.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const [activeIndex, setActiveIndex] = useState(false);

  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  console.log(withdraws);

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
        Members Withdraw
      </h1>

      <div className=" dark:text-secondary-text rounded">
        <div className="w-full h-7 rounded flex overflow-hidden">
          {filteredWithdraws.length === 0 && (
            <>
              <div
                className="animate-pulse h-7 inline-block bg-gray-300"
                style={{ width: `100%` }}
              ></div>
            </>
          )}
          <div
            className="h-7 inline-block bg-green-400 transition duration-300"
            style={{ width: `${approved}%` }}
          ></div>
          <div
            className="h-7 inline-block bg-yellow-400"
            style={{ width: `${pending}%` }}
          ></div>
          <div
            className="h-7 inline-block bg-red-400"
            style={{ width: `${rejected}%` }}
          ></div>
        </div>
        <div className={`flex justify-between px-2 items-center py-2`}>
          <div className="flex items-center gap-1 text-sm">
            <div className="w-2 h-2 bg-green-400 inline-block rounded-full"></div>
            <span className={`${status === "approved" && "font-bold"}`}>
              Approved: {approvedwithdraws.length} ({approved}%)
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <div className="w-2 h-2 bg-yellow-400 inline-block rounded-full"></div>
            <span className={`${status === "pending" && "font-bold"}`}>
              Pending: {pendingwithdraws.length} ({pending}%)
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <div className="w-2 h-2 bg-red-400 inline-block rounded-full"></div>
            <span className={`${status === "rejected" && "font-bold"}`}>
              Reject: {rejectedwithdraws.length} ({rejected}%)
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-5 m-1 mb-2">
        <div className=" flex justify-between searchInput">
          <input
            type="text"
            name=""
            id=""
            className="px-2 py-2 sm:py-1 dark:bg-dark-bg-700"
            placeholder="Search by name..."
            onChange={(event) => setSearchText(event.target.value)}
          />
          {/* <MdOutlineSearch className="search_icon" /> */}
        </div>
        <div className="flex flex-col w-56">
          <select
            name="status"
            id=""
            className="py-2 px-2 rounded bg-white dark:bg-dark-bg-700 dark:text-secondary-text"
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="flex flex-col w-56">
          <input
            type="date"
            name="inputDate"
            onChange={(event) => setDate(event.target.value)}
            id=""
            placeholder="Old Password"
            className=" rounded inputDate dark:bg-dark-bg-700 dark:text-secondary-text"
          />
        </div>
      </div>
      <div className="bg-white p-3 overflow-hidden  relative  md:h-[calc(100%-170px)] dark:bg-dark-bg-700">
        {filteredWithdraws.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="md:h-[calc(100%-100px)] overflow-y-none text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-800 uppercase  bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="flex gap-2">
                    <th className="w-48 py-4">Member</th>
                    <th className="w-40 py-4">Date</th>
                    <th className="w-48 py-4">Transactions ID</th>
                    <th className="w-40 py-4">Account</th>
                    <th className="w-48 py-4">Amount</th>
                    <th className="w-48 py-4">Cashout Method</th>
                    <th className="w-40 py-4">Status</th>
                    <th className="w-36 py-4">Action</th>
                  </tr>
                </thead>
                  <tbody>
                      {shownWithdraw.map((withdraw, index) => (
                        <tr
                          className={`${
                            index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                          } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer flex`}
                          key={index}
                        >
                          {withdrawModal && index === activeIndex && (
                            <WithdrawModal
                              withdraw={withdraw}
                              setWithdrawModal={setWithdrawModal}
                            />
                          )}
                          <td className="w-48 py-4">
                            {withdraw.application_meta.applicants_name}
                          </td>
                          <td className="w-40 py-4">
                            {moment(withdraw.created_at).format("DD-MM-YYYY")}
                          </td>
                          <td className=" py-4 overflow-hidden w-48">
                            {withdraw.application_id}
                          </td>
                          <td className="w-40 py-4">
                            {withdraw.application_meta.account_type}
                          </td>
                          <td className="w-48 py-4">
                            {currencyFormatter(
                              withdraw.application_meta.amount
                            )}
                          </td>
                          <td className="w-48 py-4">
                            {withdraw.application_meta.cashout_method}
                          </td>
                          <td className={`w-40 py-4`}>
                            <span
                              className={` py-1 px-2 rounded-xl text-white ${
                                withdraw.reviewed
                                  ? withdraw.application_meta.review_status ===
                                    "approved"
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                  : "bg-yellow-400"
                              }`}
                            >
                              {withdraw.reviewed
                                ? withdraw.application_meta.review_status ===
                                  "approved"
                                  ? "Approved"
                                  : "Rejected"
                                : "Pending"}
                            </span>
                          </td>

                          <td className="w-36 py-4">
                            <div className="relative">
                              <button
                                className="block p-2 rounded-md dialog cursor-context-menu"
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
                                  className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer hover:bg-accent dark:hover:bg-dark-bg-600"
                                  onClick={() => {
                                    setWithdrawModal(true);
                                  }}
                                >
                                  <MdInfo /> Details
                                </li>
                                <li
                                  className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer hover:bg-accent dark:hover:bg-dark-bg-600"
                                  onClick={() => {
                                    handleWithdraw(withdraw.application_id);
                                  }}
                                >
                                  <AiFillCheckSquare /> Verify
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
              </table>
            </div>
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between md:absolute left-0 right-0 bottom-0 px-5 py-1">
              <Pagination
                pages={Math.ceil(withdraws.length / withdrawPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={
                  status === ""
                    ? withdraws
                    : status === "approved"
                    ? approvedwithdraws
                    : status === "pending"
                    ? pendingwithdraws
                    : rejectedwithdraws
                }
                depositsPerPage={withdrawPerPage}
                setDepositsPerPage={setWithdrawPerPage}
              />
            </div>
          </>
        ) : withdraws.length === 0 && withdraws !== null ? (
          <Spinner />
        ) : (
          <NothingShown />
        )}
      </div>
    </div>
  );
}
