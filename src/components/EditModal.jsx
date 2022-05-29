import React from 'react'
import { Formik, Form } from 'formik'
import { supabase } from "../helpers/supabase"
import { toBase64 } from "../helpers/toBase64"
import { ConfirmModal } from "../components"
import { useOutletContext } from "react-router-dom"
import { toast } from 'react-toastify'
import { useState } from 'react'
import Loader from './Loader'

function EditModal({ setEditPop }) {
  const [ profile ] = useOutletContext()
  const initialValues = {
    ...profile,
    password:''
  }
  const { id } = supabase.auth.user()
  const [ loading, setLoading ] = useState(false)


  return (
    <ConfirmModal setPopUp={setEditPop} >
      <h1 className="font-bold dark:text-white">Edit</h1>
      
      <Formik
        initialValues={ initialValues }
        onSubmit = { async ( values ) => {
          const { password, name, dob, gender, email_address, phone_number, id_passport_number, present_address, marital_status, fathers_address, fathers_name, avatar } = values

          setLoading(true)
          supabase.rpc('check_password', { current_password: password, _user_id: id })
            .then(async ({ data })  => {
              if ( data ) {
                const { error, data } = await supabase.from('members')
                  .update({ name: name, dob: dob, gender: gender, email_address: email_address, phone_number: phone_number, id_passport_number: id_passport_number, present_address: present_address, marital_status: marital_status, fathers_address: fathers_address, fathers_name:fathers_name, avatar: avatar })
                  .eq('id', id)
                  .single()
                    
                  if ( error ) {
                    setLoading(false)
                    toast.error(`${error?.message}`, {position: "top-center"})
                  } else {
                    // setLoading(false)
                    // setEditPop(false)
                    // setProfile({...profile, ...data})
                  }
      
              } else {
                setLoading(false)
                toast.error(`Wrong password.`, {position: "top-center"})
              }
              setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(`Error ${error}`)
            })
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => {
          return (
            <Form>
            {!loading ?
              <>
              <div className='mb-3 flex flex-wrap gap-3'>
                <div className='flex flex-col'>
                  <p>Name</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="fullname" id="fullname" placeholder='Enter full name' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.fullname}/>
                    {touched?.name && errors?.name && <div className="error">{errors?.name}</div>}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p>Date of Birth</p>
                  <div className='flex-grow flex'>
                    <input type="date" name="dob" id="dob" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.dob}/>
                    {touched?.dob && errors?.dob && <div className="error">{errors?.dob}</div>}
                  </div>
                </div>
                <div>
                  <label htmlFor="">Gender</label>
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <input type="radio" value='Male' name="gender" id="" onChange={handleChange} onBlur={handleBlur} checked={values?.gender === 'Male'}/>
                      <label htmlFor="">Male</label>
                    </div>
                    <div className="flex gap-2">
                      <input type="radio" value='Female' name="gender" id="" onChange={handleChange} onBlur={handleBlur} checked={values?.gender === "Female"}/>
                      <label htmlFor="">Female</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mb-3 flex flex-wrap gap-3'>
                <div className='flex flex-col lg:w-8/12 sm:w-10/12 md:w-8/12'>
                  <p className='w-6/12'>Email Address</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="email_address" id="email_address" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600'  onChange={handleChange} onBlur={handleBlur} value={values?.email_address}/>
                    {touched?.email_address && errors?.email_address && <div className="error">{errors?.email_address}</div>}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p className='w-6/12'>Phone Number</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="phone_number" id="phone_number" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.phone_number}/>
                    {touched?.phone_number && errors?.phone_number && <div className="error">{errors?.phone_number}</div>}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p>ID/ Passport Number</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="id_passport_number" id="id_passport_number" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.id_passport_number}/>
                    {touched?.id_passport_number && errors?.id_passport_number && <div className="error">{errors?.id_passport_number}</div>}
                  </div>
                </div>
              </div>

              <div className='mb-3 flex flex-wrap gap-3'>
                <div className='flex flex-col'>
                  <p>Present Address</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="present_address" id="present_address" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.present_address}/>
                    {touched?.present_address && errors?.present_address && <div className="error">{errors?.present_address}</div>}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p>Marital Status</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="marital_status" id="marital_status" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.marital_status}/>
                    {touched?.marital_status && errors?.marital_status && <div className="error">{errors?.marital_status}</div>}
                  </div>
                </div>
              </div>

              <div className='mb-3 flex flex-wrap gap-3'>
                <div className='flex flex-col'>
                  <p>Father's Name</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="fathers_name" id="fathers_name" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.fathers_name}/>
                    {touched?.fathers_name && errors?.fathers_name && <div className="error">{errors?.fathers_name}</div>}
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p>Father's Address</p>
                  <div className='flex-grow flex'>
                    <input type="text" name="fathers_address" id="fathers_address" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.fathers_address}/>
                    {touched?.fathers_address && errors?.fathers_address && <div className="error">{errors?.fathers_address}</div>}
                  </div>
                </div>
              </div>

              <div className='mb-3 flex flex-wrap gap-3'>
                <div className='flex flex-col'>
                  <p>Upload Photo</p>
                  <div className='flex-grow flex'>
                    <input type="file" name="avatar" id="avatar" placeholder='Avatar' className='ring-1 ring-black rounded px-2 py-1' onChange={async ( event ) => {
                      const file = event.target.files[0]
                      const fileString = await toBase64(file)
                      values.avatar = fileString
                    }} />
                  </div>
                </div>
              </div>

              <div className='mb-3 flex flex-wrap gap-3'>
                <div className='flex flex-col'>
                  <p>Enter password to save changes</p>
                  <div className='flex-grow flex'>
                    <input type="password" name="password" id="password" placeholder='Password' className='ring-1 ring-black rounded px-2 py-1 focus:ring focus:outline-none focus:ring-primary dark:bg-dark-bg-600' onChange={handleChange} onBlur={handleBlur} value={values?.password} required/>
                    {touched?.dob && errors?.password && <div className="error">{errors?.password}</div>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <input 
                  className="bg-primary px-3 py-1 outline outline-1 outline-primary rounded-md text-white"
                  type='submit'
                  value='Save'/>
              </div>
              </>
              :
                    <div>
                      <Loader />
                    </div>
              }
            </Form>
          )}}
      </Formik> 
      
    </ConfirmModal>
  )
}

export default EditModal