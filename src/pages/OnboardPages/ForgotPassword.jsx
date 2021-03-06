import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/tube.png'
import { validationSubmitSchema } from "../../helpers/validator";
import { Formik } from "formik";
import { PhoneTextField, Submit } from "../../components";

export default function ForgotPassword() {
  const navigate = useNavigate()
  const handleSubmit = (event, values) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className=" inline-flex justify-center items-center w-screen h-screen font-montserrat">
      <Formik initialValues={{phoneNo: ''}} validationSchema={validationSubmitSchema} >
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <form onSubmit={(event) => handleSubmit(event, values)}  className='w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white shadow-myShadow flex justify-center items-center flex-col rounded-lg'>
              <img src={logo} alt='SACCO logo' width={150} />
              <h2 className='block text-center font-bold'>Enter phone number to reset Password</h2>
              <PhoneTextField errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />
              <Submit value="Submit" disabled={Object.keys(errors).length === 0 ? false : true}/>

              <div className='flex justify-between w-full mt-3'>
                <p>
                  <span>
                  <Link to="/">
                  Remember password,<span className="text-primary font-semibold">Login.</span>
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