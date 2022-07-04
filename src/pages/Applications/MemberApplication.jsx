import { useState } from "react";
import ApplicationPg1 from "./ApplicationPg1";
import ApplicationPg2 from "./ApplicationPg2";
import { supabase } from "../../helpers/supabase";
import { useAuth } from "../../auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { getOTP } from "../../helpers/getotp";
import PasswordGenerator from "../../components/Form/PasswordGenerator";
import ApplicationVerify from "./ApplicationVerify";

function MemberApplication() {
  const [pageNumber, setPageNumber] = useState(1);
  const [profile, setProfile] = useOutletContext();
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    fullname: "",
    dob: "",
    gender: "",
    present_address: "",
    email_address: "",
    phone_number: "",
    id_passport_number: "",
    marital_status: "",
    fathers_name: "",
    fathers_address: "",
    income_sources: {
      status: "",
      employed: {
        employers_name: "",
        employers_address: "",
        position: "",
        work_station: "",
        gross_monthly_income: "",
        appointment_date: "",
        payroll_number: "",
        source_of_income: "",
      },
      business: {
        business_name: "",
        business_address: "",
        business_location: "",
        other_income_sources: "",
      },
    },
    nominees: [
      {
        name: "",
        id: "",
        contact: "",
        dob: "",
        percentage: "",
      },
    ],
    proposed_mode_of_remittances: {
      standing_order: false,
      direct_debit: false,
      date_effective: "",
      others: "",
    },
    proposed_monthly_contributions: "",
    amount_in_words: "",
  });

  const {
    user: { id: applicants_id },
  } = useAuth();

  const handleSubmit = async (values) => {
    const { fullname: applicants_name, phone_number, ...rest } = values;
    console.log(values);

    try {
      if (location.state.from === "/members") {
        getOTP(phone_number, "VERIFICATION")
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("verification_key", data?.Details);
            console.log(values);
            setPageNumber(pageNumber + 1);
            return;
          })
          .catch((error) => console.log(error));
      } else {
        const { error } = await supabase
          .from("applications")
          .insert([
            {
              _type: "membership",
              created_at: new Date()
                .toISOString()
                .toLocaleString("en-GB", { timeZone: "UTC" }),
              updated_at: new Date()
                .toISOString()
                .toLocaleString("en-GB", { timeZone: "UTC" }),
              reviewed: false,
              application_meta: {
                applicants_id,
                applicants_name,
                ...rest,
              },
            },
          ])
          .single();

        if (error) {
          throw error;
        } else {
          setInitialValues({ values: initialValues });
          toast.success(`Membership submitted for review`, {
            position: "top-center",
          });

          const { data, error } = await supabase
            .from("_member_profiles")
            .select()
            .eq("id", applicants_id)
            .single();

          if (error) {
            throw error;
          } else {
            setProfile(data);
            navigate("/dashboard");
          }
        }
      }
    } catch (error) {
      // handle the errors depending on error status codes & give appropriate messages to the users
      toast.error(`${error?.message}`, { position: "top-center" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex-grow sm:mx-2 md:mx-5 my-2 h-[calc(100vh-70px)] dark:text-secondary-text">
        <div className="flex flex-col justify-between pb-3 md:h-[60px]">
          <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
            Membership Application
          </h1>
        </div>

        <div className="bg-white overflow-hidden  relative  md:h-[calc(100%-80px)] dark:bg-dark-bg-700 p-6">
        <div className="w-full overflow-x-auto h-full  relative overflow-y-auto p-2">
          <div className="flex flex-grow flex-col min-h-full">
            {pageNumber === 1 && (
              <ApplicationPg1
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
              />
            )}
            {pageNumber === 2 && (
              <ApplicationPg2
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                password={password}
                setPassword={setPassword}
              />
            )}
            {pageNumber === 3 && (
              <ApplicationVerify
                values={initialValues}
                password={password}
                setPassword={setPassword}
                setInitialValues={setInitialValues}
              />
            )}
            <div className="flex justify-end w-full">
              {/* {
                pageNumber === 2 
                &&
                <input
                  type="submit"
                  value='Previous'
                  className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                  onClick={(event) => {
                    event.preventDefault()
                    setPageNumber(pageNumber - 1)
                  }}
                />
              }
              {
                pageNumber === 2 
                &&
                <div className='flex justify-end w-full'>
                  <button 
                    type='submit'
                    onClick={handleSubmit}
                    className='outline outline-primary outline-2 text-white bg-primary px-4 py-1 rounded-lg cursor-pointer'
                  >submit</button>
                </div>
              } */}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default MemberApplication;
