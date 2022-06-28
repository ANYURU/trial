import React from "react";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { supabase } from "../../helpers/supabase";
import { Spinner } from "../../components";
import moment from "moment";

function Accounts() {
  const [accounts, setAccounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Accounts - Bweyogere tuberebumu";
    get_account_information()
      .then((data) => {
        if (data) {
          setAccounts(data);
          setLoading(false);
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const get_account_information = async () => {
    const { data, error } = await supabase.rpc("get_accounts_information", {});
    if (error) throw error;
    return data;
  };

  const getApplications = async () => {
    const { error, data } = await supabase.from("accounts").select();
    console.log("data", data);
  };

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
        Accounts summary
      </h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text h-full">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase  bg-gray-700 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4">Account Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4">Status</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {accounts?.savings !== null && (
                  <tr className="hover:bg-gray-100 dark:hover:bg-dark-bg-600">
                    <td className="px-6 py-4">Savings</td>
                    <td className="px-6 py-4">{accounts?.savings?.balance}</td>
                    <td className="px-6 py-4">
                      {moment(accounts?.savings?.created_at).format(
                        "DD-MM-YYYY"
                      )}
                    </td>
                    <td className="px-6 py-4">{accounts?.savings?.balance}</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                        <button className="block p-2 rounded-md dialog cursor-context-menu">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
                {accounts?.shares !== null && (
                  <tr className="hover:bg-gray-100 dark:hover:bg-dark-bg-600">
                    <td className="px-6 py-4">Shares</td>
                    <td className="px-6 py-4">{accounts?.shares?.balance}</td>
                    <td className="px-6 py-4">
                      {moment(accounts?.shares?.created_at).format(
                        "DD-MM-YYYY"
                      )}
                    </td>
                    <td className="px-6 py-4">{accounts?.shares?.balance}</td>
                    <td className="px-5 py-4">
                      <div className="relative">
                        <button className="block p-2 rounded-md dialog cursor-context-menu">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
                {accounts?.mwana && (
                  <tr className="hover:bg-gray-100 dark:hover:bg-dark-bg-600">
                    <td className="px-6 py-4">Mwana</td>
                    <td className="px-6 py-4">{accounts?.mwana?.balance}</td>
                    <td className="px-6 py-4">
                      {moment(accounts?.mwana?.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      {accounts?.mwana?.account_status}
                    </td>
                    {/* <td className="px-5 py-4">
                      <div className="relative">
                        <button className="block p-2 rounded-md dialog cursor-context-menu">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                )}
                {accounts?.fixed && (
                  <tr className="hover:bg-gray-100 dark:hover:bg-dark-bg-600">
                    <td className="px-6 py-4">Fixed</td>
                    <td className="px-6 py-4">{accounts?.fixed?.balance}</td>
                    <td className="px-6 py-4">
                      {moment(accounts?.fixed?.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      {accounts?.fixed?.account_status}
                    </td>
                    {/* <td className="px-5 py-4">
                      <div className="relative">
                        <button className="block p-2 rounded-md dialog cursor-context-menu">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Accounts;
