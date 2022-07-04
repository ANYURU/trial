import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/tube-no-bg.png";
import { validationSubmitSchema } from "../../helpers/validator";
import { Formik } from "formik";
import { PhoneTextField, Submit } from "../../components";
import { getOTP } from "../../helpers/getotp";
import { supabase } from "../../helpers/supabase";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { Spinner } from "../../components";

export default function SignUp() {
  const navigate = useNavigate();
  const { darkMode } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event, values) => {
    setLoading(true);
    event.preventDefault();
    const { phoneNo } = values;

    // Check if the phone number has really been used
    supabase.rpc('check_phone', { phone: `256${phoneNo.slice(1)}`, _at:'signup'})
    .then(({ data }) => {
      if ( data ) {
        toast.error(`Phone number has already been registered.`, {position: "top-center"})
        setLoading(false)
      }
      else {
        setLoading(false)
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
  }

  return (
    <div
      className={`inline-flex justify-center items-center w-screen h-screen font-montserrat ${
        darkMode ? "dark" : ""
      }`}
    >
      <ToastContainer />
      <Formik
        initialValues={{ phoneNo: "" }}
        validationSchema={validationSubmitSchema}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          dirty,
          handleChange,
          handleBlur,
        }) => {
          return (
            <form
              onSubmit={(event) => handleSubmit(event, values)}
              className="relative w-11/12 p-10 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white dark:bg-dark-bg-700 dark:text-secondary-text shadow-myShadow flex justify-center items-center flex-col rounded-lg"
            >
              {loading && (
                <div className="absolute z-10 bg-white dark:bg-dark-bg-700 dark:bg-opacity-90 bg-opacity-90 w-full h-full rounded-lg">
                  <Spinner />
                </div>
              )}
              <img src={logo} alt="SACCO logo" width={150} />
              <h2 className="block text-center font-bold">
                Enter phone number to Register
              </h2>
              <PhoneTextField
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required
              />
              <Submit value="Submit" disabled={!(isValid && dirty)} />

              <div className="flex justify-between w-full mt-3">
                <p>
                  <span>
                    <Link to="/">
                      Aleady have have an account?{" "}
                      <span className="text-primary font-semibold">Login.</span>
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
