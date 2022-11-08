import {
  ApplicationPg1,
  ApplicationPg2,
  ApplicationPg3,
  ApplicationPg4,
  ApplicationPg5,
  ApplicationVerify,
} from ".";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { Stepper } from "../../components";
import { supabase } from "../../helpers/supabase";

function LoanRequest() {
  const [pageNumber, setPageNumber] = useState(1);
  const [ user, profile] = useOutletContext();
  const [ counties, setCounties ] = useState([])
  const [ subCounties, setSubCounties ] =  useState([])
  const [ parishes, setParishes ] = useState([])
  const [ subParishes, setSubParishes ] = useState([])
  const [ profiles, setProfiles ] = useState([])
  const [ accountsInformation, setAccountsInformation ] = useState()

  
  useEffect(() => {
    getProfiles()
        .then(data => setProfiles(data))
        .catch(error => console.log(error))

    getAccountInformation().catch(error => console.log(error))

      
  }, [])

  const getProfiles = async() => {
      const {data, error } = await supabase.rpc('get_member_profiles') 

      if(error) throw error
      return data
  }

  const getAccountInformation = async () => {
    const { data, error } = await supabase.rpc("get_accounts_information");
    if (error) throw error;
    setAccountsInformation(data);
  };

  const [initialValues, setInitialValues] = useState({
    applicant_name: profile?.fullname,
    applicant_id: profile?.id,
    position_in_sacco: profile?.position_in_sacco,
    member_id: profile?.member_id,
    phone_number: profile?.phone_number,
    email_address: profile?.email_address,
    dob: profile?.dob,
    gender: profile?.gender,
    avatar: profile.avatar,
    postal_address: "",
    landline_number: "",
    marital_status: "",
    no_of_dependents: "",
    district: "",
    county: "",
    sub_county: "",
    parish: "",
    sub_parish:"",
    ownership: "",
    years_spent: "",
    kin_name: "",
    // kin_profession: "",
    kin_contact: "",
    spouse_name: "",
    // spouse_profession: "",
    spouse_contact: "",
    employment: "employed",
    employer: "",
    employer_postal_address: "",
    employer_no: "",
    employer_designation: "",
    retirement_date: "",
    employment_type: "",
    type_of_employment: "",
    business_type: "",
    years_of_operation: "",
    business_income: "",
    asset1: "",
    asset2: "",
    asset3: "",
    loan_type: "",
    existing_loan: "",
    loan_purpose: "",
    amount: "",
    amount_in_words: "",
    months: "",
    repayment_method: "",
    securities: [],
    bank_loans: [
      {
        name: "",
        amount_advanced: "",
        date_granted: "",
        repayment_period: "",
        balance: "",
      },
      {
        name: "",
        amount_advanced: "",
        date_granted: "",
        repayment_period: "",
        balance: "",
      },
    ],
    guarantors: [
      {
        name: "",
        // financial_statement: "",
        contact: "",
      },
      {
        name: "",
        // financial_statement: "",
        contact: "",
      },
    ],
    securities_offered: [
      {
        shares: "",
        savings: "",
        others: "",
      },
    ],
    a_years_cashflow: "",
    supporting_files: "",
    additional_files: "",
    bank_settlement: "",
  });

  return (
    
    <div className="flex-grow sm:mx-2 md:mx-5 my-2 h-[calc(100vh-70px)]">
      <ToastContainer />
      <div className="flex flex-col justify-between pb-3 md:h-[60px]">
        <h1 className="mb-5 font-bold uppercase dark:text-white">
          Loan Request
        </h1>
      </div>
      <div className="flex flex-col bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full md:h-[calc(100%-80px)]">
        <Stepper pageNumber={pageNumber} />
        <br />
        <div className="flex flex-col w-full md:h-[calc(100%-140px)] overflow-y-auto pb-5 px-1 mt-2">
          {pageNumber === 1 && (
            <ApplicationPg1
              profile={profile}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              setPageNumber={setPageNumber}
              counties={counties}
              setCounties={setCounties}
              subCounties={subCounties}
              setSubCounties={setSubCounties}
              parishes={parishes}
              setParishes={setParishes}
              subParishes={subParishes}
              setSubParishes={setSubParishes}
            />
          )}
          {pageNumber === 2 && (
            <ApplicationPg2
              profile={profile}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              setPageNumber={setPageNumber}
            />
          )}
          {pageNumber === 3 && (
            <ApplicationPg3
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              setPageNumber={setPageNumber}
            />
          )}
          {pageNumber === 4 && (
            <ApplicationPg4
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              setPageNumber={setPageNumber}
              profiles={profiles}
            />
          )}
          {pageNumber === 5 && (
            <ApplicationPg5
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              setPageNumber={setPageNumber}
              fullname={profile.fullname}
            />
          )}
          {pageNumber === 6 && (
            <ApplicationVerify
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              setPageNumber={setPageNumber}
              accountsInformation={accountsInformation}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanRequest;
