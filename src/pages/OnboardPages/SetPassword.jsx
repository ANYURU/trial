import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { PasswordTextField, ConfirmPasswordField, Submit } from "../../components";
import { Formik } from "formik";
import { registerValidationSchema } from "../../helpers/validator";
import { useAuth } from "../../auth/AuthContext";
import { toast, ToastContainer} from "react-toastify";
import { updatePassword } from "../../helpers/updatePassword";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SetPassword() {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const location = useLocation()
  const [ doneSetting, setDoneSetting ] = useState(false)

  const handleSubmit = async (event, values) => {
    event.preventDefault()
    const phoneNo = '256'+localStorage.getItem('phone_number').slice(1)
    const { password } = values

    if ( location.state.type === "signup" ) {

      console.log(phoneNo)
      console.log(password)
      const { error, data } = await signUp({
        phone: phoneNo,
        password: password
      })

      // console.log(data)
    
      if( error ) {
        toast.error(`${error?.message}`, {position: "top-center"})
        console.log(error)
      } else {
        navigate('/dashboard') 
        localStorage.removeItem('phone_number')
        localStorage.removeItem('verification_key')
      }
    } 
    else {
      updatePassword( phoneNo, password )
        .then( ( response ) => response.json() )
        .then( ( data ) => {
          if ( data?.Status === "Failure" ) {
            toast.error(`${data?.Details}`, { position: "top-center"})
          } else {
            toast.success(`${ data?.Details}`, { position: "top-center"})
            setDoneSetting(true)
          }
        })

    }

  }
  
  return (
    <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
      <ToastContainer />
      <>
        {
          doneSetting 
          ? 
          <Link to="/">Your password has successfully been reset. Click <span className="text-primary font-semibold">Login</span> to login.</Link>
          :
          <Formik initialValues={{ password: '', confirmPassword: ''}} validationSchema={registerValidationSchema}>
            {({values, errors, touched, handleChange, handleBlur}) => {
              return (
                <form onSubmit={(event) => handleSubmit(event, values)} className='w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
                  <img src={logo} alt='SACCO logo' width={150} />
                  <h1 className='block text-center font-bold text-2xl'>Set New Password</h1>
                  <div className="w-full">
                      <label htmlFor="" className="text-left">Enter new Password</label>
                      <PasswordTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
                  </div>
                  <div className="w-full">
                      <label htmlFor="" className="text-left">Retype new Password</label>
                      <ConfirmPasswordField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
                  </div>
                  <Submit value="Submit" disabled={Object.keys(errors).length === 0 ? false : true} />
                </form>
              )
            }}
          </Formik>
        }
        
      </>
    </div>
  )
}