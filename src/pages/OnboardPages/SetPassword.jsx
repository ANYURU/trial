import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { PasswordTextField, ConfirmPasswordField, Submit } from "../../components";
import { Formik } from "formik";
import { registerValidationSchema } from "../../helpers/validator";
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from "../../auth/AuthContext";



export default function SetPassword() {
  const navigate = useNavigate()
  

  const { setUser } = useAuth()

  const handleSubmit = (event, values) => {
    event.preventDefault()
    // check if passwords are the same
    if ( values.password === values.confirmPassword){
      setUser({
        phoneNo: '0750118523',
        password: 'passwd123',
        email: 'charleskasasira01@gmail.com',
        memberStatus: 'inactive',
        maritalStatus: 'single',
        saccoPosition: 'member',
        role: 'member'
    },)
      navigate('/dashboard')
    }
    else {
      toast.error(`Password didn't match`, {position: "top-center"})
    }
    // navigate('/dashboard')
  }

  return (
    <>
      <ToastContainer/>
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
    </>
  )
}