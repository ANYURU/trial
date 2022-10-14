import { useParams } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { Spinner } from "../../components";
import { downloadFile } from "../../helpers/utilites";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { currencyFormatter } from "../../helpers/currencyFormatter";

export default function LoanVerify() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [bankStatementURL, setBankStatementURL] = useState("");
  const [yearsCashflowURL, setCashflowURL] = useState("")
  const [additionalFilesURL, setAdditionalFilesURL] = useState("")
  const [supportingFilesURL, setSupportingFilesURL] = useState("")


  useEffect(() => {
    getApplication()
    .then(async (data) => {
      setLoan(data)
      if ( data?.application_meta?.bank_settlement_url && !bankStatementURL ) {
        const { data: file, error } = await supabase.storage  
          .from("loans")
          .download(await data.application_meta.files[0].file_url.substring(9))
          console.log(file)

        if( error ) throw error
        const url = URL.createObjectURL(file)
        setBankStatementURL(url)
      } 
      if ( data?.application_meta?.a_years_cashflow_url && !yearsCashflowURL ) {
        const { data: file, error } = await supabase.storage  
          .from("loans")
          .download(await data.application_meta.files[0].file_url.substring(9))

          console.log(file)

        if( error ) throw error
        const url = URL.createObjectURL(file)
        yearsCashflowURL(url)
      }
      if ( data?.application_meta?.additional_files_url  && additionalFilesURL ) {
        const { data: file, error } = await supabase.storage  
          .from("loans")
          .download(await data.application_meta.files[0].file_url.substring(9))

          console.log(file)

        if( error ) throw error
        const url = URL.createObjectURL(file)
        additionalFilesURL(url)

      }
      if ( data?.application_meta?.supporting_files_url && supportingFilesURL ) {
        const { data: file, error } = await supabase.storage  
          .from("loans")
          .download(await data.application_meta.files[0].file_url.substring(9))

        console.log(file)

        if( error ) throw error
        const url = URL.createObjectURL(file)
        supportingFilesURL(url)
      }
    })
    .catch(error => console.log(error));
  }, []);

  const getApplication = async () => {
    const { error, data } = await supabase
      .from("applications")
      .select()
      .eq("_type", "loan")
      .eq("application_id", id)
      .single();

      if( error ) throw error;

      return data;
  };


  const approveLoanPaymentTransaction = async() => {
    const { data, error } = await supabase.rpc('approve_loan',  {members_id:loan.application_meta.applicant_id, application:loan.application_id})

    if(error) throw error
    toast.success(`Loan has been approved`,{
      position: 'top-center'
    })
    console.log(data)
  }

  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <ToastContainer />
      <div className="flex flex-col justify-between pb-3 h-[60px]">
        <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
          Verify Loan request
        </h1>
      </div>
      <div className="bg-white p-3 overflow-y-scroll  relative  h-[calc(100%-80px)] dark:bg-dark-bg-700 dark:text-secondary-text">
        {loan ? (
          <div className="flex flex-grow flex-col min-h-full">
            <div className="mb-3">
              <h1 className="font-semibold mb-2">
                {loan.application_meta && loan.application_meta.applicants_name}
                's Loan Request
                <span
                  className={` py-1 px-2 rounded-lg text-white text-xs ml-1 ${
                    !loan.reviewed
                      ? "bg-yellow-400"
                      : loan.application_meta.review_status === "approved"
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  {!loan.reviewed
                    ? "Pending"
                    : loan.application_meta.review_status === "approved"
                    ? "Approved"
                    : "Rejected"}
                </span>
              </h1>

              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">created_at:</p>
                  <p className="font-bold col-span-3">
                    {moment(loan.created_at).format("DD-MM-YYYY")}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Application ID:</p>
                  <p className="font-bold col-span-3">{loan.app_id}</p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Applicants Name:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta.applicants_name}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Position in SACCO:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta.position_in_sacco}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Amount Requested:</p>
                  <p className="font-bold col-span-3">
                  
                    UGX {" "}
                    {loan.application_meta &&
                      currencyFormatter(loan.application_meta.amount)}{" "}
                    (
                    {loan.application_meta &&
                      loan.application_meta.amount_in_words}
                    )
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Assets:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta.asset1},{" "}
                    {loan.application_meta.asset2},{" "}
                    {loan.application_meta.asset3}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Loan Purpose:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta.loan_purpose}
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Landline:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.landline_number}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Town:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.town}
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Next of Kin:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.kin_name}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Next of Kin Contact:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.kin_contact}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-5 justify-start w-full">
                  <p className="col-span-2">Next of Kin Profession:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.kin_profession}
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Spouse:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.spouse_name}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Next of spouse Contact:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.spouse_contact}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-2 justify-start w-full">
                  <p className="col-span-2">Next of spouse Profession:</p>
                  <p className="font-bold col-span-3">
                    {loan.application_meta?.spouse_profession}
                  </p>
                </div>
                {
                  bankStatementURL && (
                  <>
                    <p> Bank statement</p>
                    <img
                      src={ bankStatementURL }
                      width={200}
                      className="rounded"
                      alt="receipt"
                      loading="lazy"
                    /> 
                  </>
                  )
                }
                {
                  yearsCashflowURL && (
                  <>
                    <p> One year's cashflow </p>
                    <img
                      src={yearsCashflowURL}
                      width={200}
                      className="rounded"
                      alt="receipt"
                      loading="lazy"
                    /> 
                  </>
                  )
                }
                {
                  additionalFilesURL && (
                  <>
                    <p> Additional Files </p>
                    <img
                      src={loan.application_meta?.additional_files_url}
                      width={200}
                      className="rounded"
                      alt="receipt"
                      loading="lazy"
                    /> 
                  </>
                  )
                }
                {
                  supportingFilesURL && (
                    <>
                      <p> Supporting Files </p>
                      <img
                        src={loan.application_meta.supporting_files_url}
                        width={200}
                        className="rounded"
                        alt="receipt"
                        loading="lazy"
                      /> 
                    </>
                    )
                }
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
                onClick={approveLoanPaymentTransaction}
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
