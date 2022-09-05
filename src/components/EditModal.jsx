import { Formik, Form } from "formik";
import { supabase } from "../helpers/supabase";
import { toBase64 } from "../helpers/toBase64";
import { ConfirmModal } from "../components";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "./Loaders/Spinner";
import * as Yup from "yup";
import { InputField } from "./Form/CustomInputField";

function EditModal({ setEditPop }) {
  const [user, profile, setProfile ]= useOutletContext();
  const initialValues = {
    ...profile,
    password: "",
  };
  const { id } = supabase.auth.user();
  const [loading, setLoading] = useState(false);

  return (
    <ConfirmModal setPopUp={setEditPop}>
      {loading && (
        <div className="absolute left-0 top-0 bottom-0 bg-white dark:bg-dark-bg-700 dark:bg-opacity-90 bg-opacity-90 w-full h-full rounded-lg ">
          <Spinner />
        </div>
      )}
      <h1 className="font-bold dark:text-white">Edit Details</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          password: Yup.string()
            .trim()
            .min(8, "Password must be atleast 8 characters")
            .required("Password is required"),
        })}
        onSubmit={async (values) => {
          const {
            password,
            name,
            dob,
            gender,
            email_address,
            phone_number,
            id_passport_number,
            present_address,
            marital_status,
            fathers_address,
            fathers_name,
            avatar,
          } = values;

          setLoading(true);
          supabase
            .rpc("check_password", { current_password: password, _user_id: id })
            .then(async ({ data }) => {
              if (data) {
                const { error, data } = await supabase
                  .from("members")
                  .update({
                    name: name,
                    dob: dob,
                    gender: gender,
                    email_address: email_address,
                    phone_number: phone_number,
                    id_passport_number: id_passport_number,
                    present_address: present_address,
                    marital_status: marital_status,
                    fathers_address: fathers_address,
                    fathers_name: fathers_name,
                    avatar: avatar,
                  })
                  .eq("id", id)
                  .single();

                if (error) {
                  setLoading(false);
                  toast.error(`${error?.message}`, { position: "top-center" });
                } else {
                  // setLoading(false)
                  // setEditPop(false)
                  // setProfile({...profile, ...data})
                }
              } else {
                setLoading(false);
                toast.error(`Wrong password.`, { position: "top-center" });
              }
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.log(`Error ${error}`);
            });
            
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => {
          return (
            <Form className="">
              <div className="mb-3 flex flex-wrap gap-3">
                <InputField
                  label="Full Name"
                  id="fullname"
                  reference="fullname"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values?.fullname}
                />

                <div className="flex flex-col">
                  <p>Date of Birth</p>
                  <div className="flex-grow flex w-56">
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      placeholder="DD/MM/YYYY"
                      className="ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.dob}
                    />
                    {touched?.dob && errors?.dob && (
                      <div className="error">{errors?.dob}</div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="">Gender</label>
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        value="Male"
                        name="gender"
                        id=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.gender === "Male"}
                      />
                      <label htmlFor="">Male</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        value="Female"
                        name="gender"
                        id=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values?.gender === "Female"}
                      />
                      <label htmlFor="">Female</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <InputField
                  label="Email Address"
                  id="email_address"
                  reference="email_address"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values?.email_address}
                />
              </div>

              <div className="mb-3 flex flex-wrap gap-3">
                <InputField
                  label="Phone Number"
                  id="phone_number"
                  reference="phone_number"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values?.phone_number}
                />

                <InputField
                  label="ID/ Passport Number"
                  id="id_passport_number"
                  reference="id_passport_number"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  value={values?.id_passport_number}
                />
              </div>

              <div className="mb-3 flex flex-wrap gap-3">
                <InputField
                  label="Present Address"
                  id="present_address"
                  reference="present_address"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />

                <InputField
                  label="Marital Status"
                  id="marital_status"
                  reference="marital_status"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              </div>

              <div className="mb-3 flex flex-wrap gap-3">
                <InputField
                  label="Father's Name"
                  id="fathers_name"
                  reference="fathers_name"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <InputField
                  label="Father's Address"
                  id="fathers_address"
                  reference="fathers_address"
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              </div>

              <div className="mb-3 flex flex-wrap gap-3">
                <div className="flex flex-col">
                  <p>Upload Photo</p>
                  <div className="flex-grow flex">
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      placeholder="Avatar"
                      className="ring-1 ring-black rounded px-2 py-1"
                      onChange={async (event) => {
                        const file = event.target.files[0];
                        const fileString = await toBase64(file);
                        values.avatar = fileString;
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* <div className='mb-3 flex flex-wrap gap-3'> */}
              {/* <div className='flex flex-col'> */}
              {/* <p>Enter password to save changes</p>
                  <div className='flex-grow flex'> */}
              {/* <input type="password" name="password" id="password" placeholder='Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.password}/>
                    {touched?.password && errors?.password && <div className="error">{errors?.password}</div>} */}
              <InputField
                label="Enter password to save changes"
                id="password"
                reference="password"
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                type="password"
              />
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}

              <div className="flex justify-end gap-3 mt-3">
                <input
                  className="bg-primary px-3 py-1 outline outline-1 outline-primary rounded-md text-white"
                  type="submit"
                  value="Save"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </ConfirmModal>
  );
}

export default EditModal;
