import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { validationSubmitSchema } from "../../helpers/validator";
import { Formik } from "formik";
import { PhoneTextField, Submit } from "../../components";

function Verification() {

  const navigate = useNavigate()
  const handleSubmit = (event, values) => {
    event.preventDefault()
    navigate('/set-password')
  }


  return (
    <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
      <Formik initialValues={{phoneNo: ''}} validationSchema={validationSubmitSchema} >
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <form onSubmit={(event) => handleSubmit(event, values)}  className='w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
              <img src={logo} alt='SACCO logo' width={150} />
              <h2 className='block text-center font-bold'>OTP has been sent to 075****</h2>
              <PhoneTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
              <Submit value="Verify" disabled={Object.keys(errors).length === 0 ? false : true}/>

              <div className='flex justify-between w-full mt-3 text-sm'>
                <Link to="/sign-up" className="text-primary font-semibold">Resend Code</Link>
                <Link to="/sign-up" className="text-primary font-semibold">Change Phone Number</Link>
              </div>

              <div className='flex justify-between w-full mt-3'>
                <p>
                  <span>
                  <Link to="/">
                  Aleady have have an account?,<span className="text-primary font-semibold">Login.</span>
                  </Link>
                  </span>
                </p>
              </div>
            </form>
          )}}
    </Formik>
  </div>
  )
}

export default Verification