import { Pagination } from "../../components";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";
import { FaEllipsisV } from "react-icons/fa";
import { LoansContext } from "../../components";
import { LoanModal } from "../../components";
import moment from "moment";
import { Spinner, NothingShown } from "../../components";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function MemberLoans() {
  
  const [ { id }, profile, setProfile, roles] = useOutletContext()
  const navigate = useNavigate()  

  useEffect(() => {
    fetch_member_loans().catch(error => console.log(error))

  
    // Realtime.
    const mySubscription = supabase
    .from('loans')
    .on('*', async ( payload ) => {
      console.log(payload)
      await fetch_member_loans().catch(error => console.log(error))
    })
    .subscribe()
    
    // CleanUp.
    return () => supabase.removeSubscription(mySubscription)
  }, [])

  const [searchText, setSearchText] = useState("");

  const [loans, setLoans] = useState([]);
  const [loanModal, setLoanModal] = useState(false);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(null);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [loansPerPage, setLoansPerPage] = useState(10);
  const indexOfLastPage = currentPage * loansPerPage;
  const indexOfFirstPage = indexOfLastPage - loansPerPage;

  let shownloans = !loans || loans.slice(indexOfFirstPage, indexOfLastPage);

  shownloans =
    shownloans?.length && shownloans.filter((loan) => !status || loan.loan_status === status).length >
    0
      ? shownloans.filter((loan) => !status || loan.loan_status === status)
      : null;

  shownloans = shownloans
    ? shownloans.filter(
        (loan) => !date || loan.created_at.substring(0, 10) === date
      ).length > 0
      ? shownloans.filter(
          (loan) => !date || loan.created_at.substring(0, 10) === date
        )
      : null
    : null;

  shownloans = shownloans
    ? shownloans.filter(
        (loan) =>
          !searchText ||
          loan?.loan_meta.applicants_name
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) > -1
      ).length > 0
      ? shownloans.filter(
          (loan) =>
            !searchText ||
            loan?.loan_meta.applicants_name
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1
        )
      : null
    : null;


  const [activeIndex, setActiveIndex] = useState(null);
  const [show, setShow] = useState(false);
  if (show === true) {
    window.onclick = function (event) {
      if (!event.target.matches(".dialog")) {
        setShow(false);
      }
    }
  }

  const fetch_member_loans = async () => {
    const { data, error } = await supabase.rpc("fetch_member_loans")
    if ( error ) throw error 
    setLoans(data)
    // const { data, error } = await supabase
    //   .from('loans')
    //   .select()
    //   .order('created_at', {ascending:false})
    //   .not('member_id', 'eq', id)


    //   console.log(loan)
    //   // console.log(supabase.auth.user().id)
    //   if (error ) throw error
    //   console.log(data)
    //   setLoans(data)

    console.log("here are the member loans")
  }

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">

      <div className="flex flex-col justify-between pb-3 md:h-[110px]">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Member's Loans
        </h1>

        <div className="flex my-1 justify-between gap-5">
          <div className=" flex justify-between searchInput">
            <input
              type="text"
              className="px-2 py-2 sm:py-1 dark:bg-dark-bg-600 dark:text-secondary-text"
              placeholder="Search by name..."
              onChange={(event) => setSearchText(event.target.value)}
            />
            {/* <MdOutlineSearch className="search_icon" /> */}
          </div>
          <div className="flex flex-col w-56">
            <select
              name="status"
              id=""
              className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="due">Due</option>
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

      <div className="bg-white overflow-hidden  relative  md:h-[calc(100%-120px)] dark:bg-dark-bg-700">
        {loans !== null && shownloans !== null && shownloans.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th className=""></th>
                    <th className="pr-4 py-4">Date</th>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Amount to Pay</th>
                    <th className="px-6 py-4">Amount Paid</th>
                    <th className="px-6 py-4">Principal</th>
                    <th className="px-6 py-4">Interest Rate(%)</th>
                    <th className="px-6 py-4">Status</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {shownloans.map(({loan, payments}, index) => (
                    <>
                      <tr
                        className={`${
                          index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                        } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                        key={index}
                        onClick={() => {
                          setLoanModal(true)
                          setActiveIndex(index)
                        }}
                      >
                        {/* {loanModal && activeIndex === index && (
                          <LoanModal setLoanModal={setLoanModal} loan={loan} />
                        )} */}
                        <td><span className="ml-2 px-4 py-3 text-sm">&gt;</span></td>
                        <td className="pr-4 py-3">
                          {moment(loan.created_at).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-3">{loan.loan_id}</td>
                        <td className="px-6 py-3">
                          {loan.loan_meta.applicants_name}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(
                            loan.amount_issued + 0.05 * loan.amount_issued
                          )}
                        </td>
                        <td className="px-6 py-3">{loan.amount_paid}</td>
                        <td className="px-6 py-3">
                          {currencyFormatter(loan.amount_issued)}
                        </td>
                        <td className="px-6 py-3">{loan.interest_rate}</td>
                        <td className={`px-6 py-3`}>
                        <span
                          className={` py-1 px-2 rounded-xl text-white ${
                            loan.loan_status === "pending"
                            ? "bg-yellow-400"
                            : loan.loan_status === "cleared"
                            ? "bg-green-400"
                            : loan.loan_status === "on going"
                            ? "bg-blue-400"
                            : "bg-red-400"
                          }`}
                          >
                          {loan.loan_status}
                        </span>
                      </td>

                        {/* <td className="px-6 py-3">
                          <div className="relative">
                            <button
                              className="block rounded-md dialog cursor-context-menu"
                              onClick={(event) => {
                                setActiveIndex(index);
                                setShow(!show);
                                event.stopPropagation();
                              }}
                            >
                              <FaEllipsisV />
                            </button>
                            <LoansContext
                              activeIndex={activeIndex}
                              show={show}
                              index={index}
                              setShow={setShow}
                              member={activeIndex === index ? loan : null}
                              id={loan.id}
                              setLoanModal={setLoanModal}
                            />
                          </div>
                        </td> */}
                      </tr>
                      {loanModal && activeIndex === index && (
                        <LoanModal setLoanModal={setLoanModal} loan={{loan, payments}} />
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between md:absolute left-0 right-0 bottom-0 px-5 py-1">
              <Pagination
                pages={Math.ceil(loans.length / loansPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={loans}
                DepositsPerPage={loansPerPage}
                setDepositsPerPage={setLoansPerPage}
              />
            </div>
          </>
        ) : loans?.length !== 0 && shownloans === null ? (
          <NothingShown />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
