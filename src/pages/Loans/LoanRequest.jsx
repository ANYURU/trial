import {
  ApplicationPg1,
  ApplicationPg2,
  ApplicationPg3,
  ApplicationPg4,
  ApplicationPg5,
  ApplicationVerify,
} from ".";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { Stepper } from "../../components";

function LoanRequest() {
  const [pageNumber, setPageNumber] = useState(1);
  const [user, profile] = useOutletContext();

  const [initialValues, setInitialValues] = useState({
    applicant_name: profile.fullname,
    applicant_id: profile.id,
    position_in_sacco:
      profile?.user_role && profile?.user_role.roles.length === 1
        ? "member"
        : "",
    postal_address: "",
    landline_number: "",
    marital_status: "",
    no_of_dependents: "",
    town: "",
    estate: "",
    street: "",
    house_no: "",
    ownership: "",
    years_spent: "",
    kin_name: "",
    kin_profession: "",
    kin_contact: "",
    spouse_name: "",
    spouse_profession: "",
    spouse_contact: "",
    employment: "",
    employer: "",
    employer_postal_address: "",
    employer_no: "",
    employer_designation: "",
    retirement_date: "",
    employment_type: "",
    business_type: "",
    years_of_operation: "",
    business_income: "",
    asset1: "",
    asset2: "",
    asset3: "",
    loan_type: "",
    loan_purpose: "",
    amount: "",
    amount_in_words: "",
    months: "",
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
        financial_statement: "",
        contact: "",
      },
      {
        name: "",
        financial_statement: "",
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
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanRequest;
