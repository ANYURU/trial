import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { PhoneTextField, PasswordTextField, Submit } from "../../components";
import { Formik } from "formik";
import { validationSchema } from "../../helpers/validator";
import { useAuth } from "../../auth/AuthContext";
import { toast, ToastContainer } from 'react-toastify'
import { Loader } from "../../components";
import { supabase } from "../../helpers/supabase";

export default function Login() {
  const navigate = useNavigate()

  const { loading, signIn, setUser } = useAuth()

  const handleSubmit = async (event, values) => {
    event.preventDefault()
    const { phoneNo, password } = values

    supabase.rpc('does_phone_exist', { phone: `256${phoneNo.slice(1)}`})
      .then(async ({ data }) => {
        if ( data ) {
          const { error } = await signIn({  
            phone: '256'+ phoneNo.slice(1),
            password: password
          })

          if ( error ) {
            toast.error(`${error?.message}`, { position: "top-center" })
          } else {
            navigate('/dashboard')
          }
        } else {
          toast.error(`User does not exist.`, { position: "top-center" })
        }
      })
  }

  return (
    <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
      {loading && <Loader />}
      <ToastContainer/>
      <Formik initialValues={{ phoneNo: '', password: ''}} validationSchema={validationSchema}>
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <form onSubmit={(event) => handleSubmit(event, values)} className='w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
              <img src={logo} alt='SACCO logo' width={150} />
              <h1 className='block text-center font-bold text-2xl uppercase'>login</h1>
              <PhoneTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
              <PasswordTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
              <Submit value="Login" disabled={Object.keys(errors).length === 0 ? false : true} />
              <div className='flex justify-between w-full mt-3 text-sm'>
                <Link to="/sign-up">Don't have an account? <span className="text-primary font-semibold">SignUp.</span></Link>
                <Link to="/forgot-password" className="text-primary font-semibold">Forgot Password?</Link>
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}