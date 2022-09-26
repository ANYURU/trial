import { Pagination, Spinner, NothingShown } from "../../components";
import { useState, useEffect, Fragment } from "react";
import { supabase } from "../../helpers/supabase";
import { FaEllipsisV } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { Helmet } from "react-helmet";
import WithdrawModal from "../../components/Modals/WithdrawModal";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useOutletContext } from "react-router-dom";
import { filterByStatus } from "../../helpers/utilites";

export default function Deposit() {

  const [deposits, setDeposits] = useState([]);
  const [depositModal, setDepositModal] = useState(false);
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("")



  useEffect(() => {
    document.title = "Deposit - Bweyogere tuberebumu";
    getDeposits();

    const mySubscription = supabase
      .from("applications")
      .on("*", async (payload) => {
        console.log(payload);
        await getApplications();
      })
    getDeposits()

    const mySubscriptions = supabase
      .from('transactions')
      .on('*', async payload => {
        console.log(payload)
        await getDeposits()
      })
      .subscribe()


    return () => supabase.removeSubscription(mySubscription);
  }, []);

  const [user, profile] = useOutletContext();

  const [date, setDate] = useState(null);
  const [ loading, setLoading ] = useState(true)

  const getApplications = async () => {
    const { data } = await supabase
      .from("transactions")
      .select()
      .eq("_type", "deposit")
      .eq("created_by", profile.id)
      .order("created_at", { ascending: false })
      console.log(data)
    setDeposits(data && data.length > 0 ? data : null);
  };


  const getDeposits = async () => {
    const { data: { transactions, applications}, error } = await supabase.rpc("fetch_withdraws")
      if( error ) {
        setLoading(false)
        throw error
      } else {
        let data = []
        if (applications) data.push(...applications)
        if (transactions) data.push(...transactions)
        setDeposits( data ?? null)
        setLoading(false)
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
      deposits &&
      deposits.filter(
        (deposit) => !date || deposit.created_at.substring(0, 10) === date
      )?.length > 0
        ? deposits.filter(
            (deposit) => !date || deposit.created_at.substring(0, 10) === date
          )
        : null;
  
    filteredDeposits =
      !filteredDeposits ||
      filteredDeposits.filter(deposit => !status || status === "" ? deposit : status === 'approved' ? deposit?.transaction_meta : deposit?.application_meta?.review_status === status).filter(
        (deposit) =>
          !account || (deposit?.transaction_meta ? deposit?.transaction_meta?.account_type === account : deposit?.application_meta?.account_type === account)
      )
    
      

    
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
                name="status"
                id=""
                className="py-2 px-2 rounded bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                onChange={(event) => {
                  setStatus(event.target.value);
                  console.log(event.target.value)
                  console.log(filteredDeposits)
                  
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
                    <th></th>
                    <th className="pr-6 py-4">Date</th>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Amount(UGX)</th>
                    <th className="px-6 py-4">Cashout Method</th>
                    <th className="px-6 py-4">Status</th>
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
                        onClick={() => {
                          console.log(deposit)
                          setDepositModal(true)
                          setActiveIndex(index)
                        }}
                      >
                        <td><span className="ml-2 px-4 py-3 text-sm">&gt;</span></td>
                        <td className="pr-6 py-3">
                          {moment(deposit.created_at).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-3">{deposit?.trans_id || deposit?.app_id}</td>
                        <td className="px-6 py-3">
                          {deposit?.transaction_meta?.account_type || deposit?.application_meta?.account_type}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(deposit?.amount || deposit?.application_meta?.amount)}
                        </td>
                        <td className="px-6 py-3">
                          {deposit?.transaction_meta?.cashout_method || deposit?.application_meta?.cashout_method}
                        </td>
                        <td className="px-6 py-3">
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
                      </tr>
                      {depositModal && index === activeIndex && (
                        <WithdrawModal
                          deposit={deposit}
                          setDepositModal={setDepositModal}
                        />
                      )}
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
        ) : deposits === null || deposits?.length !== 0 || filteredDeposits === null || filteredDeposits?.length === 0 ? (
          <NothingShown />
        ) : (
          loading ? <Spinner /> : <NothingShown />
        )}
      </div>
    </div>
  );
}
