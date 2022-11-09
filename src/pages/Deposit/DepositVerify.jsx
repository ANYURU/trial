import { useParams } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { Spinner } from "../../components";
import { downloadFile } from "../../helpers/utilites";
import { toast, ToastContainer } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { NothingShown } from "../../components";

export default function DepositVerify() {
  const { id } = useParams();
  const [user, profile] = useOutletContext();
  const [deposit, setDeposit] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApplication()
      .then(async ( data ) => {
        if( data ) {
          console.log("here: ", data)
          setDeposit( data )
          // Downloading the image.
          if( !imageURL ) {
            const { data: file, error } = await supabase.storage  
              .from("deposits")
              .download(await data.application_meta.files[0].file_url.substring(9))

            if( error ) throw error
            const url = URL.createObjectURL(file)
            setImageURL(url)
          }
        }
      })

      .catch(error => console.log(error))
  }, []);

  const [imageURL, setImageURL] = useState("");
  const [imageLoad, setImageLoad] = useState(false);

  const getApplication = async () => {
    const { error, data } = await supabase.rpc("fetch_deposit_applications")
    if(error) throw error
    console.log(data)
    if(data) {
      const [deposit_application] = data.filter( deposit_application => deposit_application.application_id === id)
      return deposit_application
    } 
  }
  // const getApplication = async () => {
  //   const { error
  // }

  const approveDepositTransaction = async () => {
    try {
      const { data, error } = await supabase.rpc("approve_deposit_application", {
        application: id,
      });

      if (error) {
        throw error;
      } else {
        console.log("Result: ", data)
        
        // handle the alerts and navigation
        toast.success(`Transaction has been approved.`, {
          position: "top-center",
        });
        setDeposit((deposit) => ({ ...deposit, ...data}))

        console.log("Modified deposit: ", { ...deposit, ...data})
      }
    } catch (error) {
      toast.error(`${error?.message}`, { position:"top-center"})
      console.log(error)
    }
  }

  const rejectDepositTransaction = async() => {
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
        toast.success(`Transaction has been rejected.`, { position:"top-center" })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <ToastContainer />
      <div className="flex flex-col justify-between pb-3 h-[60px]">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Verify Deposit
        </h1>
      </div>
      <div className="bg-white p-3 md:overflow-y-auto  relative  md:h-[calc(100%-80px)] dark:bg-dark-bg-700 dark:text-secondary-text">
        {deposit ? (
          <div className="flex flex-grow flex-col min-h-full">
            <div className="mb-3">
              <h1 className="font-semibold mb-3">
                {deposit.application_meta && deposit.application_meta.applicants_name}'s Deposit Details
                <span
                  className={` py-1 px-2 rounded-lg text-white text-xs ml-1 inline-block capitalize ${
                    deposit?.transaction_meta ? "bg-green-400"
                      : deposit?.application_meta?.review_status === "rejected"
                      ? "bg-red-400" : deposit?.application_meta?.review_status === "approved"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                >
                  {deposit?.application_meta?.review_status}
                </span>
              </h1>
              <div className="outline outline-1 outline-gray-100 dark:outline-secondary-text p-3">
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Application ID</p>
                  <p className="font-bold col-span-3">
                    : {deposit.app_id}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Created At</p>
                  <p className="font-bold col-span-3">
                    : {moment(deposit.created_at).format("DD-MM-YYYY hh:mm a")}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Amount</p>
                  <p className="font-bold col-span-3">
                    : UGX {currencyFormatter(deposit.application_meta && deposit.application_meta.amount)}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Account</p>
                  <p className="font-bold col-span-3">
                    : {deposit.application_meta && deposit.application_meta.account_type}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Reason</p>
                  <p className="font-bold col-span-3">
                    :{" "}
                    {deposit.application_meta &&
                      deposit?.application_meta.comments || "Not Specified"}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Proof of payment</p>
                  <div className={`${!imageLoad && "animate-pulse bg-accent"} font-bold col-span-3 w-[200px] h-[250px]`}>
                    <img
                      src={imageURL}
                      // width={200}
                      className=" w-full h-full"
                      alt="receipt"
                      loading="lazy"
                      onLoad={() => setImageLoad(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {deposit?.application_meta.applicants_id !== profile.id &&
              deposit?.application_meta.review_status === 'pending' && (
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
          loading ? <Spinner /> : <NothingShown />
        )}
      </div>
    </div>
  );
}
