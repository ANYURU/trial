import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { verifyCodeSchema } from "../../helpers/validator";
import { Formik } from "formik";
import { VerificationCode, Submit } from "../../components";
import { verifyOTP } from '../../helpers/verifyotp'
import { toast, ToastContainer} from "react-toastify";
import {getOTP} from '../../helpers/getotp'

function Verification() {
  const navigate = useNavigate()
  const handleSubmit = async (event, values) => {
    event.preventDefault()
    const phoneNumber = localStorage.getItem('phone')
    const { code } = values
    verifyOTP(phoneNumber, code)
    .then(response => response.json())
    .then(data => data?.error ? toast.error(`${data.error}`, {position: "top-center"}) : data?.msg === true && navigate('/set-password'))
  }


  return (
    <>
      <ToastContainer />
      <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
        <Formik initialValues={{code: ''}} validationSchema={verifyCodeSchema} >
          {({values, errors, touched, handleChange, handleBlur}) => {
            return (
              <form onSubmit={(event) => handleSubmit(event, values)}  className='w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
                <img src={logo} alt='SACCO logo' width={150} />
                <h2 className='block text-center font-bold'>OTP has been sent to {localStorage.getItem('phone')}</h2>
                <VerificationCode errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
                <Submit value="Verify" disabled={Object.keys(errors).length === 0 ? false : true}/>

                <div className='flex justify-between w-full mt-3 text-sm'>
                  {/* <Link to="/sign-up" className="text-primary font-semibold">Resend Code</Link> */}
                  <button className="text-primary font-semibold"onClick={() => {
                    const phoneNo = localStorage.getItem('phone')
                    getOTP(phoneNo)
                  }}> Resend Code </button>
                  <Link to="/sign-up" className="text-primary font-semibold">Change Phone Number</Link>
                </div>

                <div className='flex justify-between w-full mt-3'>
                  <p>
                    <span>
                    <Link to="/">
                    Already have have an account? <span className="text-primary font-semibold">Login.</span>
                    </Link>
                    </span>
                  </p>
                </div>
              </form>
            )}}
      </Formik>
    </div>
  </>
  )
}

export default Verification