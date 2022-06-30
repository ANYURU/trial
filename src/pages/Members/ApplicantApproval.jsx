import { useParams } from "react-router-dom";
import { supabase } from "../../helpers/supabase";
import { useState, useEffect } from "react";
import { Spinner } from "../../components";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ApplicantApproval() {
  const { id } = useParams();

  useEffect(() => {
    supabase.rpc("fetch_membership_applications")
      .then(({data, error}) => {
        if (error) throw error
        const [ application ] = data.filter( application => application.application_id === id)
        setApplication(application)
      })
      .catch(error => console.log(error))
  }, [])

  const [ application, setApplication ] = useState(null)

  const approveMember = async () => {
    console.log("here");
    const {
      application_meta: { applicants_id },
    } = application;
    try {
      const { data, error } = await supabase.rpc("approve_member", {
        members_id: applicants_id,
        application: id,
      });
      if (error) {
        throw error;
      } else {
        toast.success(`Member has been approved.`, { position: "top-center" });
        // navigate(-1)
      }
    } catch (error) {
      toast.error(`${error?.message}`, { position: "top-center" });
      console.log(error);
    }
  };

  const rejectMemberApplication = async () => {
    try {
      const { data, error } = await supabase.rpc("reject_application", {
        application: id,
      });
      if (error) {
        throw error;
      } else {
        console.log(data);
        // handle the alerts and navigation
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
          Approve Member Application
        </h1>
      </div>
      <div className="bg-white p-3 overflow-scroll  relative  h-[calc(100%-80px)] dark:bg-dark-bg-700">
        {application ? (
          <div className="flex flex-grow flex-col min-h-full">
            <div className="mb-3">
              <div className="p-3">
                <div className="my-6">
                  Application ID: <span className="font-semibold">{id}</span>
                </div>
                <div className="my-6">
                  Application Status:{" "}
                  <span className="font-semibold">
                    {application.application_meta.review_status}
                  </span>
                </div>

                <h3 className="font-bold">Applicant's Details</h3>
                <div className="outline outline-1 outline-gray-200 p-3 mb-5">
                  <div className="">
                    Applicant's name:{" "}
                    <span className="font-semibold">
                      {application.application_meta.applicants_name}
                    </span>
                  </div>
                  <div className="my-6">
                    Email Address:{" "}
                    <span className="font-semibold">
                      {application.application_meta.email_address}
                    </span>
                  </div>

                  <div className="flex justify-between my-6">
                    <div className="">
                      Date of Birth:{" "}
                      <span className="font-semibold">
                        {application.application_meta.dob}
                      </span>
                    </div>
                    <div className="">
                      Gender:{" "}
                      <span className="font-semibold">
                        {application.application_meta.gender}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between my-6">
                    <div className="">
                      Marital Status:{" "}
                      <span className="font-semibold">
                        {application.application_meta.marital_status}
                      </span>
                    </div>
                    <div className="">
                      Phone Number:{" "}
                      <span className="font-semibold">
                        {application.application_meta.phone_number}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between my-6">
                    <div className="">
                      Father's name:{" "}
                      <span className="font-semibold">
                        {application.application_meta.fathers_name}
                      </span>
                    </div>
                    <div className="">
                      Father's address:{" "}
                      <span className="font-semibold">
                        {application.application_meta.fathers_address}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold">Nominees</h3>
                <div className="outline outline-1 outline-gray-200 p-3">
                  {application.application_meta.nominees.map(
                    (nominee, index) => (
                      <>
                        <div className="my-4">
                          nominee's ID:{" "}
                          <span className="font-semibold">{nominee.id}</span>
                        </div>
                        <div className="my-4">
                          nominee's name:{" "}
                          <span className="font-semibold">{nominee.name}</span>
                        </div>
                        <div className="my-4">
                          Date of Birth:{" "}
                          <span className="font-semibold">{nominee.dob}</span>
                        </div>
                        <div className="my-4">
                          Contact:{" "}
                          <span className="font-semibold">
                            {nominee.contact}
                          </span>
                        </div>
                        <div className="my-4">
                          Percentage:{" "}
                          <span className="font-semibold">
                            {nominee.percentage}%
                          </span>
                        </div>
                      </>
                    )
                  )}
                </div>
                <div className="my-6">
                  Proposed Monthly Contributions:{" "}
                  <span className="font-semibold">
                    {
                      application.application_meta
                        .proposed_monthly_contributions
                    }
                  </span>
                </div>
                <div className="my-6">
                  Amount in Words:{" "}
                  <span className="font-semibold">
                    {application.application_meta.amount_in_words}
                  </span>
                </div>
                <div className="my-6">
                  Application Date:{" "}
                  <span className="font-semibold">
                    {application.created_at}
                  </span>
                </div>
              </div>
            </div>
            {application.application_meta.review_status !== "approved" && (
              <div className="flex gap-10 justify-end items-center mt-3">
                <button
                  className="bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                  disabled={application.reviewed}
                  onClick={rejectMemberApplication}
                >
                  Reject
                </button>
                <button
                  className="bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2"
                  disabled={application.reviewed}
                  onClick={approveMember}
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
