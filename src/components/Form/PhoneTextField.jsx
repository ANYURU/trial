import { FaPhoneAlt } from 'react-icons/fa'

function PhoneTextField({ errors, touched, handleChange, handleBlur }) {
  return (
    <div className="m-1 w-full">
        <div className=" w-full relative flex items-center">
          <input type="tel" placeholder="Phone Number" name="phoneNo"
            onChange={handleChange('phoneNo')}
            onBlur={handleBlur('phoneNo')}
            className={`mt-1 py-3 focus:outline-none focus:ring-2 focus:ring-inputblue bg-inputblue focus:bg-transparent w-full pl-8 ${errors?.phoneNo && touched?.phoneNo && "ring-1 ring-red-500"}`} required
          />
          <i className="absolute left-3"><FaPhoneAlt /></i> 
        </div>
        <div className={`${(errors?.phoneNo) ? "block" : 'hidev'}`} >
          <label className={`${(errors?.phoneNo && touched?.phoneNo) ? "text-red-500 text-sm" : 'text-transparent text-sm'}`}>
            {`${(errors?.phoneNo  && touched?.phoneNo) ? `${errors.phoneNo}`.split(',')[0] : 'hide'}`}
          </label>
        </div>
      </div>
  )
}

export default PhoneTextField