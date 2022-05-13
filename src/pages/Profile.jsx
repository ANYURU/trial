import { FaRegEdit } from "react-icons/fa"
import profileImg from '../assets/images/abudi.png'
import { ConfirmModal } from "../components"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Formik, Form } from 'formik'
import { supabase } from "../helpers/supabase"
import { toBase64 } from "../helpers/toBase64"
import { toast, ToastContainer } from 'react-toastify'

function Profile() {
  const [ popUp, setPopUp ] = useState(false)
  const [ editPop, setEditPop ] = useState(false)
  const [ profile, setProfile ] = useOutletContext()
  const initialValues = {
    ...profile,
    password:''
  }
  const { id } = supabase.auth.user()


  return (
    <div className='h-full'>
      <ToastContainer />
      <h1 className="mb-5 mt-2 font-bold uppercase">Profile</h1>
      <div className="flex flex-col bg-white p-6 min-h-full">
        <div className='flex justify-between items-center mb-2'>
          <div className='h-16 w-16'>
            <img src={profile?.avatar ? profile.avatar : profileImg} width={100} height={100} className='rounded-full w-full h-full' alt="profile" />
          </div>
          <i className='text-white p-2 bg-primary rounded text-lg'
            onClick={() => setEditPop(true)}
          ><FaRegEdit /></i>
        </div>
        <div className='mb-3'>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Name</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>{profile?.fullname}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Telephone Number</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>{profile?.phone_number}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Email</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>{profile?.email_address}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Member Status</p>
            <div className='flex-grow flex'>
              <p className={`${profile?.member_status === 'active' ? 'bg-green-600' : 'bg-accent-red'} font-bold text-white px-3 py-1 rounded-md`}>{profile?.member_status}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Marital Status</p>
            <div className='flex-grow flex'>
            <p className='font-bold'>{profile?.marital_status}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Position in the SACCO</p>
            <div className='flex-grow flex'>
            <p className='font-bold'>{profile?.position_in_sacco}</p>
            </div>
          </div>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Applicant's Personal Information</h1>
            <form action="" className='m-2'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Old Password</label>
                <input type="text" name="" id="old_password" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onBlur={async ({ target: { value }}) => {
                  // supabase.rpc('check_password', { current_password: value, _user_id: id })
                  //   .then(({data}) => {
                  //     if ( data ) {
                  //       document.getElementById('new_password').disabled = false
                  //       document.getElementById('confirm_password').disabled = false
                  //     } else {
                  //       toast.error(`Wrong password.`, {position: "top-center"})
                  //       document.getElementById('new_password').disabled = true
                  //       document.getElementById('confirm_password').disabled = true
                  //     }  
                  //   })
                  //   .catch(error => toast.error(`${error?.message}`), {position: "top-center"})

                }} />
              </div>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>New Password</label>
                <input type="text" name="" id="new_password" placeholder='New Password' className='ring-1 ring-black rounded px-2 py-1' disabled="true"/>
              </div>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Confirm Password</label>
                <input type="text" name="" id="confirm_password" placeholder='Confirm Password' className='ring-1 ring-black rounded px-2 py-1' disabled="true"/>
              </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Danger Zone</h1>
            <div className='m-2 outline outline-1 p-2 rounded-md'>
            <h1>Self Termination</h1>
            <p>Self termination implies that you no longer subscribe to and therefore sieze being a member of Bweyogerere Tuberebumu sacco. If you’re sure that you want to terminate your membership, click terminate to terminate to proceed.</p>
            <div className='flex mt-1'>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Old Password</label>
                <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
              </div>
            </div>
            <div className='w-full flex justify-end'>
              <button className='text-white bg-accent-red px-4 py-1 rounded-md uppercase'
                onClick={() => setPopUp(true)}
              >Terminate</button>
              {popUp &&
                <ConfirmModal setPopUp={setPopUp}>
                  <h1 className="font-bold">Are you sure you want to terminate your account?</h1>
                  <p>If you terminate this account, you can’t recover it.</p>
                  <div className="flex justify-end gap-3 mt-3">
                    <button className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
                      onClick={() => setPopUp(false)}
                    >Cancel</button>
                    <button className="bg-accent-red px-3 py-1 outline outline-1 outline-accent-red rounded-md text-white">Terminate</button>
                  </div>
                </ConfirmModal>
              }
              {editPop &&
                <ConfirmModal setPopUp={setEditPop}>
                  <h1 className="font-bold">Edit</h1>
                  <Formik
                    initialValues={ initialValues }
                    onSubmit = { async ( values ) => {
                      const { password, name, dob, gender, email_address, phone_number, id_passport_number, present_address, marital_status, fathers_address, fathers_name, avatar } = values
                      supabase.rpc('check_password', { current_password: password, _user_id: id })
                        .then(async ({ data })  => {
                          if ( data ) {
                            // Do the logic that updates the values and resets the form.
                            // console.log("Got it")
                            const { error, data } = await supabase.from('members')
                              .update({ name: name, dob: dob, gender: gender, email_address: email_address, phone_number: phone_number, id_passport_number: id_passport_number, present_address: present_address, marital_status: marital_status, fathers_address: fathers_address, fathers_name:fathers_name, avatar: avatar })
                              .eq('id', id)
                              .single()

                              if ( error ) {
                                toast.error(`${error?.message}`, {position: "top-center"})
                              } else {
                                setEditPop(false)
                                setProfile({...profile, ...data})
                              }
                  
                          } else {
                            toast.error(`Wrong password.`, {position: "top-center"})
                          }
                        })
                        .catch(error => {
                            console.log(`Error ${error}`)
                        })
                    }}
                  >
                    {({ values, errors, touched, handleChange, handleBlur }) => {
                      return (
                        <Form>
                          <div className='mb-3 flex flex-wrap gap-3'>
                            <div className='flex flex-col'>
                              <p>Name</p>
                              <div className='flex-grow flex'>
                                <input type="text" name="fullname" id="fullname" placeholder='Enter full name' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.fullname}/>
                                {touched?.name && errors?.name && <div className="error">{errors?.name}</div>}
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <p>Date of Birth</p>
                              <div className='flex-grow flex'>
                                <input type="date" name="dob" id="dob" placeholder='DD/MM/YYYY' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.dob}/>
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
                                <input type="text" name="email_address" id="email_address" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.email_address}/>
                                {touched?.email_address && errors?.email_address && <div className="error">{errors?.email_address}</div>}
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <p className='w-6/12'>Phone Number</p>
                              <div className='flex-grow flex'>
                                <input type="text" name="phone_number" id="phone_number" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.phone_number}/>
                                {touched?.phone_number && errors?.phone_number && <div className="error">{errors?.phone_number}</div>}
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <p>ID/ Passport Number</p>
                              <div className='flex-grow flex'>
                                <input type="text" name="id_passport_number" id="id_passport_number" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.id_passport_number}/>
                                {touched?.id_passport_number && errors?.id_passport_number && <div className="error">{errors?.id_passport_number}</div>}
                              </div>
                            </div>
                          </div>

                          <div className='mb-3 flex flex-wrap gap-3'>
                            <div className='flex flex-col'>
                              <p>Present Address</p>
                              <div className='flex-grow flex'>
                                <input type="text" name="present_address" id="present_address" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.present_address}/>
                                {touched?.present_address && errors?.present_address && <div className="error">{errors?.present_address}</div>}
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <p>Marital Status</p>
                              <div className='flex-grow flex'>
                                <input type="text" name="marital_status" id="marital_status" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.marital_status}/>
                                {touched?.marital_status && errors?.marital_status && <div className="error">{errors?.marital_status}</div>}
                              </div>
                            </div>
                          </div>

                          <div className='mb-3 flex flex-wrap gap-3'>
                            <div className='flex flex-col'>
                              <p>Father's Name</p>
                              <div className='flex-grow flex'>
                                <input type="text" name="fathers_name" id="fathers_name" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.fathers_name}/>
                                {touched?.fathers_name && errors?.fathers_name && <div className="error">{errors?.fathers_name}</div>}
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <p>Father's Address</p>
                              <div className='flex-grow flex'>
                                <input type="text" name="fathers_address" id="fathers_address" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.fathers_address}/>
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
                                <input type="password" name="password" id="password" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' onChange={handleChange} onBlur={handleBlur} value={values?.password}/>
                                {touched?.dob && errors?.password && <div className="error">{errors?.password}</div>}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 mt-3">
                            <button 
                              className="bg-primary px-3 py-1 outline outline-1 outline-primary rounded-md text-white"
                              type='submit'
                            >Save</button>
                          </div>
                        </Form>
                      )}}
                  </Formik> 
                </ConfirmModal>
              }
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile