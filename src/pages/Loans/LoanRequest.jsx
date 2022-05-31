import { ApplicationPg1, ApplicationPg2, ApplicationPg3, ApplicationPg4, ApplicationPg5, ApplicationVerify } from "."
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext } from "react-router-dom"

function LoanRequest() {
  const [ pageNumber, setPageNumber ] = useState(5)
  const [ profile ] = useOutletContext()

  const [initialValues, setInitialValues] = useState({
    applicant_name: profile.fullname,
    applicant_id: profile.id,
    position_in_sacco: profile?.user_role && profile?.user_role.roles.length === 1 ? 'member': '',
    postal_address: '',
    landline_number: '',
    marital_status: '',
    no_of_dependents: '',
    town: '',
    estate: '',
    street: '',
    house_no: '',
    ownership: '',
    years_spent: '',
    kin_name: '',
    kin_profession: '',
    kin_contact: '',
    spouse_name: '',
    spouse_profession: '',
    spouse_contact: '',
    employment: '',
    employer: '',
    employer_postal_address: '',
    employer_no: '',
    employer_designation: '',
    retirement_date: '',
    employment_type: '',
    business_type: '',
    years_of_operation: '',
    business_income: '',
    bank_settlement: '',
    asset1: '',
    asset2: '',
    asset3: '',
    loan_type: '',
    loan_purpose: '',
    amount: '',
    amount_in_words: '',
    months: '',
    securities: [],
    bank_loans: [
      {
        name: '',
        amount_advanced: '',
        date_granted: '',
        repayment_period: '',
        balance: ''
      },
      {
        name: '',
        amount_advanced: '',
        date_granted: '',
        repayment_period: '',
        balance: ''
      }
    ],
    guarantors: [
      {
        name: '',
        financial_statement: '',
        contact: ''
      },
      {
        name: '',
        financial_statement: '',
        contact: ''
      }
    ],
    securities_offered: [
      {
        shares: '',
        savings: '',
        others: ''
      }
    ]
  })

  console.log(initialValues)

return (
    <>
      <ToastContainer />
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">Loan Request</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
        <div className='flex flex-grow flex-col min-h-full'>
          {pageNumber === 1 &&
            <ApplicationPg1 profile={profile} initialValues={initialValues} setInitialValues={setInitialValues} setPageNumber={setPageNumber} />
          }
          {pageNumber === 2 &&
            <ApplicationPg2 profile={profile} initialValues={initialValues} setInitialValues={setInitialValues} setPageNumber={setPageNumber} />
          }
          {pageNumber === 3 &&
            <ApplicationPg3 initialValues={initialValues} setInitialValues={setInitialValues} setPageNumber={setPageNumber} />
          }
          {pageNumber === 4 &&
            <ApplicationPg4 initialValues={initialValues} setInitialValues={setInitialValues} setPageNumber={setPageNumber} />
          }
          {pageNumber === 5 &&
            <ApplicationPg5 initialValues={initialValues} setInitialValues={setInitialValues} setPageNumber={setPageNumber} fullname={profile.fullname} />
          }
          {pageNumber === 6 &&
            <ApplicationVerify initialValues={initialValues} setInitialValues={setInitialValues} setPageNumber={setPageNumber} />
          }
        </div>
      </div>
    </>
)
}

export default LoanRequest