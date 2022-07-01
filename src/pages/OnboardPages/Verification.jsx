import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/tube-no-bg.png";
import { verifyCodeSchema } from "../../helpers/validator";
import { Formik } from "formik";
import { VerificationCode, Submit } from "../../components";
import { verifyOTP } from "../../helpers/verifyotp";
import { toast, ToastContainer } from "react-toastify";
import { getOTP } from "../../helpers/getotp";
import { useAuth } from "../../auth/AuthContext";
import { useState } from "react";
import { OTPBox } from "../../components";
import { Spinner } from "../../components";

function Verification() {
  const navigate = useNavigate()
  const location = useLocation()
  const type = location?.state?.type
  const [ loading, setLoading ] = useState(false)
  const [ otp, setOtp ] = useState(["", "", "", "", "", ""])
  const darkMode = localStorage.getItem("darkMode")
 
  const handleSubmit = async (event, values) => {
    event.preventDefault();
  }
  return (
    <div
      className={`inline-flex justify-center items-center w-screen h-screen font-montserrat ${
        darkMode ? "dark" : ""
      } `}
    >
      <ToastContainer />
      <Formik initialValues={{ code: "" }} validationSchema={verifyCodeSchema}>
        {({ values, errors, touched, handleChange, handleBlur }) => {
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
              <img src={logo} alt="SACCO logo" width={120} />
              <h2 className="block text-center">
                OTP has been sent to{" "}
                <span className="font-bold">
                  {localStorage.getItem("phone_number")}
                </span>
              </h2>
              {/* <VerificationCode errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} /> */}
              <OTPBox otp={otp} setOtp={setOtp} />
              <Submit
                value="Verify"
                disabled={Object.keys(errors).length === 0 ? false : true}
              />

              <div className="flex justify-between w-full mt-3 text-sm">
                {/* <Link to="/sign-up" className="text-primary font-semibold">Resend Code</Link> */}
                <button
                  className="text-primary font-semibold"
                  type="button"
                  onClick={() => {
                    const phoneNo = localStorage.getItem("phone_number");
                    getOTP(phoneNo, "VERIFICATION")
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data);
                        localStorage.setItem("verification_key", data?.Details);
                        return;
                      })
                      .catch((error) => console.log(error));
                  }}
                >
                  {" "}
                  Resend Code{" "}
                </button>
                <Link to="/sign-up" className="text-primary font-semibold">
                  Change Phone Number
                </Link>
              </div>

              <div className="flex justify-between w-full mt-3">
                <p>
                  <span>
                    <Link to="/">
                      Already have have an account?{" "}
                      <span className="text-primary font-semibold">Login</span>.
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

export default Verification;
