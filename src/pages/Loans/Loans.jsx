import { loanHistory } from "../../helpers/mockData";
import { Pagination } from "../../components";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";
import { LoanModal } from "../../components";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { Spinner, NothingShown } from "../../components";
import { useNavigate } from 'react-router-dom'

export default function Loan() {
  const [user, { id }] = useOutletContext();
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Loans - Bweyogere tuberebumu";

    fetch_loans().catch(error => console.log(error))

    const mySubscription = supabase
      .from('loans')
      .on('*', async payload => {
        console.log(payload)
        await fetch_loans().catch(error => console.log(error))
      })
      .subscribe()

    return () => supabase.removeSubscription(mySubscription) 

  }, [])

  const [loans, setLoans] = useState([]);
  const [loanModal, setLoanModal] = useState(false);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [loansPerPage, setLoansPerPage] = useState(10);
  const indexOfLastPage = currentPage * loansPerPage;
  const indexOfFirstPage = indexOfLastPage - loansPerPage;

  let shownloans = loans ? loans.slice(indexOfFirstPage, indexOfLastPage) : [];
  console.log("Filter 1: ", shownloans.filter( loan => loan?.loan?.loan_status === status))

  shownloans =
    shownloans.filter((loan) => !status || loan?.loan?.loan_status === status || loan?.application_meta?.review_status === status).length >
    0 || shownloans?.application_meta?.review_status
      ? shownloans.filter((loan) => !status || loan?.loan?.loan_status === status || loan?.application_meta?.review_status === status)
      : null;

  shownloans = shownloans
    ? shownloans.filter(
        (loan) => !date || loan?.created_at.substring(0, 10) === date || loan?.loan?.created_at.substring(0, 10) === date
      ).length > 0
      ? shownloans.filter(
          (loan) => !date || loan.created_at.substring(0, 10) === date || loan?.loan.created_at.subsring(0, 10) === date
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
    };
  }

  const fetch_loans = async () => {
    const { data: {current_loans, pending_loans}, error } = await supabase.rpc("fetch_loans")
    if ( error ) {
      setLoading( false )
      throw error
    } else {

      let data = []
      if( current_loans ) data.push(...current_loans)
      if( pending_loans ) data.push(...pending_loans)

      const sorted_data = data.sort((a,b) => new Date(b?.created_at) - new Date(a?.created_at))
      setLoans( sorted_data )
      setLoading( false )
      console.log(data)
    }

  }

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-between pb-3 md:h-[110px]">
        <h1 className="mb-5 font-bold uppercase dark:text-white">My Loans</h1>

        <div className="flex my-1 justify-between gap-5">
          <div className="flex flex-col w-56">
            <select
              name="status"
              id=""
              className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
              onChange={(event) => {setStatus(event.target.value); console.log(status)}}
            >
              <option value="">Status</option>
              <option value="on going">On going</option>
              <option value="pending">Pending</option>
              <option value="defaulted">Due</option>
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
        {shownloans && shownloans.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full h-6 text-sm text-left text-gray-500 dark:text-gray-400 mb-5">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th></th>
                    <th className="pr-6 py-4">Date</th>
                    <th className="px-4 py-4">Amount to Pay (UGX)</th>
                    <th className="px-4 py-4">Amount Paid (UGX)</th>
                    <th className="px-4 py-4">Principal (UGX)</th>
                    <th className="px-4 py-4">Interest (%)</th>
                    <th className="px-4 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shownloans.map((loan, index) => {
                    return (
                      <>
                      <tr
                        onClick={() => {
                          setLoanModal(true)
                          setActiveIndex(index)
                        }}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                        } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                        key={index}
                        >
                        <td><span className="ml-2 px-4 py-3 text-sm">&gt;</span></td>
                        <td className="pr-6 py-3">
                          {moment(loan?.created_at).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(
                            loan?.application_meta ?
                            loan?.application_meta?.total
                            :
                            loan?.loan.outstanding_balance +
                            loan?.loan.interest_paid/100 * loan?.loan.outstanding_balance
                            )}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(
                            loan?.application_meta ?
                            0
                            :
                            loan?.loan.amount_paid
                          )}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(
                            loan?.application_meta ?
                            loan?.application_meta?.total
                            :
                            loan?.loan.outstanding_balance
                          )}
                        </td>
                        <td className="px-6 py-3">{currencyFormatter(loan?.application_meta ? loan.application_meta.interest_rate : loan?.loan?.interest_rate)}</td>
                        <td className={`px-6 py-3`}>
                          <span
                            className={` py-1 px-2 rounded-xl text-white ${
                              loan?.application_meta?.review_status === "pending" 
                              ? "bg-yellow-400"
                              : loan?.loan?.loan_status === "pending"
                              ? "bg-green-400"
                              : loan?.application_meta?.review_status === "rejected" || loan?.loan?.loan_status === "defaulted"
                              ? "bg-red-400"
                              : loan?.loan.loan_status === "cleared"
                              ? "bg-green-400"
                              : loan?.loan.loan_status === "on going"
                              && "bg-blue-400"
                            }`}
                            >
                            {loan?.loan?.loan_status === "defaulted" ? "arrears" : (loan?.loan?.loan_status === "pending" ? "Not started" : loan.loan.loan_status) || loan?.application_meta?.review_status }
                          </span>
                        </td>
                      </tr>
                      {loanModal && activeIndex === index && (
                        <LoanModal setLoanModal={setLoanModal} loan={loan} loanModal={loanModal}/>
                        )}
                      </>
                    )
                  }
                  )}
                  
                </tbody>
              </table>
            </div>
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between md:absolute left-0 right-0 bottom-0 px-5 py-1">
              <Pagination
                pages={Math.ceil(loanHistory.length / loansPerPage)}
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
