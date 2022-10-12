import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../helpers/supabase";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "../../components";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useOutletContext } from "react-router-dom";

export default function WithdrawVerify() {
  const { id } = useParams();
  const [withdraw, setWithdraw] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, profile, setProfile, roles] = useOutletContext()
  const [showAdmin1Actions, setShowAdmin1Actions ] = useState(true)
  const [showAdmin2Actions, setShowAdmin2Actions ] = useState(true)

  useEffect(() => {
    getApplication();
  }, []);

  const getApplication = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "withdraw")
      .eq("application_id", id)
      .single();

    if( data?.application_meta?.admin_1?.admin_name && ['treasurer', 'asst_treasurer', 'secretary', 'asst_secretary'].some(role => roles.includes(role))) {
      setShowAdmin1Actions(false)
    }

    if( data?.application_meta?.admin_2?.admin_name && ['chairperson', 'vice_chairperson'].some(role => roles.includes(role))) {
      setShowAdmin2Actions(false)
    }

    setWithdraw(data);
  };

  const approveWithdrawTransaction = async () => {
    setLoading(true);
    const {
      application_meta: { applicants_id },
    } = withdraw;

    try {
      const { error, data } = await supabase.rpc("approve_withdraw_transaction", {
        application: id,
        admin: profile.id
      });
    

      if (error) {
        console.log(error)
        setLoading(false);
        toast.error(`${error?.message}`, { position: "top-center" });
      } else {
        console.log(data)
        setWithdraw((withdraw) => ({...withdraw, application_meta: data?.application_meta}))
        console.log("withdraw", {...withdraw, application_meta: data?.application_meta})
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
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc("reject_withdraw_transaction", {
        application: id,
        admin: profile.id
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
                    withdraw?.review_status === 'rejected'
                    ? "bg-red-400"
                    : withdraw?.review_status === 'approved'
                    ? "bg-green-400"
                    : "bg-yellow-400"
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
                    {withdraw.app_id}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Applicant's name:</p>
                  <p className="font-bold col-span-3">
                    {withdraw.application_meta.applicants_name}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Designated for :</p>
                  <p className="font-bold col-span-3">
                    {withdraw?.application_meta?.designated_for === 'other' ? 'Other member' : 'Oneself'}
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
                  <p className="col-span-2">Cashout method:</p>
                  <p className="font-bold col-span-3">
                    {withdraw?.application_meta?.cashout_method}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Comments:</p>
                  <p className="font-bold col-span-3">
                    {withdraw.application_meta.comments || "Unspecified"}
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
            {
              withdraw?.application_meta?.designated_for === "other" &&
              <>
                <div className="outline outline-1 outline-gray-100 p-3 mb-3">
                  <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                    <p className="col-span-2">Member's name:</p>
                    <p className="font-bold col-span-3">
                      {withdraw?.application_meta?.member?.fullname}
                    </p>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                    <p className="col-span-2">Phone number:</p>
                    <p className="font-bold col-span-3">
                      {withdraw?.application_meta?.member?.phone_number}
                    </p>
                  </div>
                </div>
                {
                  ( withdraw?.application_meta?.admin_1?.admin_name || withdraw?.application_meta?.admin_2?.admin_name ) &&
                  <div className="outline outline-1 outline-gray-100 p-3">
                    <h1 className="mb-5 mt-2 uppercase dark:text-white font-bold">
                      Review details
                    </h1>
                    {
                      // withdraw?.application_meta?.admin_1?.admin_name &&
                      <>
                        <h1 className="mb-2 mt-2 font-bold capitalize dark:text-white">
                          Treasury and Secretariate 
                        </h1>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                          <p className="col-span-2">Reviewed by:</p>
                          <p className="font-bold col-span-3">
                            {withdraw?.application_meta?.admin_1?.admin_name}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                          <p className="col-span-2">Role:</p>
                          <p className="font-bold col-span-3">
                            {withdraw?.application_meta?.admin_1?.position_in_sacco}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                          <p className="col-span-2">Status:</p>
                          <p className="font-bold col-span-3">
                            {withdraw?.application_meta?.admin_1?.review_status}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full border-b pb-3">
                          <p className="col-span-2">Reviewed at:</p>
                          <p className="font-bold col-span-3">
                          {withdraw?.application_meta?.admin_1?.reviewed_at && moment(withdraw.application_meta?.admin_1?.reviewed_at).format("DD-MM-YYYY  hh:mm a")}
                          </p>
                        </div>
                      </>
                    }
                    {
                      // withdraw?.application_meta?.admin_2?.admin_name &&
                      <>
                        <h1 className="mb-2 mt-2 font-bold capitalize dark:text-white">
                          Leadership 
                        </h1>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                          <p className="col-span-2">Reviewed by:</p>
                          <p className="font-bold col-span-3">
                            {withdraw?.application_meta?.admin_2?.admin_name}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                          <p className="col-span-2">Role:</p>
                          <p className="font-bold col-span-3">
                            {withdraw?.application_meta?.admin_2?.position_in_sacco}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                          <p className="col-span-2">Status:</p>
                          <p className="font-bold col-span-3">
                            {withdraw?.application_meta?.admin_2?.review_status}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                          <p className="col-span-2">Reviewed at:</p>
                          <p className="font-bold col-span-3">
                            {withdraw?.application_meta?.admin_2?.reviewed_at && moment(withdraw?.application_meta?.admin_2?.reviewed_at).format("DD-MM-YYYY  hh:mm a")}
                          </p>
                        </div>
                      </>
                    }
                  </div>
                }
              </>
            }
            <div className="flex gap-10 justify-end items-center mt-3">
              { withdraw && !withdraw.reviewed &&        
                (
                  <div className={`flex gap-10 justify-end items-center mt-3`}>
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
                )
              }
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
