import { Submit, Spinner } from "../../components";
import { Formik, Form } from "formik";
import { uploadFile } from "../../helpers/uploadFile";
import { supabase } from "../../helpers/supabase";
import { useAuth } from "../../auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { evidencedRequestValidationSchema as depositRequestValidationSchema } from "../../helpers/validator";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { add_separator, remove_separator } from '../../helpers/thousand_separator'

function MakeDeposit() {
  const [loading, setLoading] = useState(false);

  const {
    user: { id: applicants_id },
  } = useAuth();
  const [user,{ fullname: applicants_name }] = useOutletContext();

  const initialValues = {
    account_type: "",
    amount: "",
    phone_number: "",
    particulars: "",
    evidence: "",
  };


  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">Deposit</h1>
      <div className="flex bg-white overflow-hidden relative dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full w-full justify-center">
        {loading && (
          <div className="absolute z-10 bg-white dark:bg-dark-bg-700 dark:bg-opacity-90 bg-opacity-90 w-full h-full rounded-lg">
            <Spinner />
          </div>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            const {
              account_type,
              amount,
              phone_number,
              particulars,
              evidence,
            } = values;

            console.log(amount)

            try {
              const { Key: url } = await uploadFile(evidence, "deposits");
              const { error, data } = await supabase
                .from("applications")
                .insert([
                  {
                    _type: "deposit",
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
                      phone_number,
                      files: [
                        {
                          file_url: url,
                        },
                      ],
                      particulars,
                    },
                  },
                ]);

              if (error) throw error;

              resetForm({ values: initialValues });
              setLoading(false);
              toast.success(`Request submitted for review.`, {
                position: "top-center",
              });
            } catch (error) {
              setLoading(false);
              toast.error(`${error?.message}`, { position: "top-center" });
            }
          }}
          validationSchema={depositRequestValidationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            dirty,
            setFieldValue
          }) => {
            return (
              <Form>
                <div className="flex flex-grow flex-col min-h-full w-full">
                  <ToastContainer />

                  <div className="mb-3 flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-56">
                      <label className="text-sm">
                        Please select an account
                      </label>
                      <select
                        name="account_type"
                        id="account_type"
                        className="ring-1 ring-black rounded px-2 py-1 bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.account_type}
                      >
                        <option value="">--Select Account--</option>
                        <option value="savings">Savings</option>
                        <option value="shares">Shares</option>
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
                      <label className=" text-sm">Enter Amount</label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        placeholder="Enter amount"
                        className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                        onChange={(event) => {
                          let formatted_string = add_separator(remove_separator(event.target.value))
                          event.target.value = formatted_string
                          setFieldValue(event.target.name, parseFloat(remove_separator(formatted_string)))
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
                  <div className="mb-3 flex flex-col md:flex-row gap-5">
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
                    <div className="flex flex-col w-56 ">
                      <label className=" text-sm">Upload Receipt</label>
                      <input
                        type="file"
                        name="evidence"
                        id="evidence"
                        placeholder="Enter postal address"
                        className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                        onChange={(event) => {
                          values.evidence = event.currentTarget.files[0];
                        }}
                        onBlur={handleBlur}
                      />
                      {touched?.evidence && errors?.evidence && (
                        <div className="error text-red-600 text-xs">
                          {errors?.evidence}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h1 className="font-semibold">Particulars</h1>
                    <textarea
                      name="particulars"
                      id="particulars"
                      cols="30"
                      rows="10"
                      className="outline outline-1 rounded-md w-full p-2 dark:bg-dark-bg-600"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.particulars}
                    ></textarea>
                  </div>

                  <div className="flex justify-end w-full">
                    <div className="w-56">
                      <Submit value="Submit" disabled={!(isValid && dirty)} />
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default MakeDeposit;
