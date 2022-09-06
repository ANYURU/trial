import { depositHistory } from "../../helpers/mockData";
import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { filterByStatus } from "../../helpers/utilites";
import { Pagination, Spinner, NothingShown } from "../../components";
import WithdrawModal from "../../components/Modals/WithdrawModal";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";

export default function Withdrawy() {
  useEffect(() => {
    getWithdraws().catch((error) => console.log(error));

    const mySubscription = supabase
      .from("transactions")
      .on("*", async (payload) => {
        console.log(payload);
        await getWithdraws().catch((error) => console.log(error));
      })
      .subscribe();

    document.title = "Withdraws - Bweyogere tuberebumu";
    return () => supabase.removeSubscription(mySubscription);


  }, []);

  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [show, setShow] = useState(false);

  let loans = filterByStatus(depositHistory, "status", status);

  loans = filterByStatus(loans, "account", account);

  const [withdraws, setWithraws] = useState([]);

  const getWithdraws = async () => {
    const { data, error } = await supabase.rpc("fetch_withdraws");
    if (error) throw error;
    setWithraws(data && data.length > 0 ? data : null);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [withdrawPerPage, setWithdrawPerPage] = useState(10);
  const indexOfLastPage = currentPage * withdrawPerPage;
  const indexOfFirstPage = indexOfLastPage - withdrawPerPage;

  const shownWithdraw =
    !withdraws || withdraws.slice(indexOfFirstPage, indexOfLastPage);

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
      <div className="flex flex-col justify-between pb-3 md:h-[110px]">
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
              onChange={(event) => {
                setStatus(event.target.value);
              }}
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
              name=""
              id=""
              placeholder="Old Password"
              className="rounded px-2 py-2 dark:bg-dark-bg-600 dark:text-secondary-text"
            />
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden  relative  md:h-[calc(100%-120px)] dark:bg-dark-bg-700">
        {withdraws && withdraws.length > 0 ? (
          <>
            <div className="w-full overflow-x-auto h-full  relative overflow-y-auto">
              <table className="w-full h-6 text-sm text-left text-gray-500 dark:text-gray-400 mb-5">
                <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Account</th>
                    <th className="px-6 py-4">Amount (UGX)</th>
                    <th className="px-6 py-4">Cashout Method</th>
                  </tr>
                </thead>
                <tbody>
                  {shownWithdraw.map((withdraw, index) => (
                    <>
                      {
                        withdrawModal && activeIndex == index && (
                          <WithdrawModal 
                            withdraw={withdraw}
                            setWithdrawModal={setWithdrawModal}
                          
                          />
                        )
                      }
                      <tr
                        className={`${
                          index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""
                        } hover:bg-gray-100 dark:hover:bg-dark-bg-600 cursor-pointer`}
                        key={index}
                        onClick={() => {
                          setWithdrawModal(true)
                          setActiveIndex(index)

                        }}
                      >
                        <td className="px-6 py-3">
                          {moment(withdraw.created_at).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-6 py-3">{withdraw.transaction_id}</td>
                        <td className="px-6 py-3">
                          {withdraw.transaction_meta.account_type}
                        </td>
                        <td className="px-6 py-3">
                          {currencyFormatter(withdraw.amount)}
                        </td>
                        <td className="px-6 py-3">
                          {withdraw.transaction_meta.cashout_method}
                        </td>
                      </tr>
                    </>
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
                data={withdraws}
                depositsPerPage={withdrawPerPage}
                setDepositsPerPage={setWithdrawPerPage}
              />
            </div>
          </>
        ) : withdraws === null ? (
          <NothingShown />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
