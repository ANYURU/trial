import { Nominee } from "../../components"
import { InputField } from "../../components/Form/CustomInputField"

function ApplicationPg2({ values, errors, touched, handleChange, handleBlur }) {
    const { proposed_mode_of_remittances: { others, date_effective }, proposed_monthly_contributions, amount_in_words } = values

    
  return (
      <>
        <div className='mb-3'>
            <div className='flex flex-wrap gap-5'>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="proposed_monthly_contributions"  label="Proposed Monthly Contributions" placeholder="Monthly contributions" value={proposed_monthly_contributions}/>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="amount_in_words"  label="Amount in words" placeholder="Enter amount in words." value={amount_in_words}/>

                <div className='flex flex-col w-56 '>
                    <label htmlFor="" className=' text-sm'>Amount in words</label>
                    <input type="text" name="" id="" placeholder='Enter postal address' className='ring-1 ring-black rounded px-2 py-1' />
                </div>
            </div>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Proposed Mode of Remittances-check off</h1>
            <div className='flex flex-wrap gap-5'>
                <div className='flex justify-center items-center gap-2'>
                    <input type="checkbox" name="proposed_mode_of_remittances[standing_order]"  onChange={handleChange} onBlur={handleBlur}/>
                    <label htmlFor="">Standing Order</label>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <input type="checkbox" name="proposed_mode_of_remittances[direct_debit]"  onChange={handleChange} onBlur={handleBlur}/>
                    <label htmlFor="">Direct Debit</label>
                </div>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="proposed_mode_of_remittances[others]"  label="Specify Others" placeholder="Enter other modes" value={others}/>
                <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference="proposed_mode_of_remittances[date_effective]"  label="Effective Date (dd/mm/yyyy)" placeholder="dd/mm/yyyy" value={date_effective}/>
            </div>
        </div>
        <Nominee values={values} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur}/>
      </>
  )
}

export default ApplicationPg2