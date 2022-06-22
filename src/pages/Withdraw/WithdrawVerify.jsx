import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "../../components";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";

export default function WithdrawVerify() {
  const { id } = useParams();
  const [profile] = useOutletContext();
  const [withdraw, setWithdraw] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getApplication();
  }, []);

  const getApplication = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "withdraw")
      .eq("application_id", id);
    setWithdraw(data[0]);
  };

  const approveWithdrawTransaction = async () => {
    setLoading(true);
    const {
      application_meta: { applicants_id },
    } = withdraw;

    try {
      const { error, data } = await supabase.rpc("approve_transaction", {
        members_id: applicants_id,
        application: id,
      });

      if (error) {
        setLoading(false);
        toast.error(`${error?.message}`, { position: "top-center" });
      } else {
        setLoading(false);
        toast.success(`Withdraw has been approved.`, {
          position: "top-center",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(`Try again later`, { position: "top-center" });
    }
  };

  const rejectWithdrawTransaction = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc("reject_application", {
        application: id,
      });
      if (error) {
        setLoading(false);
        toast.error(`${error?.message}`, { position: "top-center" });
      } else {
        setLoading(false);
        toast.success(`Withdraw has been rejected.`, {
          position: "top-center",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(`Try again later`, { position: "top-center" });
    }
  };

  console.log(withdraw);

  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-between pb-3 h-[60px]">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Verify Withdraw
        </h1>
      </div>
      <ToastContainer />
      <div
        className={`bg-white ${
          !loading && "p-3"
        }  overflow-y-auto  relative  h-[calc(100%-80px)] dark:bg-dark-bg-700`}
      >
        {loading && (
          <div className="absolute z-10 bg-white dark:bg-dark-bg-700 dark:bg-opacity-90 bg-opacity-90 w-full h-full rounded-lg">
            <Spinner />
          </div>
        )}
        {withdraw ? (
          <div className="flex flex-grow flex-col min-h-full">
            <div className="mb-3">
              <h1 className="font-semibold mb-2">
                {withdraw.application_meta &&
                  withdraw.application_meta.applicants_name}
                's withdraw Request Details
                <span
                  className={` py-1 px-2 rounded-lg text-white text-xs ml-1 ${
                    !withdraw.reviewed
                      ? "bg-yellow-400"
                      : withdraw.application_meta.review_status === "approved"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  {!withdraw.reviewed
                    ? "Pending"
                    : withdraw.application_meta.review_status === "approved"
                    ? "Approved"
                    : "Rejected"}
                </span>
              </h1>

              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Application ID:</p>
                  <p className="font-bold col-span-3">
                    {withdraw.application_id}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Applicant's name:</p>
                  <p className="font-bold col-span-3">
                    {withdraw.application_meta.applicants_name}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Account:</p>
                  <p className="font-bold col-span-3">
                    {withdraw.application_meta.account_type}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Amount:</p>
                  <p className="font-bold col-span-3">
                    UGX {currencyFormatter(withdraw.application_meta.amount)}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Particulars:</p>
                  <p className="font-bold col-span-3">
                    {withdraw.application_meta.particulars}
                  </p>
                </div>

                {withdraw && withdraw.reviewed && (
                  <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                    <p className="col-span-2">Reviewed on:</p>
                    <p className="font-bold col-span-3">
                      {moment(withdraw.application_meta.reviewed_at).format(
                        "MMMM Do YYYY, h a"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-10 justify-end items-center mt-3">
              {withdraw && !withdraw.reviewed && (
                <div className="flex gap-10 justify-end items-center mt-3">
                  <button
                    className="bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                    onClick={() => rejectWithdrawTransaction()}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                    onClick={() => approveWithdrawTransaction()}
                  >
                    Approve
                  </button>
                </div>
              )}
              {withdraw && withdraw.reviewed && (
                <div className="flex justify-end items-center mt-3">
                  Reviewed by:{" "}
                  <span className="font-bold">
                    {withdraw.application_meta.reviewed_by}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
