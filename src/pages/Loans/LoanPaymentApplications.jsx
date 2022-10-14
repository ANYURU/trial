import { supabase } from "../../helpers/supabase";
import { useEffect, useState, useParams } from "react";
import { Spinner, NothingShown } from "../../components";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components";
import { FaEllipsisV } from "react-icons/fa";
import { AiFillCheckSquare } from "react-icons/ai";
import { MdInfo } from "react-icons/md";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import LoanPayModal from "../../components/Modals/LoanPayModal";

export default function LoanPaymentApplications() {
  useEffect(() => {
    // getApplications();
    supabase
      .rpc("fetch_member_payments")
      .then(({ data: { applications, transactions }, error }) => {
        setLoading(false)
   


        if (error) {
          setLoading(false)
          throw error
        }
        else {
          let data = []
          if (applications) data.push(...applications)
          if (transactions) data.push(...transactions)
          setLoans(data ?? null)
          setLoading(false)
          console.log(data)
        }
      })
      .catch((error) => console.log(error));
    document.title = "Loan Applications - Bweyogere tuberebumu";
  });


  const [loans, setLoans] = useState([]);
  const [loanModal, setLoanModal] = useState(false);
  const [loading, setLoading] = useState(true)

  const getApplications = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "payment")
      .order("created_at", { ascending: false });
    setLoans(data ?? []);
  };

  const navigate = useNavigate();

  const handleDeposit = (id) => {
    navigate(`/loans/verify-payment/${id}`);
  };

  const handleLoanPayment = (loanPaymentId) => {
    navigate(`/loans/applications/${loanPaymentId}`);
  };

  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState(null);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  let shownLoans = !loans || loans.slice(indexOfFirstPage, indexOfLastPage);

  shownLoans =
    !loans ||
    shownLoans.filter(
      (deposit) =>
        !account || deposit?.application_meta.account_type === account
    ).length > 0
      ? shownLoans.filter(
          (deposit) =>
            !account || deposit?.application_meta.account_type === account
        )
      : null;

  shownLoans = shownLoans
    ? shownLoans.filter(
        (loan) =>
          !status ||
          (status === "pending"
            ? !loan.reviewed
            : status === "approved"
            ? loan.application_meta.review_status === "approved"
            : loan.reviewed &&
              loan.application_meta.review_status !== "approved")
      )
    : null;

  shownLoans = shownLoans
    ? shownLoans.filter(
        (loan) => !date || loan.created_at.substring(0, 10) === date
      ).length > 0
      ? shownLoans.filter(
          (loan) => !date || loan.created_at.substring(0, 10) === date
        )
      : null
    : null;

  shownLoans = shownLoans
    ? shownLoans.filter(
        (loan) =>
          !searchText ||
          loan?.application_meta.applicants_name
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1
      ).length > 0
      ? shownLoans.filter(
          (loan) =>
            !searchText ||
            loan?.application_meta.applicants_name
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1
        )
      : null
    : null;

  //context
  const [show, setShow] = useState(false);
  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    };
  }

  const [activeIndex, setActiveIndex] = useState(false);

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-between pb-3 md:h-[150px]">
        <h1 className="mb-2 mt-2 font-bold uppercase dark:text-white">
          Loan Payment Applications
        </h1>
        <div className="my-2 flex justify-between searchInput">
          <input
            type="text"
            className="px-2 py-2 sm:py-1 dark:bg-dark-bg-600 dark:text-secondary-text"
            placeholder="Search by name..."
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>

        <div className="flex my-1 justify-between gap-5">
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
              id=""
              placeholder="Old Password"
              className="rounded inputDate dark:bg-dark-bg-600 dark:text-secondary-text"
            />
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden  relative  md:h-[calc(100%-170px)] dark:bg-dark-bg-700">
        {loans !== null && shownLoans !== null && shownLoans.length > 0 ? (
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
                    <th className="px-6 py-4">Amount Paid</th>
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
                    >
                      {loanModal && activeIndex === index && (
                        <LoanPayModal
                          setLoanModal={setLoanModal}
                          loan={deposit}
                        />
                      )}
                      <td onClick={() => {
                        setActiveIndex(index)
                        setLoanModal(true)
                      }}><span className="ml-2 px-4 py-3 text-sm">&gt;</span></td>
                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setLoanModal(true)
                        }}
                      >
                        {moment(deposit.created_at).format("DD-MM-YYYY")}
                      </td>
                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setLoanModal(true)
                        }}
                      
                      >{deposit.app_id || deposit?.trans_id || deposit?.transaction_id}</td>
                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setLoanModal(true)
                        }}
                      >
                        {deposit?.application_meta?.applicants_name || deposit?.transaction_meta?.member_name}
                      </td>
                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setLoanModal(true)
                        }}
                      >
                        {deposit?.application_meta?.account_type || deposit?.transaction_meta?.account_type}
                      </td>
                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setLoanModal(true)
                        }}
                      >
                        {currencyFormatter(deposit?.application_meta?.amount || deposit?.amount)}
                      </td>

                      <td className="px-6 py-3"
                        onClick={() => {
                          setActiveIndex(index)
                          setLoanModal(true)
                        }}
                      >
                        <span className={` py-1 px-2 rounded-xl text-white ${
                          deposit?.application_meta?.review_status === "pending"
                          ? "bg-yellow-400"
                          : deposit?.application_meta?.review_status === "rejected" ?
                          "bg-red-400" 
                          : "bg-green-400"
                        }`}>
                          {deposit?.application_meta?.review_status || "approved"}
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
                            {
                              deposit?.application_meta && 
                              <li
                                className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
                                onClick={() => {
                                  handleDeposit(deposit.application_id);
                                }}
                              >
                                <AiFillCheckSquare /> Verify
                              </li>
                            }
                            <li
                              className="flex gap-1 justify-start items-center px-4 py-2 cursor-pointer mb-2 hover:bg-accent dark:hover:bg-dark-bg-600"
                              onClick={() => {
                                setLoanModal(true);
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
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between md:absolute left-0 right-0 bottom-0 px-5 py-1">
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
        ) : loans && loans.length > 0 ? (
          <NothingShown />
        ) : (
          loading ? <Spinner /> : <NothingShown />
        )}
      </div>
    </div>
  );
}
