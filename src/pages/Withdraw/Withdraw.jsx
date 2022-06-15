import { depositHistory } from "../../helpers/mockData";
import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { filterByStatus } from "../../helpers/utilites";
import { Pagination } from "../../components";
import { FaEllipsisV } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

export default function Withdrawy() {
  useEffect(() => {
    document.title = "Withdraw - Bweyogere tuberebumu";
    getApplications();
  }, []);

  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [filterName, setFilterName] = useState("");

  let loans = filterByStatus(depositHistory, "status", status);

  const [show, setShow] = useState(false);

  loans = filterByStatus(loans, "account", account);

  const [withdraw, setWithraw] = useState([]);

  const getApplications = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "withdraw")
      .order("created_at", { ascending: false })
      .range(indexOfFirstPage, indexOfLastPage);

    setWithraw(data);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  const shownWithdraw = loans.slice(indexOfFirstPage, indexOfLastPage);

  const [activeIndex, setActiveIndex] = useState(false);

  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-between pb-3 h-[110px]">
        <h1 className="mb-3 mt-2 font-bold uppercase dark:text-white">
          My Withdraws
        </h1>
        <div className="flex justify-between my-3 gap-5">
          <div className="flex flex-col w-56">
            <select
              name="status"
              id=""
              className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => {
                setFilterName(event.target.name);
                setStatus(event.target.value);
              }}
            >
              <option value="">Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex flex-col w-56">
            <select
              name="account"
              id=""
              className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => {
                setFilterName(event.target.name);
                setStatus(event.target.value);
              }}
            >
              <option value="">Account</option>
              <option value="Savings">Savings</option>
              <option value="Shares">Shares</option>
              <option value="Mwana">Mwana</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
          <div className="flex flex-col w-56">
            <input
              type="date"
              name=""
              id=""
              placeholder="Old Password"
              className="rounded px-2 py-2 dark:bg-dark-bg-600 dark:text-secondary-text"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 overflow-hidden  relative  h-[calc(100%-120px)] dark:bg-dark-bg-700">
        <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
          <table className="w-full h-6 text-sm text-left text-gray-500 dark:text-gray-400 mb-5">
            <thead className="text-xs text-gray-800 uppercase  bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Account</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Cashout Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {shownWithdraw.map((loan, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                  } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                  key={index}
                >
                  <td className="px-6 py-3">{loan.date}</td>
                  <td className="px-6 py-3">{loan.transactionId}</td>
                  <td className="px-6 py-3">{loan.account}</td>
                  <td className="px-6 py-3">{loan.amount}</td>
                  <td className="px-6 py-3">{loan.depositMethod}</td>

                  <td className="px-6 py-3">
                    <span
                      className={` py-1 px-2 rounded-xl text-white ${
                        loan.status === "Approved"
                          ? "bg-green-400"
                          : loan.status === "Rejected"
                          ? "bg-red-400"
                          : "bg-yellow-400"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  <td className="px-6 py-3">
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
                          onClick={() => {
                            // setLoanModal(true)
                          }}
                        >
                          <MdInfo /> Details
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex bg-white dark:bg-dark-bg-700 justify-between absolute left-0 right-0 bottom-0 px-5 py-1">
          <Pagination
            pages={Math.ceil(loans.length / withdrawPerPage)}
            setCurrentPage={setCurrentPage}
            indexOfFirstPage={indexOfFirstPage}
            indexOfLastPage={indexOfLastPage}
            data={loans}
            depositsPerPage={withdrawPerPage}
            setDepositsPerPage={setWithdrawPerPage}
          />
        </div>
      </div>
    </div>
  );
}
