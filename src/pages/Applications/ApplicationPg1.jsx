import { InputField } from "../../components/Form/CustomInputField"

export default function ApplicationPg1({ values, errors, touched, handleChange, handleBlur, employed, setEmployed }) {
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
    } = values

    

    return (
        <>
            <div className='mb-3'>
                <h1 className='font-semibold'>Applicant's Details</h1>
                <div className='flex flex-wrap gap-5'>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="fullname"  label="Name" placeholder="Enter Full name" value={fullname}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="dob" label="Date of Birth" placeholder="06/04/2022" value={dob} type="date"/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="gender" label="Gender" placeholder="Gender" value={gender}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="present_address" label="Present Address" placeholder="Address" value={present_address}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="email_address" label="Email Address" placeholder="example@gmail.com" type="email" value={email_address}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="phone_number" label="Phone Number" placeholder="Enter Phone No." type="email" value={phone_number}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="id_passport_number" label="ID/Passport No." placeholder="placeholder" value={id_passport_number}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="marital_status" id="marital_status" label="Marital Status" placeholder="Single" value={marital_status} options={["single", "married"]}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="fathers_name" label="Father's Name" placeholder="Enter Father's Name" value={fathers_name}/>
                    <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="fathers_address" label="Father's Address" placeholder="Enter your Father's Address" value={fathers_address}/>
                </div>
            </div>
            <div className='mb-3'>
                <h1 className='font-semibold'>Source Of Income</h1>
                <div className='flex flex-wrap gap-5'>
                    <div className='flex flex-col w-56 '>
                        <div className='flex justify-between' role='group'>
                            <div className='flex gap-1'>
                                <input type="radio" name="income_sources[status]" value="Employed" id="employed"
                                    onChange={(event) => {
                                        if (event.target.checked){
                                            setEmployed(true)    
                                            values.income_sources.status = event.target.value
                                            event.target.checked=true
                                        } 
                                    }}
                                   //defaultChecked={false}
                                   checked={employed}
                                />
                                <label htmlFor="employed" className='text-sm'>Employed</label>
                            </div>
                            <div className='flex gap-1'>
                                <input type="radio" name="income_sources[status]" value="Business" id="business"
                                    onChange={(event) => {
                                        if (event.target.checked){
                                            setEmployed(false)    
                                            values.income_sources.status = event.target.value
                                            event.target.checked=true
                                        } 
                                    }}
                                    // defaultChecked={false}
                                    checked={employed === false}   
                                />
                                <label htmlFor="business" className='text-sm'>Business</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                employed 
                ? 
                <>
                    <p className="text-inputblue">*To be filled by employed applicants</p>
                    <div className='mb-3'>  
                        <div className='flex flex-wrap gap-5'>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][employers_name]" label="Employer" placeholder="Enter employer" value={employers_name}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][employers_address]" label="Employer's Address" placeholder="Enter address" value={employers_address}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][position]" label="Position" placeholder="Enter position" value={position}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][work_station]" label="Work station" placeholder="Enter work station" value={work_station}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][gross_monthly_income]" label="Enter gross income" placeholder="Gross Monthly Income" value={gross_employed}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][appointment_date]" label="Appointment Date" placeholder="07/04/2022" value={appointment_date} type="date"/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][payroll_number]" label="Payroll Number" placeholder="Enter payroll No." value={payroll_number}/>
                            <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[employed][source_of_income]" label="Source of Income" placeholder="-- Select source --" value={source_of_income}/>
                        </div>
                    </div>
                </>
                :
                <>
                    <p className="text-inputblue">*To be filled by business applicants</p>
                    <div className='flex flex-wrap gap-5'>
                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][business_name]" label="Business Name" placeholder="Enter business name" value={business_name}/>
                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][business_address]" label="Business Address" placeholder="Enter address" value={business_address}/>
                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][business_location]" label="Business Location" placeholder="Enter location" value={business_location}/>
                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][gross_monthly_income]" label="Gross Monthly Income" placeholder="Enter gross income" value={gross_bussiness}/>
                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="income_sources[business][other_income_sources]" label="Other income sources" placeholder="-- Select Source --" value={other_income_sources}/>
                    </div>
                </>
            }
        </>
    )
}