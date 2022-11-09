import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { Spinner } from "../../components";
import { NothingShown } from "../../components";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import WithdrawModal from "../../components/Modals/WithdrawModal2";
import { generateReportFromJson } from "../../helpers/generateReportFromJson";
import { MdDownload } from "react-icons/md";

export default function WithdrawMembers() {
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(null);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    getApplications().catch((error) => console.log(error));

    const mySubscription = supabase
      .from("applications")
      .on("*", async (payload) => {
        await getApplications().catch((error) => console.log(error));
      })
      .subscribe();

    supabase
      .from("transactions")
      .on("*", async (payload) => {
        await getApplications().catch((error) => console.log(error));
      })
      .subscribe();

    return () => supabase.removeSubscription(mySubscription);
  }, []);

  const getApplications = async () => {
    const {
      data: { transactions, applications },
      error,
    } = await supabase.rpc("fetch_member_withdraws");
    if (error) {
      setLoading(false);
      throw error;
    } else {
      let data = [];
      if (applications) data.push(...applications);
      if (transactions) data.push(...transactions);

      const sorted_data = data.sort(
        (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
      );
      setWithdraws(sorted_data ?? null);
      setLoading(false);
    }
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  let filteredWithdraws =
    withdraws &&
    withdraws.filter((application) => {
      if (status === "") {
        return application;
      } else if (status === "pending") {
        return application?.application_meta?.review_status === "pending";
      } else if (status === "approved") {
        return application?.transaction_meta;
      } else if (status === "rejected") {
        return application?.application_meta?.review_status === "rejected";
      }
    });

  filteredWithdraws = filteredWithdraws.filter(
    (withdraw) =>
      (
        withdraw?.application_meta?.applicants_name ||
        withdraw?.transaction_meta?.member_name ||
        withdraw?.trans_id
      )
        .toLowerCase()
        .indexOf(searchText.toLowerCase()) > -1
  );

  const approvedwithdraws = filteredWithdraws.filter(
    (deposit) => deposit?.transaction_meta
  );
  const pendingwithdraws = filteredWithdraws.filter(
    (deposit) => deposit?.application_meta?.review_status === "pending"
  );
  const rejectedwithdraws = filteredWithdraws.filter(
    (deposit) =>
      deposit.reviewed && deposit.application_meta?.review_status === "rejected"
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

  const generate_withdraw_report = () => {
    const formattedDeposits = withdraws.map((deposit) => {
      return {
        "Member Name": deposit?.transaction_meta
          ? deposit?.transaction_meta?.member_name
          : deposit?.application_meta?.applicants_name,
        "Transaction ID": deposit?.application_meta
          ? deposit.app_id
          : deposit?.trans_id,
        Date: deposit?.created_at,
        Amount: deposit?.transaction_meta
          ? deposit?.amount
          : deposit?.application_meta?.amount,
        Account: deposit?.transaction_meta
          ? deposit?.transaction_meta?.account_type
          : deposit?.application_meta?.account_type,
        "Approved At": deposit?.transaction_meta
          ? deposit?.transaction_meta?.approved_at
          : "",
        Status: deposit?.transaction_meta
          ? "approved"
          : deposit?.application_meta?.review_status,
        "Approved By": deposit?.transaction_meta
          ? deposit?.transaction_meta?.approved_by
          : "",
      };
    });

    console.log(formattedDeposits);
    generateReportFromJson(formattedDeposits, "Member Withdraws");
  };

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-140px)]">
      <div className="flex flex-col justify-between pb-3 md:h-[110px]">
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
      <div className="flex justify-end mb-3 mt-3">
        <button
          className="bg-green-500 align-text-middle px-3 py-2 text-white font-bold rounded flex items-center"
          onClick={() => {
            generate_withdraw_report();
            console.log("here");
          }}
        >
          Export
          <MdDownload className="ml-1" />
        </button>
      </div>
      <div className="bg-white overflow-hidden  relative  md:h-[calc(100%-170px)] dark:bg-dark-bg-700">
        {filteredWithdraws.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full h-6 text-sm text-left text-gray-500 dark:text-gray-400 mb-5">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th></th>
                    <th className="px-6 py-4">Member</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Transactions ID</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Cashout Method</th>
                    <th className="px-6 py-4">Status</th>
                    {/* <th className="px-6 py-4">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {shownWithdraw.map((withdraw, index) => {
                    return (
                      <>
                        <tr
                          className={`${
                            index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                          } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                          key={index}
                          onClick={() => {
                            setActiveIndex(index);
                            setWithdrawModal(true);
                          }}
                        >
                          <td>
                            <span className="ml-2 px-4 py-3 text-sm">&gt;</span>
                          </td>
                          <td className="px-6 py-3">
                            {withdraw?.application_meta?.applicants_name ||
                              withdraw?.transaction_meta?.member_name}
                          </td>
                          <td className="px-6 py-3">
                            {moment(withdraw.created_at).format("DD-MM-YYYY")}
                          </td>
                          <td className="px-6 py-3">
                            {withdraw?.app_id || withdraw?.trans_id}
                          </td>
                          <td className="px-6 py-3">
                            {withdraw.application_meta?.account_type ||
                              withdraw?.transaction_meta?.account_type}
                          </td>
                          <td className="px-6 py-3">
                            {currencyFormatter(
                              withdraw?.application_meta?.amount ||
                                withdraw?.amount
                            )}
                          </td>
                          <td className="px-6 py-3">
                            {withdraw?.application_meta?.cashout_method ||
                              withdraw?.transaction_meta?.cashout_method ||
                              "Unknown"}
                          </td>
                          <td className={`px-6 py-3`}>
                            <span
                              className={` py-1 px-2 rounded-xl text-white ${
                                withdraw.transaction_meta
                                  ? "bg-green-400"
                                  : withdraw.application_meta?.review_status ===
                                    "rejected"
                                  ? "bg-red-400"
                                  : "bg-yellow-400"
                              }`}
                            >
                              {withdraw.transaction_meta
                                ? "Approved"
                                : withdraw.application_meta?.review_status ===
                                  "rejected"
                                ? "Rejected"
                                : "Pending"}
                            </span>
                          </td>

                          {/* <td className="px-6 py-3">
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
                                {
                                  withdraw?.application_meta &&
                                  <li
                                    className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer hover:bg-accent dark:hover:bg-dark-bg-600"
                                    onClick={() => {
                                      handleWithdraw(withdraw.application_id);
                                    }}
                                  >
                                    <AiFillCheckSquare /> Verify
                                  </li>
                                }
                              </ul>
                            </div>
                          </td> */}
                        </tr>
                        {withdrawModal && index === activeIndex && (
                          <WithdrawModal
                            withdraw={withdraw}
                            setWithdrawModal={setWithdrawModal}
                          />
                        )}
                      </>
                    );
                  })}
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
        ) : loading ? (
          <Spinner />
        ) : (
          <NothingShown />
        )}
      </div>
    </div>
  );
}
