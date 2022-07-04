import { InputField } from "../../components/Form/CustomInputField"
import { Form, Formik } from "formik"
import { member1ValidationSchema } from "../../helpers/validator"
 
export default function ApplicationPg1({ initialValues, setInitialValues, setPageNumber, pageNumber }) {
    // console.log(initialValues)
    const { 
        fullname,
        dob, 
        gender, 
        present_address, 
        email_address, 
        phone_number,
        id_passport_number, 
        marital_status, 
        fathers_name, 
        fathers_address, 
        income_sources: { 
            status,
            employed: {
                employers_name,
                employers_address,
                position,
                work_station,
                gross_monthly_income: gross_employed,
                appointment_date,
                payroll_number,
                source_of_income
            },
            business: {
                business_name,
                business_address,
                business_location,
                gross_monthly_income: gross_bussiness,
                other_income_sources,
            }
        },
    } = initialValues

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={ async( values ) => {
                console.log(values)
                setInitialValues({...initialValues, ...values })
                setPageNumber(pageNumber + 1)
                console.log(initialValues)
            }}
            validationSchema={ member1ValidationSchema }
        >
            {({handleChange, handleBlur, errors, touched, values}) => (
                <Form>
                    <div className='mb-3'>
                        <h1 className='font-semibold'>Applicant's Details</h1>
                        <div className='flex flex-wrap gap-5'>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="fullname"  label="Name" placeholder="Enter Full name" defaultValue={fullname} />
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="dob" label="Date of Birth" placeholder="06/04/2022" defaultValue={dob} type="date"/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="gender" label="Gender" placeholder="Gender" defaultValue={gender}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="present_address" label="Present Address" placeholder="Address" defaultValue={present_address}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="email_address" label="Email Address" placeholder="example@gmail.com" type="email" defaultValue={email_address}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="phone_number" label="Phone Number" placeholder="Enter Phone No." type="phone" defaultValue={phone_number}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="id_passport_number" label="ID/Passport No." placeholder="placeholder" defaultValue={id_passport_number}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="marital_status" id="marital_status" label="Marital Status" placeholder="Single" defaultValue={marital_status} options={["single", "married"]}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="fathers_name" label="Father's Name" placeholder="Enter Father's Name" defaultValue={fathers_name}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="fathers_address" label="Father's Address" placeholder="Enter your Father's Address" defaultValue={fathers_address}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <h1 className='font-semibold'>Source Of Income</h1>
                        <div className='flex flex-wrap gap-5'>
                            <div className='flex flex-col w-56 '>
                                <div className='flex justify-between' role='group'>
                                    <div className='flex gap-1'>
                                        <input type="radio" name="income_sources[status]" value="Employed" id="employed" onChange={handleChange} defaultChecked={initialValues.income_sources.status}/>
                                        <label htmlFor="employed" className='text-sm'>Employed</label>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input type="radio" name="income_sources[status]" value="Business" id="business" onChange={handleChange} defaultChecked={initialValues.income_sources.status} />
                                        <label htmlFor="business" className='text-sm'>Business</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {touched.income_sources?.status && errors.income_sources?.status && <div className="error text-xs text-red-500">{errors.income_sources?.status}</div>}
                    {
                        values.income_sources.status === "Employed"
                        ? 
                        <>
                            <p className="text-inputblue">*To be filled by employed applicants</p>
                            <div className='mb-3'>  
                                <div className='flex flex-wrap gap-5'>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][employers_name]" label="Employer" placeholder="Enter employer" defaultValue={employers_name}/>
                                    {touched.income_sources?.employed.name && errors.income_sources?.employed.employers_name && <div className="error text-xs text-red-500">{errors.income_sources?.employed.employers_name}</div>}

                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][employers_address]" label="Employer's Address" placeholder="Enter address" defaultValue={employers_address}/>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][position]" label="Position" placeholder="Enter position" defaultValue={position}/>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][work_station]" label="Work station" placeholder="Enter work station" defaultValue={work_station}/>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][gross_monthly_income]" label="Enter gross income" placeholder="Gross Monthly Income" defaultValue={gross_employed}/>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][appointment_date]" label="Appointment Date" placeholder="07/04/2022" defaultValue={appointment_date} type="date"/>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][payroll_number]" label="Payroll Number" placeholder="Enter payroll No." defaultValue={payroll_number}/>
                                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][source_of_income]" label="Source of Income" placeholder="Salary" defaultValue={source_of_income}/>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <p className="text-inputblue">*To be filled by business applicants</p>
                            <div className='flex flex-wrap gap-5 mb-10'>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][business_name]" label="Business Name" placeholder="Enter business name" defaultValue={business_name}/>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][business_address]" label="Business Address" placeholder="Enter address" defaultValue={business_address}/>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][business_location]" label="Business Location" placeholder="Enter location" defaultValue={business_location}/>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][gross_monthly_income]" label="Gross Monthly Income" placeholder="Enter gross income" defaultValue={gross_bussiness}/>
                                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][other_income_sources]" label="Other income sources" placeholder="-- Select Source --" defaultValue={other_income_sources}/>
                            </div>
                        </>
                    }

                    <div className='flex justify-end w-full'>
                    <button
                        type="submit"
                        className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                    >Next</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}