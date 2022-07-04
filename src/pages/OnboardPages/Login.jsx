import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube-no-bg.png'
import { PhoneTextField, PasswordTextField, Submit } from "../../components";
import { Formik, Form } from "formik";
import { validationSchema } from "../../helpers/validator";
import { useAuth } from "../../auth/AuthContext";
import { toast, ToastContainer } from 'react-toastify'
import { Loader, Spinner } from "../../components";
import { supabase } from "../../helpers/supabase";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Bweyogere tuberebumu'
  }, [])

  const { signIn, darkMode } = useAuth()
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (event, values) => {
    setLoading(true)
    event.preventDefault()
    const { phoneNo, password } = values

    supabase.rpc('check_phone', { phone: `256${phoneNo.slice(1)}`, _at:'login'})
    .then(async ({ data, error }) => {
      if ( error ) {
        setLoading(false)
        toast.error(`${error?.message}`, {position: "top-center"})
      } else if ( data ) {
        const { error } = await signIn({
          phone: '256' + phoneNo.slice(1),
          password: password
        })

        setLoading(false)
        if (error) {
          toast.error(`${error?.message}`, {position: "top-center"})
        } else { 
          navigate('/dashboard')
        }
      } else {
        setLoading(false)
        toast.error(`User does not exist.`, {position: "top-center"})
      }
    }).catch(error => console.log(error))
    
  }

  return (
      <div className={`inline-flex justify-center items-center w-screen  h-screen font-montserrat ${darkMode ? "dark" : ""}`}>
          <ToastContainer/>
          
          <Formik initialValues={{ phoneNo: '', password: ''}} validationSchema={validationSchema}>
            {({values, errors, touched, isValid, dirty, handleChange, handleBlur}) => {
              return (
                <Form onSubmit={(event) => handleSubmit(event, values)} className='relative w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white dark:bg-dark-bg-700 dark:text-secondary-text shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
                  {loading && 
                    <div className="absolute z-10 bg-white dark:bg-dark-bg-700 dark:bg-opacity-90 bg-opacity-90 w-full h-full rounded-lg">
                      <Spinner />
                    </div>
                  }
                  <img src={logo} alt='SACCO logo' width={120} />
                  <h1 className='block text-center font-bold text-2xl uppercase dark:text-white'>login</h1>
                  <PhoneTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
                  <PasswordTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
                  <Submit value="Login" disabled={!(isValid && dirty)} />
                  <div className='flex justify-between w-full mt-3 text-sm'>
                    <Link to="/sign-up">Don't have an account? <span className="text-primary font-semibold">SignUp.</span></Link>
                    <Link to="/forgot-password" className="text-primary font-semibold">Forgot Password?</Link>
                  </div>
                </Form>
              )
            }}
          </Formik>
      </div>
  )
}