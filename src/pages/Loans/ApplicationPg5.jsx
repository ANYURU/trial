import { Formik, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { InputField } from '../../components/Form/CustomInputField'

export default function ApplicationPg5({ fullname, initialValues, setInitialValues, setPageNumber }) {

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
            setInitialValues(values)
            setPageNumber(6)
        }}
      >
        {({values, errors, touched, handleChange, handleBlur}) => {

  return (
    <Form>
        <div className='mb-5'>
            <h1 className='font-semibold'>DECLARATION OF THE BORROWER</h1>
            <p>I <span className='font-bold'> &nbsp; {fullname} &nbsp; </span> declare the information given herein is true to the best of my knowledge. I further authorize Bweyogerere Tuberebumu Sacco to verify the information given herein and make reference from any person(s) and or institution herein</p>

            <div className='flex gap-1'>
                <input type="checkbox" id='declaration' name="declare" value="declare" required />
                <label className='text-sm' htmlFor='declaration'>Accept</label>
            </div>
        </div>

        <div className='mb-5'>
            <h1 className='font-semibold'>Security Offered for the Loan</h1>
            <div className='flex flex-wrap gap-5'>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="securities_offered[0].shares" label="Shares" placeholder="Enter shares" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="securities_offered[0].savings" label="Savings" placeholder="Enter savings" />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="securities_offered[0].other" label="other" placeholder="Enter savings" />

            </div>
        </div>
        
        <div className='mb-5'>
            <h1 className='font-semibold'>DELIVERING FINANCIAL FREEDOM</h1>
            <div className='outline outline-1 rounded my-2 p-3 max-h-52 overflow-auto'>
                <p>
                I hereby declare the foregoing particulars are true to the best of my knowledge and belief and I agree to abide by the By-laws of <b>Bweyogerere Tuberebumu Sacco</b>, loan policy.
                I also understand that the basic rules applicable to this application are listed and understand the loan will be granted according to these rules.
                <br />
                <br />
                <span className='ml-5'>
                    1. I confirm that I have authorized <b>Bweyogerere Tuberebumu Sacco Society</b> to access my credit profile and that this profile can be delivered to their e-mail/postal address as indicated herein and authorize ...........................................................(BANK) to mail/deliver/send my credit report to the email/postal address indicated herein.
                    I release Bweyogerere Tuberebumu Sacco and its officers, employees and agents from all claims, actions or proceedings of whatsoever nature and howsoever arising, suffered or incurred in connection with......................................(Bank sending/delivering/mailing my credit report to the address that I have provided.
                    <br />
                    2. Members are limited to two (2) times the sum of shares and deposits held, but subject to availability of funds.
                    <br />
                    3. Loans shall be made to registered members only i.e. one must have paid the stipulated registration/admission requirements (entrance fees/minimum shares etc) and submitted all
                    <br />
                    4. No member will be permitted to suffer total deduction (including Savings, Loan repayment and interest) in excess of two thirds of his/her basic salary/income.
                    <br />
                    5. A member will be required to maintain a monthly share/deposit contribution depending on loan repayment period and loan amount contribution subject to the current requirements based on loan applied for and the repayment period.
                    <br />
                    6. Outstanding loans must have been cleared before a new loan is granted OR as per the standing policy guiding respective loan products. Members must read and adhere to loan conditions of respective products.
                    <br />
                    7. Members must have contributed for a minimum period of six consecutive months having a minimum share of 3% of once basic salary or Ug Shs 120,000 whichever is higher.
                    <br />
                    8. Emergency and school fees loans will be granted with a maximum repayment of 6 months and must be supported by documentary evidence. School fees loans shall be paid directly to the school.
                    <br />
                    9. The guarantors must be members of Bweyogerere Tuberebumu Sacco.
                    <br />
                    10. Lump sum contribution for the purpose of securing a loan shall be considered only if such money
                    remains in the Sacco for at least six (6) months.
                    <br /><br />
                    11. Lump sum loan repayment for the purpose of borrowing a new loan will have to wait for a period
                    of three (3) months.
                    <br />
                    12. The amount of loan taken is subject to an interest of <b>3% per month</b> charged as per reducing
                    balance of the total amount taken with an exception of payment of only one (1) month from the time the money is given out plus a maximum payback period of ten (10) months. Note; Loan application fee of <b>Shs 10,000</b> and process fee of 1% shall be paid as well.
                    <br />
                    13. A member who withdraws from the society and rejoins later will be treated as a new member for the purpose of this loan policy.
                    <br />
                    14. Employees of a SACCO society shall be eligible for membership but are not eligible to become members of a management committee or any other sub-committee in the same society.
                    <br />
                    15. Loans for senior management staff shall be approved by the full management committee only. The loans officer shall be constantly monitoring the performance of loans granted to the society employees.
                    <br />
                    16. Loans will be granted according to the applicant’s qualifications based on character, ability to repay and in observance of applicable laws, rules and regulation.
                    <br />
                    17. The Society reserves the right to grant or deny a loan despite the formula based on eligibility.
                    <br />
                    18. In case of default in payment, the entire balance of the loan will immediately become due and payable at the discretion of the Board and all shares owned by the member and any interest and
                    <br />
                    deposits will due to the member will be off set against owned amount. The member will also be liable for any costs incurred in the collection by the debt collector for the loan balance and accumulated interest. Any remaining balance will be deducted from member’s salary or terminal benefits and the employer is authorized to make all necessary deduction by authority of the member’s signature appended below.
                    <br />19. In case the loan is fully paid before the agreed period (below 50% of the total months) previously requested; the borrower shall be charged 50% of the remaining interest.
                    <br />20. In case the member delays to repay the monthly fee as per this loan agreement, he/she shall pay an extra 50% of the interest of that month.
                    <br />21. The borrower shall be required to pay interest and not less than 50% of the Sacco money to be returned every month.
                    <br />22. Application must be received in the Sacco’s office on or before 10th of every month or last working day of 10th falls on a weekend or Public holiday. Attached shall be ; filled in loan application (picked from secretary or downloaded from Sacco facebook group; link from: https://www.facebook.com/groups/404767256339820/files/) , photocopies of member’s Sacco identification card, a statement of the member’s transaction with Sacco, and photocopy of filled in fields of the log book.
                    <br />23. All Sacco deposits to be made in any <b>DFCU Bank</b> Branch to the Sacco account number <b>01071113177640</b> in the names of Bweyogerere Tuberebumu Sacco.
                </span>
                </p>
            </div>

            <div className='flex flex-col w-56 m-2 '>
                <div className='flex gap-1'>
                    <input type="checkbox" id="accept_terms" name="accept" value="accept" required />
                    <label className='text-sm' htmlFor='accept_terms'>Accept</label>
                </div>
            </div>
        </div>
        <div className='flex justify-between w-full'>
            <button
                type="button"
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                onClick={() => setPageNumber(4)}
            >Back</button>
            <input
                type="submit"
                value='Verify'
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                // onClick={() => {
                //   setPageNumber(pageNumber + 1)
                // }}
            />
        </div>
    </Form>
  )}}
  </Formik>
    )
}