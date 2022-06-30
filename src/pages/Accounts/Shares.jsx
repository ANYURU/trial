import { supabase } from "../../helpers/supabase";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { useAuth } from "../../auth/AuthContext";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import moment from "moment";
import { Spinner } from "../../components";

function Shares() {
  const {
    user: { id },
  } = useAuth();
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(true);

  const getAccount = async () => {
    const { data, error } = await supabase
      .from("shares_accounts")
      .select()
      .eq("member_id", id)
      .single();
    setAccount(data ? data : null);
  };

  useEffect(() => {
    getAccount();
  }, []);

  const create_account = async () => {
    try {
      const { error } = await supabase.rpc("create_fixed_deposit_account", {});
      if (error) throw error;
      console.log("success")
      toast.success(`Account successfully opened`, { position: "top-center" });
    } catch (error) {
      console.log("failed ", error)
      toast.error(
        `${
          error?.code === "23505"
            ? "You already have an account."
            : "Please try again later."
        }`,
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-60px)]">
      <Helmet>
        <title>Shares Account - Bweyogere tuberebumu</title>
      </Helmet>
      <ToastContainer />
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
        Shares Account
      </h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text h-full p-6">
        {account && Object.keys(account).length > 0 ? (
          <div className="flex h-full flex-col p-3 w-full">
            <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Account ID:</p>
              <p className="font-bold col-span-3">{account.account_id}</p>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Owned by:</p>
              <p className="font-bold col-span-3">
                {account.account_meta.owners_name}
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Account Balance:</p>
              <p className="font-bold col-span-3">
                UGX {currencyFormatter(account.balance)}
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Created At:</p>
              <p className="font-bold col-span-3">
                {moment(account.created_at).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
              <p className="col-span-2">Account Status:</p>
              <p className="font-bold col-span-3">{account.account_status}</p>
            </div>
          </div>
        ) : account === null && account !== {} ? (
          <div className="flex h-full flex-col justify-center items-center w-full">
            <p className="text-md">You don't have a Shares account</p>
            <button
              className="bg-primary rounded-md text-white px-3 py-1 w-56 mt-3"
              onClick={create_account}
            >
              Open Account
            </button>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Shares;
