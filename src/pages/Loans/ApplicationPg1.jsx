import { Formik, Form }  from 'formik'
import { loan1ValidationSchema } from '../../helpers/validator'
import { InputField } from '../../components/Form/CustomInputField'
import { districts } from '../../helpers/districts'
import { useState } from 'react'

export default function ApplicationPg1({ profile, initialValues, setInitialValues, setPageNumber }) {
    const [ counties, setCounties ] = useState([])
    const [ subCounties, setSubCounties ] =  useState([])
    const [ parishes, setParishes ] = useState([])
    const [ subParishes, setSubParishes ] = useState([])
    
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={async ( values ) => {
                    setInitialValues(values)
                    setPageNumber(2)      
                }}
                validationSchema={loan1ValidationSchema}
                >
                {({ values, errors, touched, handleChange, handleBlur }) => {
                    return (    
                    <Form id="loan_application_page1">
                        <div className='mb-3'>
                            <h1 className='font-semibold'>Applicant's Personal Information</h1>
                                <div className='flex flex-wrap gap-5 m-2'>
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

                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="no_of_dependents"  label="Number of dependents" placeholder="Enter number" defaultValue={initialValues.no_of_dependents}  type="number"/>

                                </div>
                        </div>
                        <div className='mb-3'>
                                <h1 className='font-semibold'>Physical Address</h1>
                                <div className='flex flex-wrap gap-5 m-2'>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>District</label>
                                        <select defaultValue={initialValues.district} value={values.district} name="district" id="" onChange={(event) => {
                                            initialValues.county = ""
                                            initialValues.sub_county = "" 
                                            initialValues.parish = ""
                                            initialValues.sub_parish = ""
                                            
                                            const [ district ] = districts.filter(district => district.name.toLowerCase() === event.target.value)
                                            const counties = district && district.counties.filter(county => county?.name)
                                            setCounties(counties)
                                            values.district  = event.target.value

                                           

            
                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" required>
                                            <option value="">--Select District--</option>
                                            {
                                                districts.map((district, index) => <option key={index} value={district.name.toLowerCase()} selected={event => console.log("selected event.target.value") }>{district.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>County</label>
                                        <select defaultValue={initialValues.county} value={initialValues.county || values.county} name="county" id=""  onChange={(event) => {
                                            if( counties?.length > 0) {
                                                initialValues.sub_county = "" 
                                                initialValues.parish = ""
                                                initialValues.sub_parish = ""
                                                
                                                const [ selectedCounty ] = counties.filter(county => county?.name.toLowerCase() === event.target.value)
                                                selectedCounty?.sub_counties[0]?.name ? setSubCounties(selectedCounty.sub_counties) : setSubCounties([])
                                                handleChange("county")
                                                values.county = event.target.value
                                                
                                            }
                                            
                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" required>
                                            <option value="">--Select County--</option>
                                            {
                                                counties && counties.map((county, index) => <option key={index} value={county.name.toLowerCase()}>{county.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>Sub County</label>
                                        <select name="sub_county" value={initialValues.sub_county || values.sub_county} defaultValue={initialValues.sub_county } id="" onChange={(event) => {
                                            if( subCounties?.length > 0 ) {
                                                initialValues.parish = ""
                                                initialValues.sub_parish = ""
                                                
                                                const [ selectedSubCounty ] = subCounties.filter(subCounty => subCounty?.name.toLowerCase() === event.target.value)
                                                selectedSubCounty?.parishes[0]?.name ? setParishes(selectedSubCounty.parishes) : setParishes([])
                                                values.sub_county = event.target.value
                                            }

                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" required>
                                            <option value="">-- Select Sub County --</option>
                                            {
                                                subCounties && subCounties.map((subCounty, index) => <option key={index} value={subCounty.name.toLowerCase()}>{subCounty.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>Parish</label>
                                        <select name="parish" defaultValue={initialValues.parish} id="" onChange={(event) => {
                                                if(parishes?.length > 0) {
                                                    values.sub_parish = ""

                                                    const [ selectedParish ] = parishes.filter(parish => parish?.name.toLowerCase() === event.target.value)
                                                    console.log(event.target.value)
                                                    selectedParish?.sub_parishes[0]?.name ? setSubParishes(selectedParish.sub_parishes) : setSubParishes([])
                                                    values.sub_parish = event.target.value
                                                }
                                            }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" required>
                                            <option value="">-- Select Parish--</option>
                                            {
                                                parishes?.length > 0 && parishes.map((parish, index) => <option key={index} value={parish.name.toLowerCase()}>{parish.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>Sub-parish/Village</label>
                                        <select name="sub_parish" id="" onChange={(event) => {
                                           values.sub_parish = event.target.value
                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" required>
                                            <option value="bingo">-- Select Sub-parish --</option>
                                            {
                                                subParishes?.length > 0 && subParishes.map((subParish, index) => <option key={index} value={subParish.name.toLowerCase()}>{subParish.name}</option>)
                                            }
                                        </select>
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

                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="years_spent"  label="Years Spent" placeholder="Enter years" defaultValue={initialValues.years_spent} type="number"  />

                                </div>
                        </div>
                        <div className='mb-3'>
                            <h1 className='font-semibold'>Next of Kin</h1>
                            <div className='flex flex-wrap gap-5 m-2'>

                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_name"  label="Name" placeholder="Enter name" defaultValue={initialValues.kin_name}  />
                                
                                {/* <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_profession"  label="Profession" placeholder="Enter profession" defaultValue={initialValues.kin_profession}  /> */}

                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_contact"  label="Contact" placeholder="Enter number" defaultValue={initialValues.kin_contact}  />

                            </div>
                        </div>
                        <div className='mb-3'>
                            <h1 className='font-semibold'>Spouse</h1>
                            <div className='flex flex-wrap gap-5 m-2'>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_name"  label="Name" placeholder="Enter name" defaultValue={initialValues.spouse_name} />
                                
                                {/* <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_profession"  label="Profession" placeholder="Enter profession" defaultValue={initialValues.spouse_profession} /> */}

                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_contact"  label="Contact" placeholder="Enter number" defaultValue={initialValues.spouse_contact} />
                            </div>
                        </div>
                    
                    <div className='flex justify-end w-full'>
                        <input
                            type="submit"
                            value='Next'
                            className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                        />   
                        {/* 
                        // Debugging
                        <button
                            onClick={(event) => {
                                event.preventDefault()

                                console.log("Errors: ", errors)
                                console.log("Values: ", values)
                            }}
                        >
                            try me
                        </button>*/}
                    </div>
                    </Form>
                )}}
            </Formik>
        </div>
    )
}