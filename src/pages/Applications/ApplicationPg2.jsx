import { Nominee } from "../../components";
import { InputField } from "../../components/Form/CustomInputField";
import { Formik, Form } from "formik";
import { member2ValidationSchema } from "../../helpers/validator";
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom'
import { supabase } from "../../helpers/supabase"
import { useAuth } from "../../auth/AuthContext"
import { getOTP } from "../../helpers/getotp"
import { toast } from "react-toastify"
import { useState } from "react";
import PasswordGenerator from "../../components/Form/PasswordGenerator"

function ApplicationPg2({ initialValues, setInitialValues, pageNumber, setPageNumber, password, setPassword }) {
    console.log(initialValues)
  const {
    proposed_monthly_contributions,
    amount_in_words,
  } = initialValues;

  const location = useLocation()
  const { user : { id: applicants_id } } = useAuth()
  const [ profile, setProfile ] = useOutletContext()
  const navigate = useNavigate()

  const handleSubmit = async ( values ) => {
    console.log("Values", values)
    setInitialValues({ ...initialValues, ...values })
    const { fullname: applicants_name, phone_number, ...rest } = values

    try {
      if ( location.state?.from === "/members" ) {

        console.log("here")
        getOTP( phone_number, "VERIFICATION" )
          .then( response => response.json() )
          .then( data => {
            localStorage.setItem('verification_key', data?.Details)
            console.log(values)
            setPageNumber(pageNumber + 1)
            return 
          })
          .catch( error => console.log( error ))     


        
      } 

      else {
        const { error, data } = await supabase
          .from('applications')
          .insert(
            [
              {
                _type: "membership",
                created_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                updated_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                reviewed: false,
                application_meta: {
                  applicants_id,
                  applicants_name,
                  ...rest,
                  ...values
                }
              }
            ]
          )
          .single()

          console.log(data)

        if (error) { 
          throw error 
        } else {
          setInitialValues({ values: initialValues })
          toast.success(`Membership submitted for review`, {position:'top-center'})
          
          const { data, error } = await supabase
            .from('_member_profiles')
            .select()
            .eq('id', applicants_id)
            .single();

          if( error ) {
            throw error
          } else {
            setProfile(data)
            navigate('/dashboard')  
          }               
        }
      } 
    } catch ( error ) {
      // handle the errors depending on error status codes & give appropriate messages to the users
      toast.error(`${error?.message}`, {position:'top-center'})
      console.log(error)
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={member2ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <div className="mb-3">
            <div className="flex flex-wrap gap-5">
              <InputField
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                reference="proposed_monthly_contributions"
                label="Proposed Monthly Contributions"
                placeholder="Monthly contributions"
                defaultValue={proposed_monthly_contributions}
                type="text"
              />
              <InputField
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                reference="amount_in_words"
                label="Amount in words"
                placeholder="Enter amount in words."
                defaultValue={amount_in_words}
                type="text"
              />
            </div>
          </div>
          <div className="mb-3">
            <h1 className="font-semibold">
              Proposed Mode of Remittances-check off
            </h1>
            <div className="flex flex-wrap gap-5">
              <div className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  name="proposed_mode_of_remittances[standing_order]"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultChecked={initialValues.proposed_mode_of_remittances?.standing_order || false}
                />
                <label htmlFor="">Standing Order</label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  name="proposed_mode_of_remittances[direct_debit]"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultChecked={initialValues.proposed_mode_of_remittances?.direct_debit || false}
                />
                <label htmlFor="">Direct Debit</label>
              </div>
              <InputField
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                reference="proposed_mode_of_remittances[others]"
                label="Specify Others"
                placeholder="Enter other modes"
                defaultValue={initialValues.proposed_mode_of_remittances?.others || ""}
                type="text"
              />
              <InputField
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                reference="proposed_mode_of_remittances[date_effective]"
                label="Effective Date (dd/mm/yyyy)"
                placeholder="dd/mm/yyyy"
                defaultValue={initialValues.proposed_mode_of_remittances?.date_effective}
                type="date"
              />
            </div>
          </div>
          <Nominee
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
            {
              location.state?.from === "/members" && <div><PasswordGenerator password={password} setPassword={setPassword}/></div>
            }
            <div className="flex justify-between w-full">
                <input
                    type="submit"
                    value='Previous'
                    className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                    onClick={(event) => {
                        event.preventDefault()
                        setInitialValues({...initialValues, ...values})
                        setPageNumber(pageNumber - 1)
                    }}
                />
                <button 
                    type='submit'
                    className='outline outline-primary outline-2 text-white bg-primary px-4 py-1 rounded-lg cursor-pointer'
                    disabled={location.state?.from === "/member" && !password ? true : false}
                >submit</button>
            </div>
        </Form>
      )}
    </Formik>
  );
}

export default ApplicationPg2;
