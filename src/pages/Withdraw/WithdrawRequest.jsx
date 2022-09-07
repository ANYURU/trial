import { Submit, Spinner } from "../../components";
import { Formik, Form } from "formik";
import { supabase } from "../../helpers/supabase";
import { useAuth } from "../../auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { nonEvidencedRequestValidationSchema as withdrawRequestValidationSchema } from "../../helpers/validator";
import { InputField } from "../../components/Form/CustomInputField";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { add_separator, remove_separator } from '../../helpers/thousand_separator'

function WithdrawRequest() {
  const {
    user: { id: applicants_id },
  } = useAuth();
  const [user, { fullname: applicants_name }] = useOutletContext();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    account_type: "",
    amount: "",
    particulars: "",
    cashout_method: "",
    phone_number: ""
  };

  return (
    <div className="flex-grow mx-5 my-2 h-[calc(100vh-70px)]">
      <ToastContainer />
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">
        Withdraw Request
      </h1>
      <div
        className={`flex bg-white relative dark:bg-dark-bg-700 dark:text-secondary-text min-h-full`}
      >
        {loading && (
          <div className="absolute z-10 bg-white dark:bg-dark-bg-700 dark:bg-opacity-90 bg-opacity-90 w-full h-full rounded-lg">
            <Spinner />
          </div>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={withdrawRequestValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            const { account_type, amount, particulars, cashout_method, phone_number } =
              values;

            try {
              const { error } = await supabase.from("applications").insert([
                {
                  _type: "withdraw",
                  created_at: new Date()
                    .toISOString()
                    .toLocaleString("en-GB", { timeZone: "UTC" }),
                  updated_at: new Date()
                    .toISOString()
                    .toLocaleString("en-GB", { timeZone: "UTC" }),
                  reviewed: false,
                  application_meta: {
                    applicants_id,
                    applicants_name,
                    account_type,
                    amount,
                    particulars,
                    cashout_method,
                    phone_number
                  },
                },
              ]);

              if (error) throw error;
              toast.success(`Request submitted for review.`, {
                position: "top-center",
              });
              resetForm({ values: initialValues });
              setLoading(false);
            } catch (error) {
              console.log(error);
              setLoading(false);
              toast.error(`${error?.message}`, { position: "top-center" });
            }
            
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            dirty,
            isValid,
            setFieldValue
          }) => {
            return (
              <Form className="flex flex-grow flex-col min-h-full p-6">
                <div className="mb-3">
                  <div className="flex flex-wrap gap-5">
                    <div className="flex flex-col w-56">
                      <label className="text-sm" htmlFor="account_type">
                        Please select an account
                      </label>
                      <select
                        name="account_type"
                        id="account_type"
                        className="ring-1 ring-black rounded px-2 py-1 bg-white dark:bg-dark-bg-600"
                        value={values?.account_type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">--Select Account--</option>
                        <option value="savings">Savings</option>
                        {/* <option value="shares">Shares</option> */}
                        <option value="fixed">Fixed</option>
                        <option value="mwana">Mwana</option>
                      </select>
                      {touched?.account_type && errors?.account_type && (
                        <div className="error text-red-600 text-xs">
                          {errors?.account_type}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-56 ">
                      <label htmlFor="amount" className=" text-sm">
                        Enter Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        placeholder="Enter amount to withdraw"
                        className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                        onChange={(event) => {
                          let formatted_string = add_separator(remove_separator(event.target.value))
                          event.target.value = formatted_string
                          setFieldValue(event.target.name, parseFloat(remove_separator(event.target.value)))
                        }}
                        onBlur={handleBlur}
                      />
                      {touched?.amount && errors?.amount && (
                        <div className="error text-red-600 text-xs">
                          {errors?.amount}
                        </div>
                      )}
                    </div>
                  
                  </div>
                </div>
                <div className="flex flex-wrap gap-5">
                  <div className="flex flex-col w-56">
                    <label className="text-sm">
                      Cashout Method
                    </label>
                    <select
                      name="cashout_method"
                      id="cashout_method"
                      className="ring-1 ring-black rounded px-2 py-1 bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cashout_method}
                    >
                      <option value="">--Select Method--</option>
                      <option value="Cash">Cash</option>
                      <option value="Mobile Money">Mobile Money</option>
                      <option value="Airtel Money">Airtel Money</option>
                      <option value="Cheque">Mwana</option>
                      <option value="EFT">EFT</option>
                      <option value="RTGS">RTS</option>
                    </select>
                    {touched?.account_type && errors?.account_type && (
                      <div className="error text-red-600 text-xs">
                        {errors?.account_type}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-56">
                    <label className="text-sm">Enter Phone Number</label>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      placeholder="Enter phone number"
                      className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone_number}
                    />
                    {touched?.phone_number && errors?.phone_number && (
                      <div className="error text-red-600 text-xs">
                        {errors?.phone_number}
                      </div>
                    )}
                  </div>
                </div>   
                <div className="my-3">
                  <h1 className="font-semibold">particulars</h1>
                  <textarea
                    name="particulars"
                    id="particulars"
                    cols="30"
                    rows="10"
                    className="outline outline-1 p-2 rounded-md w-full dark:bg-dark-bg-600"
                    value={values?.particulars}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {touched?.particulars && errors?.particulars && (
                    <div className="error text-red-600 text-xs">
                      {errors?.particulars}
                    </div>
                  )}
                </div>
                <div className="w-56">
                  <Submit value="Submit" disabled={!(dirty && isValid)} />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default WithdrawRequest;
