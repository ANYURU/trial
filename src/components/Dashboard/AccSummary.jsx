import { useMediaQuery } from "../../hooks";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";

export default function AccSummary({ setMyShares }) {
  const matches = useMediaQuery("(min-width: 800px)");

  const [accounts, setAccounts] = useState(null);
  useEffect(() => {
    get_account_information()
      .then((data) => {
        if (data) {
          setAccounts(data);
          setMyShares(data?.shares?.balance);
        }
      })
      .catch((error) => console.log(error));

    const mySubscription = supabase
      .from("transactions")
      .on("*", async (payload) => {
        get_account_information().then((data) => {
          if (data) {
            setAccounts(data);
            setMyShares(data?.shares.balance);
          }
        });
      })
      .subscribe();

    return () => supabase.removeSubscription(mySubscription);
  }, []);

  const get_account_information = async () => {
    const { data, error } = await supabase.rpc("get_accounts_information");
    if (error) throw error;
    return data;
  };

  return matches ? (
    <div className="flex justify-between mb-5 gap-5 dark:text-white">
      <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
        <h1 className="font-bold text-2xl">
          {accounts && accounts?.shares?.balance
            ? currencyFormatter(accounts?.shares?.balance)
            : 0}
        </h1>
        <h1 className="font-semibold">Shares</h1>
      </div>
      <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
        <h1 className="font-bold text-2xl">
          {accounts && accounts?.savings?.balance
            ? currencyFormatter(accounts?.savings?.balance)
            : 0}
        </h1>
        <h1 className="font-semibold">Savings</h1>
      </div>
      <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
        <h1 className="font-bold text-2xl">
          {accounts && accounts?.mwana == null ? 'No account' :  (accounts?.mwana?.balance
            ? currencyFormatter(accounts?.mwana?.balance)
            : 0)}
        </h1>
        <h1 className="font-semibold">Mwana</h1>
      </div>
      <div className="bg-white w-3/12 flex flex-col py-7 rounded-md justify-center items-center dark:bg-dark-bg-700">
        <h1 className="font-bold text-2xl">
          {accounts && accounts.mwana == null ? 'No account' : accounts?.fixed?.balance
            ? currencyFormatter(accounts?.fixed?.balance)
            : 0}
        </h1>
        <h1 className="font-semibold">Fixed</h1>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-5  dark:text-white">
      <div className="flex gap-5">
        <div className="bg-white dark:bg-dark-bg-700  w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
          <h1 className="font-bold text-2xl">
            {accounts && accounts?.shares?.balance
              ? currencyFormatter(accounts?.shares?.balance)
              : 0}
          </h1>
          <h1 className="font-semibold">Shares</h1>
        </div>
        <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
          <h1 className="font-bold text-2xl">
            {accounts && accounts?.savings?.balance
              ? currencyFormatter(accounts?.savings?.balance)
              : 0}
          </h1>
          <h1 className="font-semibold">Savings</h1>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
          <h1 className="font-bold text-2xl">
            {accounts && accounts?.mwana?.balance
              ? currencyFormatter(accounts?.mwana?.balance)
              : 0}
          </h1>
          <h1 className="font-semibold">Mwana</h1>
        </div>
        <div className="bg-white dark:bg-dark-bg-700 w-6/12 flex flex-col py-7 rounded-md justify-center items-center">
          <h1 className="font-bold text-2xl">
            {accounts && accounts?.fixed?.balance
              ? currencyFormatter(accounts?.fixed?.balance)
              : 0}
          </h1>
          <h1 className="font-semibold">Fixed</h1>
        </div>
      </div>
    </div>
  );
}
