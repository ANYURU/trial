import { Formik, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"
import { loan1ValidationSchema } from '../../helpers/validator'
import { InputField } from '../../components/Form/CustomInputField'

export default function ApplicationPg1({ profile, initialValues, setInitialValues, setPageNumber }) {

    const navigate = useNavigate()

    return (
      
      <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
            setInitialValues(values)
            setPageNumber(2)
        }}
        validationSchema={loan1ValidationSchema}
      >
        {({values, errors, touched, handleChange, handleBlur}) => {
  return (
    <Form>
        <div className='mb-3'>
            <h1 className='font-semibold'>Applicant's Personal Information</h1>
                <div className='flex flex-wrap gap-5 m-2'>
                    <div className='flex flex-col w-56'>
                        <label htmlFor="position_in_sacco" className='text-sm'>Position in SACCO</label>
                        <select name="position_in_sacco" defaultValue={profile?.roles && profile?.roles.length === 1 ? 'member': initialValues.position_in_sacco} id="" className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={handleChange("position_in_sacco")} required
                        >
                            {profile?.roles && profile?.roles.length === 1 ? 
                                <option value="member">Member</option>
                                : 
                                <>
                                    <option value="">--Position--</option>
                                    <option value="treasure">Treasure</option>
                                    <option value="secretary">Secretary</option>
                                    <option value="chairperson">Chairperson</option>
                                    <option value="chairperson-credits">Chairperson Credits</option>
                                    <option value="vice-chairperson">Vice Chairperson</option>
                                    <option value="vice-chairperson-credits">Vice Chairperson Credits</option>
                                </>
                            }
                        </select>
                    </div>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="postal_address" defaultValue={initialValues.postal_address}  label="Postal Address" placeholder="Enter Postal Address"/>

                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="landline_number"  label="Landline Number" defaultValue={initialValues.landline_number}  placeholder="Enter number"/>

                    <div className='flex flex-col w-56 '>
                        <label className=' text-sm'>Marital Status</label>
                        <select name="marital_status" id="" defaultValue={profile?.marital_status && profile.marital_status} onChange={() => handleChange("marital_status")} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" required>
                            <option value="">--Marital Status--</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="widowed">Widowed</option>
                            <option value="divorced">Divorced</option>
                        </select>
                    </div>

                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="no_of_dependents"  label="Number of dependents" placeholder="Enter number" defaultValue={initialValues.no_of_dependents}  />

                </div>
        </div>
        <div className='mb-3'>
                <h1 className='font-semibold'>Physical Address</h1>
                <div className='flex flex-wrap gap-5 m-2'>

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="town"  label="Town" placeholder="Enter town" defaultValue={initialValues.town} />

                    <div className='flex flex-col w-56 '>
                    <label className='text-sm'>Estate</label>
                    <input type="text" name="estate" id="" placeholder='Enter estate name' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary' onChange={handleChange("estate")} defaultValue={initialValues.estate}  />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label className='text-sm'>Street</label>
                    <input type="text" name="street" id="" placeholder='Enter street name' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary' onChange={handleChange("street")} defaultValue={initialValues.street}  />
                    </div>
                    <div className='flex flex-col w-56 '>
                    <label className='text-sm'>House Number</label>
                    <input type="text" name="house_no" id="" placeholder='Enter house no.' className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary' onChange={handleChange("house_no")} defaultValue={initialValues.house_no}  />
                    </div>
                    <div className='flex flex-col w-56 '>
                        <label className='text-sm'>Ownership</label>
                        <div className='flex justify-between'>
                            <div className='flex gap-1'>
                                <input type="radio" id="owned" name="ownership" value="Owned" className='w-4 h-4' onChange={handleChange("ownership")}/>
                                <label htmlFor="owned" className='text-sm'>Owned</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" id="rented" name="ownership" value="Rented" className='w-4 h-4' onChange={handleChange("ownership")}/>
                                <label htmlFor="rented" className='text-sm'>Rented</label>
                            </div>
                        </div>
                    </div>

                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="years_spent"  label="Years Spent" placeholder="Enter years" defaultValue={initialValues.years_spent}  />

                </div>
            </div>

            <div className='mb-3'>
                <h1 className='font-semibold'>Next of Kin</h1>
                <div className='flex flex-wrap gap-5 m-2'>

                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_name"  label="Name" placeholder="Enter name" defaultValue={initialValues.kin_name}  />
                    
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_profession"  label="Profession" placeholder="Enter profession" defaultValue={initialValues.kin_profession}  />

                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_contact"  label="Contact" placeholder="Enter number" defaultValue={initialValues.kin_contact}  />

                </div>
            </div>

        <div className='mb-3'>
            <h1 className='font-semibold'>Spouse</h1>
            <div className='flex flex-wrap gap-5 m-2'>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_name"  label="Name" placeholder="Enter name" defaultValue={initialValues.spouse_name} />
                
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_profession"  label="Profession" placeholder="Enter profession" defaultValue={initialValues.spouse_profession} />

                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_contact"  label="Contact" placeholder="Enter number" defaultValue={initialValues.spouse_contact} />
            </div>
        </div>

        <div className='flex justify-end w-full'>
            <input
                type="submit"
                value='Next'
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
            />
        </div>
    </Form>
  )
}}
</Formik>

)
}