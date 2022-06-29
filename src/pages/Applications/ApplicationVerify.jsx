import { useState } from "react"
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getOTP } from '../../helpers/getotp'
import { verifyOTP } from '../../helpers/verifyotp'
import { toast, ToastContainer } from 'react-toastify'
import { OTPBox } from "../../components"
import { addMember } from "../../helpers/addMember"

function ApplicationVerify({ values, password, setPassword, setInitialValues }) {

    console.log(values)
    const [ otp, setOtp ] = useState(["", "", "", "", "", ""])
    const { phone_number } = values
    const [ { fullname: administrator }] = useOutletContext()
    const navigate = useNavigate()
    const defaultInitialValues = {
        fullname:'',
        dob:'',
        gender:'',
        present_address:'',
        email_address:'',
        phone_number:'',
        id_passport_number:'',
        marital_status:'',
        fathers_name:'',
        fathers_address:'',
        income_sources: {
          status:'',
          employed:{
            employers_name: '',
            employers_address:'',
            position:'',
            work_station:'',
            gross_monthly_income:'',
            appointment_date:'',
            payroll_number:'',
            source_of_income:''  
          }, 
          business: {
            business_name: '',
            business_address: '',
            business_location: '',
            other_income_sources: '',
          }
        },
        nominees: [
          {
            name:'',
            id:'',
            contact:'',
            dob:'',
            percentage:''
          }
        ],
        proposed_mode_of_remittances: {
          standing_order:false,
          direct_debit:false,
          date_effective: '',
          others: ''
        },
        proposed_monthly_contributions:'', 
        amount_in_words:'',
      }

    const handleSubmit = async ( one_time_password ) => {
        const verification_key = localStorage.getItem('verification_key')
        console.log(verification_key)
        console.log(phone_number)

        verifyOTP( phone_number, one_time_password, verification_key )
            .then( response => response.json())
            .then( async data => {
                console.log(data)
                addMember(`256${phone_number.slice(1)}`, password, values, administrator)
                .then( response => response.json())
                .then( data => {
                    console.log(data)
                    toast.success(`Member has successfully been created.`, { position:"top-center" })
                    setPassword("")
                    setInitialValues(defaultInitialValues)
                    navigate(-1)
                })
                .catch( error => console.log( error )) 
                
                console.log(data)
            })
            .catch(error => console.log( error ))   
    }
    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <ToastContainer />
            <h1 className='font-bold'>Verify member's to confirm your submission</h1>
            <p className='text-sm'>An OTP has been sent to your phone number. Please enter a valid OTP to confirm submission.</p>
            <div className="flex flex-col justify-center items-center mt-5 p-5">
            <OTPBox otp={otp} setOtp={setOtp} />
            <button 
                className=' bg-primary rounded-sm border-0 px-4 py-1 mt-2 text-white w-full'
                type="button" 
                disabled={ otp?.length < 6 }
                onClick={ async () => {
                if ( otp ) {
                    console.log(values)
                    handleSubmit(otp.join(""))
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