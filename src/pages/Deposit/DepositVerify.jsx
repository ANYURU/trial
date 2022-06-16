import { useParams } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { Spinner } from "../../components";
import { downloadFile } from "../../helpers/utilites";
import { toast, ToastContainer } from "react-toastify";
import { useOutletContext } from "react-router-dom";

export default function DepositVerify() {
  const { id } = useParams();
  const [profile] = useOutletContext();

  useEffect(() => {
    getApplication();
  }, []);
  const [deposit, setDeposit] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const getApplication = async () => {
    const { data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "deposit")
      .eq("application_id", id);

    console.log(data[0]);
    setDeposit(data[0]);
  };

  // if (deposit) {
  //   downloadFile(
  //     deposit.application_meta.files[0].file_url.substring(9),
  //     "deposits"
  //   )
  //     .then((data) => setImageURL(data.avatar_url))
  //     .catch((error) => error);
  // }

  const approveDepositTransaction = async () => {
    const {
      application_meta: { applicants_id },
    } = deposit;

    try {
      const { data, error } = await supabase.rpc("approve_transaction", {
        members_id: applicants_id,
        application: id,
      });
      if (error) {
        throw error;
      } else {
        // handle the alerts and navigation
        toast.success(`Transaction has been approved.`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(`${error?.message}`, { position: "top-center" });
      console.log(error);
    }
  };

  const rejectDepositTransaction = async () => {
    try {
      const { data, error } = await supabase.rpc("reject_application", {
        application: id,
      });
      if (error) {
        throw error;
      } else {
        toast.success(`Transaction has been rejected.`, {
          position: "top-center",
        });
        // handle the alerts and navigation
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(deposit)

  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <ToastContainer />
      <div className="flex flex-col justify-between pb-3 h-[60px]">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Verify Deposit
        </h1>
      </div>
      <div className="bg-white p-3 overflow-hidden  relative  h-[calc(100%-80px)] dark:bg-dark-bg-700">
        {deposit ? (
          <div className="flex flex-grow flex-col min-h-full">
            <div className="mb-3">
              <h1 className="font-semibold">
                {deposit.application_meta.applicants_name}'s withdraw Request
                Details
              </h1>
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">
                  Created At:{" "}
                  <span className="font-semibold">
                    {new Date(deposit.created_at).toLocaleDateString("en-US")} {new Date(deposit.created_at).toLocaleTimeString("en-US")}
                  </span>
                </div>
                <div className="my-6">
                  Applicant ID:{" "}
                  <span className="font-semibold">
                    {deposit.application_meta.applicants_id}
                  </span>
                </div>
                <div className="my-6">
                  Application ID:{" "}
                  <span className="font-semibold">
                    {deposit.application_id}
                  </span>
                </div>
                <div className="my-6">
                  Account:{" "}
                  <span className="font-semibold">
                    {deposit.application_meta.account_type}
                  </span>
                </div>
                <div className="my-6">
                  Amount:{" "}
                  <span className="font-semibold">
                    {deposit.application_meta.amount}
                  </span>
                </div>
                <div className="my-6">
                  Account/Mobile Number:
                  <span className="font-semibold">
                    {deposit.application_meta &&
                      deposit?.application_meta.phone_number}
                  </span>
                </div>
                <div className="my-6">
                  Particulars:{" "}
                  <span className="font-semibold">
                    {deposit.application_meta.particulars}
                  </span>
                </div>
                {/* <img
                  src={imageURL}
                  width={200}
                  className="rounded"
                  alt="receipt"
                  loading="lazy"
                /> */}
              </div>
            </div>
            {deposit.application_meta.applicants_id !== profile.id && (
              <div className="flex gap-10 justify-end items-center mt-3">
                <button
                  type="submit"
                  className="bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                  onClick={rejectDepositTransaction}
                >
                  Reject
                </button>
                <button
                  type="submit"
                  className="bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                  onClick={approveDepositTransaction}
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
