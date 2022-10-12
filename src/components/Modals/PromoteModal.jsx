import ConfirmModal from "./ConfirmModal";
import { useState, useEffect } from "react";
import { supabase } from "../../helpers/supabase";
import { toast } from "react-toastify";
import { Formik, Field, Form, useFormikContext } from "formik";
import * as yup from 'yup'

const roles = {
  chairperson: "chairperson",
  vice_chairperson: "vice chairperson",
  treasurer: "treasurer",
  asst_treasurer: "assistant treasurer",
  c_credits: "chairperson credits",
  vc_credits: "vice chairperson credits",
  secretary: "secretary",
  ass_secretary: "assistant secretary"
}


const initialValues = {
  role: ''
}

const AutoSubmitRole = () => {
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    if(values?.role) submitForm()

    console.log("Auto submit values: ",values)
  }, [values, submitForm])

  return null;
}

function PromoteModal({ setPromoteModal, member }) {
  const [ role, setRole ] = useState('')

  const promoteMember = async () => {
    const { error, data } = await supabase
      .from("new_members")
      .update({"roles": ["member", "admin", role], "position_in_sacco": roles[role]})
      .eq("id", member.id);

    if (error){
      toast.error(`Promotion Failed.`, { position: "top-center" });
    }
    else {
      toast.success(`Promoted ${member.fullname}.`, { position: "top-center" });
    }
  };

  

  

  const RoleSelect = ({field, form, props}) => {
    return <select {...field} {...props} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary">
      {
        !role && 
        <option value="">--Role--</option>
      }
      <option value="chairperson" className="capitalize text-m">Chairperson</option>
      <option value="vice_chairperson" >Vice Chairperson</option>
      <option value="treasurer" >Treasurer</option>
      <option value="asst_treasurer" >Assistant Treasurer</option>
      <option value="c_credits" >Chairperson Credits</option>
      <option value="vc_credits" >Vice Chairperson Credits</option>
      <option value="secretary" >Secretary</option>
      <option value="asst_secretary" >Assitant Secretary</option>
    </select>
  }


  return (
    <ConfirmModal setPopUp={setPromoteModal}>
      <h1 className="font-bold"> Select a role to proceed</h1>
      <div className="mt-1 mb-4">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, {resetForm}) => {

            console.log("During Submission?", values)
            setRole(values.role)
            resetForm(initialValues)
          }}
          validationSchema={
            yup.object().shape({
              role: yup.string().required('Please select a role.')
            })
          }
        >
          {
            () => {
              return (
                <Form>
                  <Field as="select" name="role" component={RoleSelect}>
                  </Field>
                  <AutoSubmitRole />
                </Form>
              )
            }
          }
        </Formik>
      </div>
      {
         <div className={`${role ? "visible" : "invisible h-1"}`}>
          <h1 className="font-bold">Are you sure?</h1>
          <p>
            {member.fullname.toUpperCase()} will be promote to {['a','e','i','o','u'].includes(role[0]) ? 'an ' : 'a '}<span className={"capitalize"}>{roles[role]}</span>.
          </p>  
          <div className="flex justify-end gap-3 mt-3">
            <button
              className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
              onClick={() => {
                setPromoteModal(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                promoteMember();
                setPromoteModal(false);
              }}
              className="bg-primary px-3 py-1 outline outline-1 outline-primary  rounded-md text-white"
            >
              Promote
            </button>
          </div>
        </div>
      }
    </ConfirmModal>
  );
}

export default PromoteModal;
