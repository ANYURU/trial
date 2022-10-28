import { Formik, Form, ErrorMessage }  from 'formik'
import { loan1ValidationSchema } from '../../helpers/validator'
import { InputField } from '../../components/Form/CustomInputField'
import { districts } from '../../helpers/districts'

export default function ApplicationPg1({ profile, initialValues, setInitialValues, setPageNumber, counties, setCounties, subCounties, setSubCounties, parishes, setParishes, subParishes, setSubParishes }) {
    
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
                                        <select name="marital_status" id="" defaultValue={ initialValues.marital_status } onChange={() => handleChange("marital_status")} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" >
                                            <option value="">--Marital Status--</option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="widowed">Widowed</option>
                                            <option value="divorced">Divorced</option>
                                        </select>
                                        <ErrorMessage name="marital_status">{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="no_of_dependents"  label="Number of dependents" placeholder="Enter number" defaultValue={initialValues.no_of_dependents}/>

                                </div>
                        </div>
                        <div className='mb-3'>
                                <h1 className='font-semibold'>Physical Address</h1>
                                <div className='flex flex-wrap gap-5 m-2'>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>District</label>
                                        <select defaultValue={initialValues.district} value={values.district} name="district" id="" onChange={(event) => {
                                            const resetSchema = {
                                                county:"",
                                                sub_county: "",
                                                parish: "",
                                                sub_parish: ""
                                            }
                                            setInitialValues(initialValues => ({...resetSchema, ...initialValues}))
                                            values.county = ""
                                            values.sub_county = "" 
                                            values.parish = ""
                                            values.sub_parish = ""

                                            const [ district ] = districts.filter(district => district.name.toLowerCase() === event.target.value)
                                            const counties = district && district.counties.filter(county => county?.name)
                                            setCounties(counties)
                                            values.district  = event.target.value
            
                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" >
                                            <option value="">--Select District--</option>
                                            {
                                                districts.map((district, index) => <option key={index} value={district.name.toLowerCase()} selected={event => console.log("selected event.target.value") }>{district.name}</option>)
                                            }
                                        </select>
                                        <ErrorMessage name="district">{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>County</label>
                                        <select defaultValue={initialValues.county} value={initialValues.county || values.county} name="county" id=""  onChange={(event) => {
                                            if( counties?.length > 0) {
                                                values.sub_county = "" 
                                                values.parish = ""
                                                values.sub_parish = ""
                                                
                                                const [ selectedCounty ] = counties.filter(county => county?.name.toLowerCase() === event.target.value)
                                                selectedCounty?.sub_counties[0]?.name ? setSubCounties(selectedCounty.sub_counties) : setSubCounties([])
                                                values.county = event.target.value
                                            }
                                            
                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" >
                                            <option value="">--Select County--</option>
                                            {
                                                counties && counties.map((county, index) => <option key={index} value={county.name.toLowerCase()}>{county.name}</option>)
                                            }
                                        </select>
                                        <ErrorMessage name="county">{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>Sub County</label>
                                        <select name="sub_county" value={initialValues.sub_county || values.sub_county} defaultValue={initialValues.sub_county } id="" onChange={(event) => {
                                            if( subCounties?.length > 0 ) {
                                                values.parish = ""
                                                values.sub_parish = ""
                                                
                                                const [ selectedSubCounty ] = subCounties.filter(subCounty => subCounty?.name.toLowerCase() === event.target.value)
                                                selectedSubCounty?.parishes[0]?.name ? setParishes(selectedSubCounty.parishes) : setParishes([])
                                                values.sub_county = event.target.value
                                            }

                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" >
                                            <option value="">-- Select Sub County --</option>
                                            {
                                                subCounties && subCounties.map((subCounty, index) => <option key={index} value={subCounty.name.toLowerCase()}>{subCounty.name}</option>)
                                            }
                                        </select>
                                        <ErrorMessage name="sub_county">{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>Parish</label>
                                        <select name="parish" defaultValue={initialValues.parish}  value={initialValues.parish || values.parish} id="" onChange={(event) => {
                                                if(parishes?.length > 0) {
                                                    values.sub_parish = ""

                                                    const [ selectedParish ] = parishes.filter(parish => parish?.name.toLowerCase() === event.target.value)
                                                    console.log(event.target.value)
                                                    selectedParish?.sub_parishes[0]?.name ? setSubParishes(selectedParish.sub_parishes) : setSubParishes([])
                                                    values.parish = event.target.value
                                                }
                                            }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" >
                                            <option value="">-- Select Parish--</option>
                                            {
                                                parishes?.length > 0 && parishes.map((parish, index) => <option key={index} value={parish.name.toLowerCase()}>{parish.name}</option>)
                                            }
                                        </select>
                                        <ErrorMessage name="parish">{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className=' text-sm'>Sub-parish/Village</label>
                                        <select name="sub_parish" id="sub_parish" onChange={(event) => {
                                           values.sub_parish = event.target.value
                                        }} className="ring-1 ring-black rounded px-2 py-2 bg-white dark:bg-dark-bg-600 focus:outline-none focus:ring-2 focus:ring-primary" 
                                        defaultValue={initialValues.sub_parish}
                                        
                                        >
                                            <option value="bingo">-- Select Sub-parish --</option>
                                            {
                                                subParishes?.length > 0 && subParishes.map((subParish, index) => <option key={index} value={subParish.name.toLowerCase()}>{subParish.name}</option>)
                                            }
                                        </select>
                                        <ErrorMessage name="sub_parish">{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                    </div>
                                    <div className='flex flex-col w-56 '>
                                        <label className='text-sm'>Ownership</label>
                                        <div className='flex justify-between'>
                                            <div className='flex gap-1'>
                                                <input type="radio" id="owned" name="ownership" value="Owned" className='w-4 h-4' onChange={handleChange("ownership")} defaultChecked={initialValues.ownership === "Owned" ? true : false}/>
                                                <label htmlFor="owned" className='text-sm'>Owned</label>
                                            </div>
                                            <div className='flex gap-1'>
                                                <input type="radio" id="rented" name="ownership" value="Rented" className='w-4 h-4' onChange={handleChange("ownership")} defaultChecked={initialValues.ownership === "Rented" ? true : false}/>
                                                <label htmlFor="rented" className='text-sm'>Rented</label>
                                            </div>
                                        </div>
                                        <ErrorMessage name="ownership">{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                    </div>

                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="years_spent"  label="Years Spent" placeholder="Enter years" defaultValue={initialValues.years_spent} />
                                </div>
                        </div>
                        <div className='mb-3'>
                            <h1 className='font-semibold'>Next of Kin</h1>
                            <div className='flex flex-wrap gap-5 m-2'>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_name"  label="Name" placeholder="Enter name" defaultValue={initialValues.kin_name}  />
                                
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="kin_contact"  label="Contact" placeholder="Enter number" defaultValue={initialValues.kin_contact}  />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <h1 className='font-semibold'>Spouse</h1>
                            <div className='flex flex-wrap gap-5 m-2'>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_name"  label="Name" placeholder="Enter name" defaultValue={initialValues.spouse_name} />

                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="spouse_contact"  label="Contact" placeholder="Enter number" defaultValue={initialValues.spouse_contact} />
                            </div>
                        </div>
                    
                    <div className='flex justify-end w-full'>
                        <input
                            type="submit"
                            value='Next'
                            className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                        />   
                        
                       
                        {/* <button
                            onClick={(event) => {
                                event.preventDefault()

                                console.log("Errors: ", errors)
                                console.log("Values: ", values)
                            }}
                        >
                            try me
                        </button> */}
                    </div>
                    </Form>
                )}}
            </Formik>
        </div>
    )
}