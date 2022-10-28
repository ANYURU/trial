import { Formik, Field, Form, FieldArray, ErrorMessage }  from 'formik'
import { InputField } from '../../components/Form/CustomInputField'
import { loan4ValidationSchema } from '../../helpers/validator'
import { remove_separator, add_separator } from '../../helpers/thousand_separator'

export default function ApplicationPg3({ profile, initialValues, setInitialValues, setPageNumber }) {

    return (
    <Formik
    initialValues={initialValues}
    validationSchema={loan4ValidationSchema}
    onSubmit={async ( values ) => {
        console.log(values)
        setInitialValues(values)
        setPageNumber(4)
    }}
  >
    {({values, errors, touched, handleChange, handleBlur, setFieldValue}) => {
  return (
    <Form>
        <div className='mb-3'>
            <h1 className='font-semibold'>Loan in other banks or financial institutions</h1>
            <FieldArray
                name='bank_loans'
                render={(fieldArryProps) => {

                    return <div>
                        {values.bank_loans.map(({amount_advanced}, index) => (
                            <>
                                <div className='m-2 flex gap-2' key={index}>
                                    <div className='flex justify-center items-center'>
                                        <h1 className='font-bold'>0{index + 1}</h1>
                                    </div>
                                    <div className='flex flex-wrap gap-5'>
                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`bank_loans[${index}].name`} defaultValue={initialValues.bank_loans[index].name}  label="Name" placeholder="Enter bank name" />

                                        <div className="flex flex-col w-56 mb-3">
                                            <label htmlFor={`bankLoanAmountAdvanced${index}`} className=" text-sm">
                                                Amount Advanced
                                            </label>
                                            <input
                                            type="text"
                                            name={`bank_loans[${index}].amount_advanced`}
                                            id={`bankLoanAmountAdvanced${index}`}
                                            placeholder="Enter amount"
                                            className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                                            onChange={(event) => {
                                                
                                                let formatted_string = add_separator(remove_separator(event.target.value))
                                                event.target.value = formatted_string
                                                setFieldValue(event.target.name, parseFloat(remove_separator(event.target.value)))
                                                console.log(touched)
                                            }}
                                            onBlur={handleBlur}
                                            defaultValue={add_separator(initialValues.bank_loans[index].amount_advanced)}
                                            />
                                            <ErrorMessage name={`bank_loans[${index}].amount_advanced`}>{msg => <div className="error text-red-600 text-xs">
                                                {msg}
                                            </div>}</ErrorMessage>
                                        </div>
                                        <div className='flex flex-col w-56 '>
                                            <label className=' text-sm'>Date Granted</label>
                                            <input 
                                                type="date" defaultValue={initialValues.bank_loans[index].date_granted} 
                                                className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
                                                name={`bank_loans[${index}].date_granted`} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <ErrorMessage name={`bank_loans[${index}].date_granted`}>{msg => <div className="error text-red-600 text-xs">
                                                {msg}
                                            </div>}</ErrorMessage>
                                        </div>

                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`bank_loans[${index}].repayment_period`} defaultValue={initialValues.bank_loans[index].repayment_period}  label="Repayment Period" placeholder="Enter period" />

                                        {/* <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`bank_loans[${index}].balance`}  label="Balance" placeholder="Enter balance" defaultValue={initialValues.bank_loans[index].balance} /> */}
                                        <div className="flex flex-col w-56 mb-3">
                                            <label htmlFor={`bankLoanBalance${index}`} className=" text-sm">
                                                Balance
                                            </label>
                                            <input
                                            type="text"
                                            name={`bank_loans[${index}].balance`}
                                            id={`bankBalance${index}`}
                                            placeholder="Enter balance"
                                            className="ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600"
                                            onChange={(event) => {
                                                
                                                let formatted_string = add_separator(remove_separator(event.target.value))
                                                event.target.value = formatted_string
                                                setFieldValue(event.target.name, parseFloat(remove_separator(event.target.value)))
                                                console.log(touched)
                                            }}
                                            onBlur={handleBlur}
                                            defaultValue={add_separator(initialValues.bank_loans[index].balance)}
                                            />
                                            <ErrorMessage name={`bank_loans[${index}].balance`}>{msg => <div className="error text-red-600 text-xs">
                                                {msg}
                                            </div>}</ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>
                            ))
                        }
                    </div>
                }}
            >
            </FieldArray>
            
            
        </div>

        <div className='mb-3'>
            <h1 className='font-semibold'>Additional Files</h1>
            <div className='m-2'>
            <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-56'>
                  <input type="file" name="additional_files" className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' 
                    onChange={event => {
                        setFieldValue(event.target.name, event.target.files[0])
                    }} 
                  />
                </div>
            </div>
            </div>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Security Details</h1>
            <p>I offer the following Security</p>

            {/* <div id="checkbox-group">Checked</div> */}
            <div role="group" aria-labelledby="checkbox-group">
                <label className='block'>
                <Field type="checkbox" name="securities" value="salary" />
                Salary
                </label>
                <label className='block'>
                <Field type="checkbox" name="securities" value="shares" />
                Share
                </label>
                <label className='block'>
                <Field type="checkbox" name="securities" value="guarantors" />
                Guarantors
                </label>
                <ErrorMessage name="securities">{msg => <div className="error text-red-600 text-xs">
                    {msg}
                </div>}</ErrorMessage>
            </div>
            
        </div>
        <div className='mb-3'>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="other_security"  label="Others Specify" placeholder="Enter other" />
        </div>

        <div className='flex justify-between w-full'>
            <button
                type="button"
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                onClick={() => setPageNumber(2)}
            >Back</button>
            <input
                type="submit"
                value='Next'
                className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
            />
            {/* <button
            onClick={(event) => {
                event.preventDefault()
                console.log("Values: ", values)
                console.log("Errors: ", errors)
            }}
            >
                try me
            </button> */}
        </div>
    </Form>
    )}}
    </Formik>
  )
}