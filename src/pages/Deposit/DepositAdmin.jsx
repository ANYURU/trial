import { supabase } from "../../helpers/supabase";
import { useEffect, useState } from "react";
import { NothingShown, Spinner } from "../../components";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearch, MdInfo } from "react-icons/md";
import { Pagination } from "../../components";
import { FaEllipsisV } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import DepositModal from "../../components/Modals/DepositModal";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { MdDownload } from "react-icons/md";
import { generateReportFromJson } from "../../helpers/generateReportFromJson";

export default function DepositAdmin() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getApplications().catch((error) => console.log(error));
    const mySubscription = supabase
      .from("applications")
      .on("*", async (payload) => {
        await getApplications().catch((error) => console.log(error));
      })
      .subscribe();
    document.title = "Deposit Applications - Bweyogere tuberebumu";

    return () => supabase.removeSubscription(mySubscription);
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const [depositModal, setDepositModal] = useState(false);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  const getApplications = async () => {
    const {
      data: { applications, transactions },
      error,
    } = await supabase.rpc("fetch_member_deposits");

    if (error) {
      throw error;
    } else {
      let data = [];
      if (applications) data.push(...applications);
      if (transactions) data.push(...transactions);

      const sorted_data = data.sort(
        (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
      );
      setDeposits(sorted_data ?? null);
    }
  };

  const navigate = useNavigate();

  const handleDeposit = (depositID) => {
    navigate(`/deposit/members/${depositID}`);
  };

  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(null);
  const [filterName, setFilterName] = useState("");

  const approvedDeposits = deposits.filter(
    (deposit) => deposit?.transaction_meta
  );
  const pendingDeposits = deposits.filter(
    (deposit) => deposit?.application_meta
  );
  const rejectedDeposits = deposits.filter(
    (deposit) =>
      deposit?.reviewed &&
      deposit?.application_meta.review_status !== "approved"
  );

  const approved = Math.round(
    (approvedDeposits?.length / deposits.length) * 100
  );
  const pending = Math.round((pendingDeposits.length / deposits.length) * 100);
  const rejected = Math.round(
    (rejectedDeposits?.length / deposits.length) * 100
  );

  // let shownDeposits = deposits.slice(indexOfFirstPage, indexOfLastPage);

  let shownDeposits = deposits.filter((deposit) => {
    if (!account) {
      return deposit;
    } else {
      return (
        deposit?.transaction_meta?.account_type ||
        deposit?.application_meta?.account_type
      );
    }
  });

  shownDeposits = shownDeposits.filter((deposit) => {
    if (status === "") {
      return deposit;
    } else if (status === "pending") {
      return deposit?.application_meta?.review_status === "pending";
    } else if (status === "approved") {
      return deposit?.transaction_meta;
    } else if (status === "rejected") {
      return deposit?.application_meta?.review_status === "rejected";
    }
  });

  shownDeposits = shownDeposits.filter(
    (deposit) =>
      (
        deposit?.application_meta?.applicants_name ||
        deposit?.transaction_meta?.member_name
      )
        .toLowerCase()
        .indexOf(searchText.toLowerCase()) > -1
  );

  //context
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);
  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  shownDeposits = shownDeposits.slice(indexOfFirstPage, indexOfLastPage);

  const generate_deposits_report = () => {
    const formattedDeposits = deposits.map((deposit) => {
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
    generateReportFromJson(formattedDeposits, "Member Deposits");
  };

  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-between pb-3 mb-2 overflow-hidden md:h-[150px]">
        <h1 className="mb-3 mt-2 font-bold uppercase dark:text-white">
          Member Deposits
        </h1>

        <div className=" dark:text-secondary-text rounded">
          <div className="w-full h-7 rounded flex overflow-hidden">
            {deposits.length === 0 && (
              <>
                <div
                  className="animate-pulse h-7 inline-block bg-accent"
                  style={{ width: `100%` }}
                ></div>
              </>
            )}
            <div
              className="h-7 inline-block bg-green-400"
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
          <div className="flex justify-between px-2 items-center py-2">
            <div className="flex items-center gap-1 text-sm">
              <div className="w-2 h-2 bg-green-400 inline-block rounded-full"></div>{" "}
              Approved: {approvedDeposits.length} ({approved}%)
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div className="w-2 h-2 bg-yellow-400 inline-block rounded-full"></div>{" "}
              Pending: {pendingDeposits.length} ({pending}%)
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div className="w-2 h-2 bg-red-400 inline-block rounded-full"></div>{" "}
              Reject: {rejectedDeposits.length} ({rejected}%)
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex sm:flex-wrap gap-1 w-[70%]">
            <div className="flex justify-between searchInput">
              <input
                type="text"
                className="px-2 py-1 sm:py-1 dark:bg-dark-bg-600 dark:text-secondary-text"
                placeholder="Search by name..."
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
            <div className="flex flex-col w-56">
              <select
                name="status"
                id=""
                className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              >
                <option value="">Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col w-56">
              <select
                name="account"
                id=""
                className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                onChange={(event) => setAccount(event.target.value)}
              >
                <option value="">Account</option>
                <option value="savings">Savings</option>
                <option value="shares">Shares</option>
                <option value="mwana">Mwana</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div className="flex flex-col w-56">
              <input
                type="date"
                name="inputDate"
                onChange={(event) => setDate(event.target.value)}
                className="rounded inputDate dark:bg-dark-bg-600 dark:text-secondary-text"
              />
            </div>
          </div>
          <div className="flex w-[30%] mb-5 justify-end">
            <button
              className="bg-green-500 align-text-middle px-3 py-2 text-white font-bold rounded flex items-center"
              onClick={() => {
                // generate_member_loan_report()
                generate_deposits_report();
                console.log("here");
              }}
            >
              Export
              <MdDownload className="ml-1" />
            </button>
          </div>
        </div>

        {/* </div> */}
      </div>
      <div className="bg-white pb-6 overflow-hidden  relative  md:h-[calc(100%-170px)] dark:bg-dark-bg-700">
        {deposits !== null && shownDeposits.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th></th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shownDeposits.map((deposit, index) => (
                    <>
                      <tr
                        className={`${
                          index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                        } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                        key={index}
                        onClick={() => {
                          console.log(deposit);
                          setActiveIndex(index);
                          setDepositModal(true);
                        }}
                      >
                        <td>
                          <span className="ml-2 px-4 py-3 text-sm">&gt;</span>
                        </td>
                        <td className="px-6 py-3">
                          {deposit?.created_at
                            ? moment(deposit?.created_at).format("DD-MM-YYYY")
                            : "Unspecified"}
                        </td>
                        <td className="px-6 py-3">
                          {deposit?.app_id || deposit?.trans_id}
                        </td>
                        <td className="px-6 py-3">
                          {deposit?.application_meta?.applicants_name ||
                            deposit?.transaction_meta?.member_name}
                        </td>
                        <td className="px-6 py-3">
                          {deposit?.application_meta?.account_type ||
                            deposit?.transaction_meta.account_type}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(
                            deposit?.application_meta?.amount || deposit?.amount
                          )}
                        </td>

                        <td className={`px-6 py-3`}>
                          <span
                            className={` py-1 px-2 rounded-xl text-white ${
                              deposit?.transaction_meta
                                ? "bg-green-400"
                                : deposit.application_meta?.review_status ===
                                  "rejected"
                                ? "bg-red-400"
                                : "bg-yellow-400"
                            }`}
                          >
                            {deposit?.transaction_meta
                              ? "approved"
                              : deposit?.application_meta?.review_status ===
                                "rejected"
                              ? "Rejected"
                              : "Pending"}
                          </span>
                        </td>
                      </tr>
                      {depositModal && index === activeIndex && (
                        <DepositModal
                          deposit={deposit}
                          setDepositModal={setDepositModal}
                        />
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between md:absolute left-0 right-0 bottom-0 px-5 py-1">
              <Pagination
                pages={Math.ceil(deposits.length / withdrawPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={shownDeposits}
                depositsPerPage={withdrawPerPage}
                setDepositsPerPage={setWithdrawPerPage}
              />
            </div>
          </>
        ) : !loading > 0 ? (
          <NothingShown />
        ) : deposits.length < 1 ? (
          <Spinner />
        ) : (
          <NothingShown />
        )}
      </div>
    </div>
  );
}
