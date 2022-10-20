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
import { useEffect } from "react";


function MakeDeposit() {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([])

  const {
    user: { id: applicants_id },
  } = useAuth();
  const [user,{ fullname: applicants_name }, setProfile, roles] = useOutletContext();

  useEffect(
    () => {
      getProfiles()
      .then(data => setProfiles(data))
      .catch(error => console.log(error))


      // Realtime setup
      const mySubscription = supabase
      .from('_member_profiles')
      .on('*', async payload => {
        console.log('Change received!', payload)

        await getProfiles()
          .then(data => setProfiles(data))
          .catch(error => console.log(error))
      })
      .subscribe()

      // Cleanup
      return () => supabase.removeSubscription(mySubscription)
    }, [])

  const getProfiles = async() => {
    const {data, error } = await supabase.rpc('get_member_profiles') 

    if(error) throw error
    return data
  }

  console.log(roles)

  const initialValues = {
    account_type: "",
    amount: "",
    comments: "",
    evidence: "",
    designated_for:"own",
    member_id:""
  };


  return (
    <div className="mx-5 my-2 h-[calc(100vh-70px)]">
      <h1 className="mb-5 mt-2 font-bold uppercase dark:text-white">Deposit</h1>
      <div className="flex bg-white overflow-hidden relative dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full w-full justify-start">
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
              comments,
              evidence,
    

            } = values;

            console.log(values)

            try {
              const { Key: url } = await uploadFile(evidence, "deposits");

              if( values.designated_for === "other") {
                const details = {
                  ...values,
                  file_url: url,
                  _type: "deposit",
                  created_at: new Date()
                        .toISOString()
                        .toLocaleString("en-GB", { timeZone: "UTC" }),
                  updated_at: new Date()
                  .toISOString()
                  .toLocaleString("en-GB", { timeZone: "UTC" })
                }

                const { data, error } = await supabase.rpc('deposit_for_member', {details: JSON.stringify(details)})
                if (error) throw error

                resetForm({ values: initialValues });
                setLoading(false);
                toast.success(`${data?.transaction_meta?.member_name}'s deposit created successfully.`, {
                  position: "top-center",
                });

              } else {

                const { error } = await supabase
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
                        files: [
                          {
                            file_url: url,
                          },
                        ],
                        comments,
                        review_status:'pending'
                      },
                    },
                  ]);

                if (error) throw error;

                resetForm({ values: initialValues });
                setLoading(false);
                toast.success(`Request submitted for review.`, {
                  position: "top-center",
                });
              }
            } catch (error) {
              setLoading(false);
              console.log(error)
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
              <Form className="w-full">
                <div className="flex flex-grow flex-col min-h-full w-full">
                  <ToastContainer />
                  <div className="mb-3 flex flex-col md:flex-row gap-5 ">
                    {
                      roles && roles.includes('treasurer') && 
                      <div className='flex flex-col w-56 pb-3'>
                        <label className='text-sm'>Designated for</label>
                        <div className='flex justify-between'>
                            <div className='flex gap-1'>
                                <input type="radio" id="own" name="designated_for" value="own" className='w-4 h-4' onChange={handleChange("designated_for")}/>
                                <label htmlFor="own" className='text-sm'>My Own</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" id="other" name="designated_for" value="other" className='w-4 h-4' onChange={handleChange("designated_for")}/>
                                <label htmlFor="other" className='text-sm'>Other Member</label>
                            </div>
                        </div>
                      </div>
                    }
                    {
                      values?.designated_for === "other" && 
                      <div className="flex flex-col w-56">
                        <label className="text-sm">
                          Select Member
                        </label>
                        <select
                          name="member_id"
                          id="member_id"
                          className="ring-1 ring-black rounded px-2 py-1 bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                          onChange={(event) => {
                            console.log(event.target.value)
                            values.member_id = event.target.value
                          }}
                          onBlur={handleBlur}
                          // value={values.member_id}
                        >
                          <option value="">--Select Member--</option>
                        {
                          profiles && profiles.map(({fullname, id}, index) => {
                            return  <option key={index} value={ id } className="capitalize">{ fullname }</option>
                          })
                        

                        }
                        </select>
                        {touched?.account_type && errors?.account_type && (
                          <div className="error text-red-600 text-xs">
                            {errors?.member_id}
                          </div>
                        )}
                      </div>
                    }
                    {
                      console.log(values.designated_for)
                    }
                  </div>
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
                    <h1 className="font-semibold">Comments</h1>
                    <textarea
                      name="comments"
                      id="comments"
                      cols="30"
                      rows="10"
                      className="outline outline-1 rounded-md w-full p-2 dark:bg-dark-bg-600"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.comments}
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
