import { Link } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { otpValidationSchema } from "../../helpers/validator";
import { Formik } from "formik";
import { Submit } from "../../components";
import OTPTextField from "../../components/Form/OTPTextField";



export default function Verify() {
  const handleSubmit = async (event, values) => {
    event.preventDefault()
    console.log(values.otp)
   
  }

  return (
    <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
      <Formik initialValues={{otp: ''}} validationSchema={otpValidationSchema} >
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <form onSubmit={(event) => handleSubmit(event, values)}  className='w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
              <img src={logo} alt='SACCO logo' width={150} />
              <h2 className='block text-center font-bold'>OPT has been sent to ******</h2>
              <OTPTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
              <Submit value="Verify" disabled={Object.keys(errors).length === 0 ? false : true}/>

              <div className='flex justify-between w-full mt-3 text-sm'>
                <button onClick={() => {
                    // Call the send endpoint to generate the code and update it.

                }} className="text-primary font-semibold">Resend code</button>
                <Link to="/signup" className="text-primary font-semibold">Change Phone number</Link>
              </div>
              <div className="mt-3"><Link  to="/login">Already have an account? <span className="text-primary font-semibold">Log In</span></Link></div>
            </form>
          )}}
    </Formik>
  </div>
  )
}