import { Submit } from "../../components";
import { Formik, Form } from "formik";
import { uploadFile } from "../../helpers/uploadFile";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../helpers/supabase";
import { useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { evidencedRequestValidationSchema as loanPaymentRequestValidationSchema } from "../../helpers/validator";
import { useEffect, useState } from "react";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { add_separator, remove_separator } from '../../helpers/thousand_separator'

function LoanPayment() {
  // Will be used later
  const { id } = useParams();

  useEffect(() => {
    getApplications();
  }, []);

  const [loan, setLoan] = useState({});

  const {
    user: { id: applicants_id },
  } = useAuth();
  const [user, { fullname: applicants_name }] = useOutletContext();

  const initialValues = {
    account_type: "",
    amount: "",
    phone_number: "",
    evidence: "",
    comments: "",
  };

  const getApplications = async () => {
    const { error, data } = await supabase.from("loans").select().eq("id", id);
    console.log(loan)
    setLoan(data[0]);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loanPaymentRequestValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        const { account_type, amount, phone_number, comments, evidence } =
          values;

        console.log(amount)

        try {
          const { Key: url } = await uploadFile(evidence, "loans");
          const { error, data } = await supabase.from("applications").insert([
            {
              _type: "payment",
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
                // later use
                // loan_id,
                amount,
                phone_number,
                files: [
                  {
                    file_url: url,
                  },
                ],
                comments,
              },
            },
          ]);

          if (error) throw error;

          console.log(data);
          resetForm({ values: initialValues });
          toast.success(`Request submitted for review.`, {
            position: "top-center",
          });
        } catch (error) {
          console.log(error);
        }
      }}
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
          <Form className="mx-5 my-2 h-[calc(100vh-70px)]">
            <ToastContainer />
            <h1 className="mb-3 mt-2 font-bold uppercase dark:text-white">
              Loan Payment
            </h1>
            <div className="flex flex-col bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
              <div className="m-2">
                <label>
                  Total Amount To Pay:{" "}
                  <span className="font-bold">
                    {currencyFormatter(loan?.outstanding_balance)}
                  </span>
                </label>
              </div>

              <div className="m-2 flex flex-wrap gap-5 h-16">
                <div className="flex flex-col w-56 ">
                  <label htmlFor="amount" className=" text-sm">
                    Enter Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    placeholder="Enter Amount"
                    className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                    onChange={(event) => {
                      let formatted_string = add_separator(remove_separator(event.target.value))
                      event.target.value = formatted_string
                      setFieldValue(event.target.name, parseFloat(remove_separator(event.target.value)))
                    }}
                    onBlur={handleBlur}
                    // value={values.amount}
                  />
                  {touched?.amount && errors?.amount && (
                    <div className="error text-red-600 text-xs">
                      {errors?.amount}
                    </div>
                  )}
                </div>
              </div>

              <div className="mx-2 my-1">
                <div className="flex flex-wrap gap-5 h-20">
                  <div className="flex flex-col w-56">
                    <label htmlFor="phone_number" className="text-sm">
                      Enter Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      placeholder="Enter phone number"
                      className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.phone_number}
                    />
                    {touched?.phone_number && errors?.phone_number && (
                      <div className="error"></div>
                    )}
                  </div>
                  <div className="flex flex-col w-56 ">
                    <label htmlFor="evidence" className=" text-sm">
                      Upload Receipt
                    </label>
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
              </div>
              <div className="mb-2">
                <h1 className="font-semibold">Comments</h1>
                <textarea
                  name="comments"
                  id="comments"
                  cols="20"
                  rows="10"
                  className="outline outline-1 p-2 rounded-md w-full dark:bg-dark-bg-700"
                  onChange={handleChange("comments")}
                  value={values?.comments}
                ></textarea>
              </div>
              <div className="w-56">
                <input
                  type="submit"
                  value="submit"
                  className="bg-primary inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2 w-full mt-1 cursor-pointer"
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoanPayment;
