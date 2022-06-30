import { Pagination, Spinner, NothingShown } from "../../components";
import { useState, useEffect, Fragment } from "react";
import { supabase } from "../../helpers/supabase";
import { FaEllipsisV } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { Helmet } from "react-helmet";
import DepositModal from "../../components/Modals/DepositModal";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";

export default function Deposit() {

  const [deposits, setDeposits] = useState([]);
  const [depositModal, setDepositModal] = useState(false);
  const [account, setAccount] = useState("");

  useEffect(() => {
    document.title = 'Deposit - Bweyogere tuberebumu'
    getDeposits()

    const mySubscription = supabase
      .from('transactions')
      .on('*', async payload => {
        console.log(payload)
        await getDeposits()
      })
      .subscribe()

      return () => supabase.removeSubscription(mySubscription) 
  }, [])

  const [ date, setDate ] = useState(null)

  const getDeposits = async () => {
    const { data, error } = await supabase.rpc("fetch_deposits")
      if( error ) {
        throw error
      } else {
        setDeposits(data)
      }
  }

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [depositsPerPage, setDepositsPerPage] = useState(10);
    const indexOfLastPage = currentPage * depositsPerPage;
    const indexOfFirstPage = indexOfLastPage - depositsPerPage;
  
    const [show, setShow] = useState(false);
    const [activeIndex, setActiveIndex] = useState(false);
  
    if (show === true) {
      window.onclick = function (event) {
        if (!event.target.matches(".dialog")) {
          setShow(false);
        }
      };
    }
  
    let filteredDeposits =
      !deposits ||
      deposits.filter(
        (deposit) => !date || deposit.created_at.substring(0, 10) === date
      ).length > 0
        ? deposits.filter(
            (deposit) => !date || deposit.created_at.substring(0, 10) === date
          )
        : null;
  
    filteredDeposits =
      !filteredDeposits ||
      filteredDeposits.filter(
        (deposit) =>
          !account || deposit?.transaction_meta.account_type === account
      );
  
    return (
      <div className="mx-5 my-2 h-[calc(100vh-70px)]">
        <Helmet>
          <title>Deposit - Bweyogere tuberebumu</title>
        </Helmet>
        <div className="flex flex-col justify-between pb-3 md:h-[110px]">
          <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
            My Deposits
          </h1>
  
          <div className="flex my-3 justify-between gap-5">
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
              <option value="fixed">Fixed</option>
              <option value="mwana">Mwana</option>
            </select>
          </div>

          <div className="flex flex-col w-56">
            <input
              type="date"
              name=""
              onChange={(event) => setDate(event.target.value)}
              id=""
              className="py-2 px-2 rounded dark:bg-dark-bg-600 dark:text-secondary-text"
            />
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden  relative  md:h-[calc(100%-120px)] dark:bg-dark-bg-700">
        {deposits !== null &&
        filteredDeposits !== null &&
        filteredDeposits.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Amount(UGX)</th>
                    <th className="px-6 py-4">Approved By</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeposits.map((deposit, index) => (
                    <Fragment key={index}>
                      <tr
                        className={`${
                          index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                        } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                        key={index}
                      >
                        {depositModal && index === activeIndex && (
                          <DepositModal
                            deposit={deposit}
                            setDepositModal={setDepositModal}
                          />
                        )}
                        <td className="px-6 py-3">
                          {moment(deposit.created_at).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-3">{deposit.transaction_id}</td>
                        <td className="px-6 py-3">
                          {deposit.transaction_meta.account_type}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(deposit.amount)}
                        </td>
                        <td className="px-6 py-3">
                          {deposit.transaction_meta.approved_by}
                        </td>

                        <td className="px-6 py-2">
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
                                  setDepositModal(true);
                                }}
                              >
                                <MdInfo /> Details
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex bg-white dark:bg-dark-bg-700 justify-between md:absolute left-0 right-0 bottom-0 px-5 py-1">
              <Pagination
                pages={Math.ceil(deposits.length / depositsPerPage)}
                setCurrentPage={setCurrentPage}
                indexOfFirstPage={indexOfFirstPage}
                indexOfLastPage={indexOfLastPage}
                data={deposits}
                depositsPerPage={depositsPerPage}
                setDepositsPerPage={setDepositsPerPage}
              />
            </div>
          </>
        ) : deposits?.length !== 0 && filteredDeposits === null ? (
          <NothingShown />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
