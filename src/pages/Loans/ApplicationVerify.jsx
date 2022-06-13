
import { useState } from "react"
import { useOutletContext } from 'react-router-dom'
import { getOTP } from '../../helpers/getotp'
import { verifyOTP } from '../../helpers/verifyotp'
import { toast } from 'react-toastify'
import { supabase } from "../../helpers/supabase"
import { useAuth } from "../../auth/AuthContext"
import { uploadFile } from "../../helpers/uploadFile"
import { OTPBox } from "../../components"

function ApplicationVerify({ initialValues, setPageNumber, setInitialValues }) {
  
  const [ { phone_number, fullname: applicants_name, user_role } ] = useOutletContext()
  const { user: { id: applicants_id } } = useAuth()
  
  const defaultInitialValues = {
    applicant_name: applicants_name,
    applicant_id: applicants_id,
    position_in_sacco: user_role && user_role.roles.length === 1 ? 'member': '',
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
    ],
    a_years_cashflow:"",
    supporting_files:"",
    additional_files:"",
    bank_settlement:""
  }

  const uploadApplicationFiles = async () => {
    const { guarantors, bank_statement, a_years_cashflow, additional_files, supporting_files } = initialValues

    // Uploading the bank statement

    let allPromises = []
    if ( bank_statement ) {

      allPromises.push(
        uploadFile(bank_statement, 'loans')
          .then(({ Key: bank_settlement_url}) => {
            if(bank_settlement_url) {
              initialValues.bank_settlement_url= bank_settlement_url
              return true
            }
          })
          .catch(error => console.log(error))

      )

      // const { Key: bank_statement_url } = await uploadFile(bank_statement, 'loans') 
      // if ( bank_statement_url ) {
      //   initialValues.bank_statement = bank_statement_url
      // }

    }  
    
    // Uploading the cash flow
    if ( a_years_cashflow ) {
      allPromises.push(
        uploadFile(a_years_cashflow, 'loans')
          .then(({ Key: a_years_cashflow_url }) => {
            if(a_years_cashflow_url) {
              initialValues.a_years_cashflow_url = a_years_cashflow_url
              return true
            }
          })
          .catch(error => console.log(error))

      )
      // const { Key: a_years_cashflow_url } = await uploadFile(a_years_cashflow, 'loans')
      // if ( a_years_cashflow ) {
      //   initialValues.a_years_cashflow = a_years_cashflow_url
      
      // }

    }  

    // Uploading additional files.
    if ( additional_files ) {
      allPromises.push(
        uploadFile(additional_files, 'loans')
          .then(({ Key: additional_files_url }) => {
            if(additional_files_url) {
              initialValues.additional_files_url = additional_files_url
              return true
            }
          })
          .catch(error => console.log(error))

      )
      // const { Key: additional_files_url } = await uploadFile(additional_files, 'loans')
      // if ( additional_files_url ) {
      //   initialValues.additional_files_url = additional_files_url
        
      // }
    }  
    

    // uploading supporting files.
    if ( supporting_files ) {
      allPromises.push( 
        uploadFile(supporting_files, 'loans')
          .then(({ Key: supporting_files_url }) => {
          if ( supporting_files_url ) {
            initialValues.supporting_files_url = supporting_files_url
            return true
          }
        })
      )
    } 
    
    // uploading the gurantors finacial statements.
    const promises = await guarantors.map((guarantor, index) => {
      if( guarantor?.financial_statement ) {
        console.log(guarantor.financial_statement)
        return uploadFile( guarantor?.financial_statement, 'loans')
          .then(({ Key: guarantor_url }) => {
            if( guarantor_url) {
              initialValues.guarantors[index].financial_statement = guarantor_url
            }
          })
          .catch( error  => console.log(error))
      } 
    })

    return Promise.all([...allPromises, ...promises])
  }

  const handleSubmit = async (one_time_password) => {
    const verification_key = localStorage.getItem('loans_application_verification_key')
    // Destructuring files to upload in the loans bucket.
    // const { Key: url } = await uploadFile(evidence, 'deposits')


    verifyOTP( phone_number, one_time_password, verification_key)
      .then( response => response.json() )
      .then( async ( data) => {
        if (data?.Status === "Failure") {
          toast.error(`${data.Details}`, {position: "top-center"}) 

        } else {

          uploadApplicationFiles()
          .then( async data => {
            if ( data ) {
              const { data, error } = await supabase
                .from('applications')
                .insert(
                  [
                    {
                      _type: "loan",
                      created_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                      updated_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                      reviewed: false,
                      application_meta: {
                        applicants_id,
                        applicants_name,
                        ...initialValues
                      }
                    }
                  ]
                )
    
              if (error) {
                throw error
              } else {
                console.log(data)
                toast.success(`Loans application has been submitted for review.`, {position: 'top-center'})    
                setPageNumber(1)
                setInitialValues(defaultInitialValues)
              }
            }
          }) 
          .catch( error => console.log(error) ) 
        }
      })
      .catch( error => console.log(error))

  }

  const [ otp, setOtp ] = useState(["", "", "", "", "", ""])
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
        <h1 className='font-bold'>Verify your identity to confirm your submission</h1>
        <p className='text-sm'>An OTP has been sent to your phone number. Please enter a valid OTP to confirm submission.</p>
        <div className="flex flex-col justify-center items-center mt-5 p-5">
          {/* <input type="text" name="" placeholder='Enter OTP' className='ring-1 ring-black rounded px-2 py-1 mt-2 dark:bg-dark-bg-600 w-full'
          onChange={(event) => setOtp(event.target.value)}
           /> */}
           <OTPBox otp={otp} setOtp={setOtp} />
          {/* Send otp */}
          <button 
            className=' bg-primary rounded-sm border-0 px-4 py-1 mt-2 text-white w-full'
            type="button" 
            disabled={ otp?.length < 6 }
            onClick={ async () => {
              if ( otp ) {
                handleSubmit(otp)
              }
            }}
          >
            Verify
          </button>

          {/* OTP resend */}
          <button 
            className='w-full outline outline-1 outline-gray-400 rounded-sm px-3 py-1 mt-2 text-gray-400'
            type="button" 
            onClick={() => {
              getOTP( phone_number, "IDENTITY VERIFICATION" )
                .then( response => response.json() )
                .then( data => {
                  console.log(data)
                  localStorage.setItem('loans_application_verification_key', data?.Details)
                  return 
                })
                .catch( error => console.log( error ) )
            }}
          >
            Resend OTP
          </button>
        </div>
    </div>
  )
}

export default ApplicationVerify