import { supabase } from "../../helpers/supabase";
import { useEffect, useState, useParams } from "react";
import { Spinner } from "../../components";
import { useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { Pagination } from "../../components";
import { FaEllipsisV } from "react-icons/fa";

export default function LoanPaymentApplications() {
  useEffect(() => {
    getApplications();
    document.title = "Loan Applications - Bweyogere tuberebumu";
  });

  const [loans, setLoans] = useState([]);

  const getApplications = async () => {
    const { error, data } = await supabase
      // .from("applications")
      .from("application")
      .select()
      // .eq("_type", "payment")
      .order("created_at", { ascending: false });
    setLoans(data);
  };

  const navigate = useNavigate();

  const handleDeposit = (depositID) => {
    navigate(`/loans/members/${depositID}`);
  };

  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(null);
  const [filterName, setFilterName] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  let shownLoans = loans || loans.slice(indexOfFirstPage, indexOfLastPage);

  // const filteredLoans = loans.filter(member => member.fullname.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

  console.log(loans)

  shownLoans = !loans || shownLoans
    .filter(
      (deposit) =>
        !account || deposit?.application_meta.account_type === account
    )
    .filter(
      (loan) =>
        !status ||
        (status === "pending"
          ? !loan.reviewed
          : status === "approved"
          ? loan.application_meta.review_status === "approved"
          : loan.reviewed && loan.application_meta.review_status !== "approved")
    );

  //context
  const [show, setShow] = useState(false);
  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  return (
    <div className="h-full">
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
        Loan Payment Applications
      </h1>
      <div className="my-2 flex justify-between searchInput">
        <input
          type="text"
          className="px-2 py-2 sm:py-1 dark:bg-dark-bg-600 dark:text-secondary-text"
          placeholder="Search by name..."
          onChange={(event) => setSearchText(event.target.value)}
        />
        <MdOutlineSearch className="search_icon" />
      </div>

      <div className="flex my-1 justify-between gap-5">
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
            id=""
            placeholder="Old Password"
            className="rounded inputDate dark:bg-dark-bg-600 dark:text-secondary-text"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-dark-bg-700 p-6 min-h-full">
        {loans !== null && loans.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shownLoans.map((deposit, index) => (
                    <tr
                      className={`cursor-pointer ${
                        index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                      } hover:bg-gray-100 dark:hover:bg-dark-bg-600`}
                      key={index}
                      onClick={() => handleDeposit(deposit.application_id)}
                    >
                      <td className="px-6 py-3">
                        {
                          new Date(deposit.created_at)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>
                      <td className="px-6 py-3">{deposit.application_id}</td>
                      <td className="px-6 py-3">
                        {deposit?.application_meta.applicants_name}
                      </td>
                      <td className="px-6 py-3">
                        {deposit?.application_meta.account_type}
                      </td>
                      <td className="px-6 py-3">
                        {deposit?.application_meta.amount}
                      </td>

                      <td className={`px-6 py-3`}>
                        <span
                          className={` py-1 px-2 rounded-xl text-white ${
                            deposit.reviewed
                              ? deposit.application_meta.review_status ===
                                "approved"
                                ? "bg-green-400"
                                : "bg-red-400"
                              : "bg-yellow-400"
                          }`}
                        >
                          {deposit.reviewed
                            ? deposit.application_meta.review_status ===
                              "approved"
                              ? "Approved"
                              : "Rejected"
                            : "Pending"}
                        </span>
                      </td>

                      <td className="px-6 py-3">
                        <div className="relative">
                          <button
                            className="block p-2 rounded-md dialog"
                            onClick={(event) => {
                              // setActiveIndex(index)
                              setShow(!show);
                              event.stopPropagation();
                            }}
                          >
                            <FaEllipsisV />
                          </button>
                          {/* <LoansContext activeIndex={activeIndex} show={show} index={index} setShow={setShow} member={activeIndex === index ? loan : null} id={loan.ID} setLoanModal={setLoanModal} /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between px-6 my-5">
              <Pagination
                pages={Math.ceil(loans.length / withdrawPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={loans}
                loansPerPage={withdrawPerPage}
                setLoansPerPage={setWithdrawPerPage}
              />
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
