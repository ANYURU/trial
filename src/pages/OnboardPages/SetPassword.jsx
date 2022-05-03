import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { PasswordTextField, ConfirmPasswordField, Submit } from "../../components";
import { Formik } from "formik";
import { registerValidationSchema } from "../../helpers/validator";
import { useAuth } from "../../auth/AuthContext";

export default function SetPassword() {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleSubmit = async (event, values) => {
    event.preventDefault()

    const { error } = await signUp({
      phone: '+256' + localStorage.getItem('phone').slice(1),
      password: values.password
    })
  
    if(error) {
      console.log(error)
    } else {
      navigate('/dashboard') 
      localStorage.removeItem('phoneNumber')
    }
  }
  
  return (
    <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
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
    </div>
  )
}