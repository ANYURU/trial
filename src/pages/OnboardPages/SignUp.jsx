import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { validationSubmitSchema } from "../../helpers/validator";
import { Formik } from "formik";
import { PhoneTextField, Submit } from "../../components";
import { getOTP } from "../../helpers/getotp";
import { supabase } from "../../helpers/supabase";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate()
  
  const handleSubmit = async (event, values) => {
    event.preventDefault()
    const { phoneNo } = values

    // Check if the phone number has really been used
    supabase.rpc('does_phone_exist', { phone: `256${phoneNo.slice(1)}`})
      .then(({ data }) => {
        if ( data ) {
          toast.error(`Phone number has already been registered.`, {position: "top-center"})
        }
        else {

          localStorage.setItem('phone_number', phoneNo)
          navigate('/verify', { state: { type: "signup" } })
          
          getOTP( phoneNo, "VERIFICATION" )
            .then( response => response.json() )
            .then( data => {
              localStorage.setItem('verification_key', data?.Details)
              return 
            })
            .catch( error => console.log( error ) )
          }
        }
      )
      .catch(error => console.log(error))     
  }

  return (
    <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
      <ToastContainer />
      <Formik initialValues={{phoneNo: ''}} validationSchema={validationSubmitSchema} >
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <form onSubmit={(event) => handleSubmit(event, values)}  className='w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
              <img src={logo} alt='SACCO logo' width={150} />
              <h2 className='block text-center font-bold'>Enter phone number to Register</h2>
              <PhoneTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
              <Submit value="Submit" disabled={Object.keys(errors).length === 0 ? false : true}/>

              <div className='flex justify-between w-full mt-3'>
                <p>
                  <span>
                  <Link to="/">
                    Aleady have have an account? <span className="text-primary font-semibold">Login.</span>
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