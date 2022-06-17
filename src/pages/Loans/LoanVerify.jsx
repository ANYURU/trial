import { useParams } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { Spinner } from "../../components";
import { downloadFile } from "../../helpers/utilites";
import { toast, ToastContainer } from "react-toastify";

export default function LoanVerify() {
  const { id } = useParams();

  const [loan, setLoan] = useState(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    getApplication();
  }, []);

  const getApplication = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "loan")
      .eq("application_id", id);
    setLoan(data[0]);
  };

  // if (loan) {
  //   try {
  //     downloadFile(
  //       loan?.application_meta.files[0].file_url.substring(9),
  //       "loans"
  //     )
  //       .then((data) => setImageURL(data.avatar_url))
  //       .catch((error) => console.log("failed"));
  //   } catch (error) {
  //     console.log("failed");
  //   }
  // }

  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <ToastContainer />
      <div className="flex flex-col justify-between pb-3 h-[60px]">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Verify Loan request
        </h1>
      </div>
      <div className="bg-white p-3 overflow-hidden  relative  h-[calc(100%-80px)] dark:bg-dark-bg-700 dark:text-secondary-text">
        {loan ? (
          <div className="flex flex-grow flex-col min-h-full">
            <div className="mb-3">
              <h1 className="font-semibold mb-2">
                {loan.application_meta && loan.application_meta.applicants_name}'s Loan Request
                <span
                  className={` py-1 px-2 rounded-lg text-white text-xs ml-1 ${
                    !loan.reviewed
                      ? "bg-yellow-400"
                      : loan.loan_status === "paid"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                >
                  {!loan.reviewed ? "Reviewed" : "Pending"}
                </span>
              </h1>

              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">
                  created_at:{" "}
                  <span className="font-semibold">
                    {new Date(loan.created_at).toLocaleDateString("en-US")}{" "}
                    {new Date(loan.created_at).toLocaleTimeString("en-US")}
                  </span>
                </div>
                <div className="my-6">
                  Application ID:{" "}
                  <span className="font-semibold">{loan.application_id}</span>
                </div>
                <div className="my-6">
                  Applicant ID:{" "}
                  <span className="font-semibold">
                    {loan.application_meta && loan.application_meta.applicants_id}
                  </span>
                </div>
                <div className="my-6">
                  Applicant Name:{" "}
                  <span className="font-semibold">
                    {loan.application_meta && loan.application_meta.applicants_name}
                  </span>
                </div>

                <div className="my-6">
                  Amount:{" "}
                  <span className="font-semibold">
                    {loan.application_meta && loan.application_meta.amount} ({ loan.application_meta && loan.application_meta.amount_in_words})
                  </span>
                </div>

                <div className="my-6">
                  Account Type:{" "}
                  <span className="font-semibold">
                    {loan.application_meta && loan.application_meta.account_type}
                  </span>
                </div>

                <div className="my-6">
                  Particulars:{" "}
                  <span className="font-semibold">
                    {loan.application_meta && loan.application_meta.particulars}
                  </span>
                </div>



                <img
                  src={imageURL}
                  width={200}
                  className="rounded"
                  alt="receipt"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex gap-10 justify-end items-center mt-3">
              <button
                className="bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                // onClick={rejectLoanPaymentTransaction}
              >
                Reject
              </button>
              <button
                className="bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                // onClick={approveLoanPaymentTransaction}
              >
                Approve
              </button>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
